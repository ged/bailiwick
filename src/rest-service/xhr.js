/* -*- javascript -*- */
'use strict';

import Promise from 'bluebird';
import parseHeaders from 'parse-headers';
import 'babel/polyfill';

import {HTTPError} from '../errors';
import {monadic,mapify} from '../utils';

const DEFAULT_XHR_OPTIONS = {
	timeout: 10000,
	baseUrl: '//',
};


/**
 * Decorator: pluggable
 * Add a hook slot for the decorated method so that plugins can subscribe to calls to it.
 */
function pluggable( target, name, descriptor ) {
	pluggable.slots.add( name );

	var realfunc = descriptor.value;
	descriptor.value = function( ...args ) {
		var result = realfunc.apply( this, args );

		if ( !result && this.pluginSlots.has(name) ) {
			var hooks = this.pluginSlots.get( name );

			for ( var hook of hooks ) {
				result = hook.apply( this, args );
				if ( result ) break;
			}
		}

		return result;
	};

	return descriptor;
};
pluggable.slots = new Set();


/**
 * A(nother) then-able XHR implementation.
 *
 * There are a bunch of XHR + Promise libraries, Looking for something that:
 *
 * - uses XHR2
 * - allows a request to be built up using a monadic interface
 * - exposes error information when things go wrong
 * - works well in a browser (as opposed to relying on browserify)
 * - let you easily plug behavior like CORS and JSON-serialization/parsing
 *   into each request.
 *
 * There were some that did a lot of stuff right, and I've stolen the parts
 * of those libraries that I admire. Here are a few I tried/looked at:
 *
 * - https://www.npmjs.com/package/ask
 * - https://www.npmjs.com/package/httplease
 * - https://www.npmjs.com/package/request-promise
 * - https://www.npmjs.com/package/xhr
 *
 * @class Xhr
 * @constructor
 */
export class Xhr {

	constructor( options={} ) {
		// console.debug( `Creating a new Xhr with options: ${options}` );
		this.options = Object.assign( {}, DEFAULT_XHR_OPTIONS, options );
		this.defaultHeaders = new Map();
		this.pluginSlots = new Map();
	}


	/*
	 * Monadic API
	 */

	clone() {
		// console.debug( `Cloning ${this}` );
		var newObj = Reflect.construct( this.constructor, [this.options] );
		newObj.defaultHeaders = new Map( this.defaultHeaders );
		newObj.pluginSlots = new Map( this.pluginSlots );
		return newObj;
	}


	/**
	 * Return a copy of the Xhr object that will use the specified plugins.
	 *
	 * @params {Array<Object>} One or more plugins to use.
	 *
	 * @returns {Xhr}  the new Xhr object.
	 */
	@monadic
	using( ...plugins ) {
		for ( var i in plugins ) {
			var plugin = plugins[ i ];
			// console.debug( `Adding plugin: `, plugin );

			for ( var hook in plugin ) {
				// console.debug( `  setting up a ${hook} hook...` );
				if ( ! pluggable.slots.has(hook) ) {
					console.warn( `No pluggable slot for a "${hook}" hook; skipping.` );
					continue;
				}

				var slot;
				if ( !this.pluginSlots.has(hook) ) {
					// console.debug( `Creating a new ${hook} slot for this object: `, this );
					slot = new Set();
					this.pluginSlots.set( hook, slot );
				} else {
					// console.debug( `Using the existing ${hook} slot for this object: `, this );
					slot = this.pluginSlots.get( hook );
				}
				slot.add( plugin[hook] );
			}
		}

		return this;
	}


	/**
	 * Return a copy of the Xhr object that will use the given {newUrl} as the
	 * new baseUrl.
	 * 
	 * @params {String} newUrl   the new URL to use as the base for new requests.
	 * 
	 * @returns {Xhr}  the new Xhr object.
	 */
	@monadic
	withBaseUrl( newUrl ) {
		this.options['baseUrl'] = newUrl;
	}


	/**
	 * Return a copy of the Xhr object that will use the given {newTimeout} as the
	 * new request timeout.
	 * 
	 * @params {Number} newTimeout   the number of milliseconds to allow 
	 * 
	 * @returns {Xhr}  the new Xhr object.
	 */
	@monadic
	withTimeout( newTimeout ) {
		this.options['timeout'] = newTimeout;
	}


	@monadic
	withDefaultHeader( name, value ) {
		this.defaultHeaders.set( name.toLowerCase(), value );
	}


	/*
	 * Request API
	 */

	/**
	 * Sent a GET request.
	 * @method get
	 */
	get( uri='', params=null ) {
		var queryString = this.queryStringFromParams( params );
		if ( '' !== queryString ) {
			uri += '?' + queryString;
		}
		return this.getXhrPromise( 'GET', uri );
	}


	/**
	 * Sent a POST request.
	 * @method post
	 */
	post( uri='', body ) {
		return this.getXhrPromise( 'POST', uri, body );
	}


	/**
	 * Sent a PUT request.
	 * @method put
	 */
	put( uri='', body ) {
		return this.getXhrPromise( 'PUT', uri, body );
	}


	/**
	 * Sent a DELETE request.
	 * @method delete
	 */
	delete( uri='' ) {
		return this.getXhrPromise( 'DELETE', uri );
	}


	/*
	 * Pluggable/Event API
	 */

	/**
	 * Do any necessary setup on the XMLHTTPRequest before it's started.
	 * @method setupXhr
	 *
	 * @param {XMLHTTPRequest} xhr  the request object that's about to be sent
	 *
	 */
	@pluggable
	setupXhr( xhr ) {
		// console.debug( "Setting up the XMLHTTPRequest." );
		xhr.timeout = this.options.timeout;
	}


	/**
	 * Do any required transforms on the body of the request and any necessary
	 * correllated request modification (e.g., setting headers, responseType, etc.)
	 * before dispatching it.
	 *
	 * @method makeRequestBody
	 *
	 * @param {XMLHttpRequest} xhr  the request object being sent
	 * @param {Object} body  the body of the request, if any.
	 *
	 * @returns {Object}  the transformed body.
	 */
	@pluggable
	makeRequestBody( xhr, body ) {
		// console.debug( "Applying transforms to the request body." );
	}


	/**
	 * Do any required transforms on the body of the response before resolving the 
	 * Promise.
	 *
	 * @method extractResponseBody
	 *
	 * @param {XMLHTTPRequest} xhr  the request object
	 *
	 * @returns {Object}  the transformed body.
	 */
	@pluggable
	extractResponseBody( xhr ) {
		// console.debug( "Applying transforms to the response body" );
	}


	@pluggable
	onAbort( evt ) {
		console.warn( "Request aborted." );
	}


	@pluggable
	onError( evt ) {
		console.error( "Network or other internal error." );
	}


	@pluggable
	onLoad( evt ) {
		// console.debug( "Got a 'load' event: %o", evt );
	}


	@pluggable
	onLoadStart( evt ) {
		// console.debug( "Got a 'loadstart' event: %o", evt );
		for ( let [header, value] of this.defaultHeaders ) {
			console.debug( "Setting request header %s to %s.", header, value );
			xhr.setRequestHeader( header, value );
		}
	}


	@pluggable
	onProgress( evt ) {
		// console.debug( "Got a 'progress' event: %o", evt );
	}


	@pluggable
	onTimeout( evt ) {
		console.warn( `Request for ${evt.target.responseUrl} timed out.` );
	}


	@pluggable
	onLoadEnd( evt ) {
		// console.debug( "Got a 'loadend' event: %o", evt );
	}



	/*
	 * Utility methods
	 */

	/**
	 * Turn the specified {params} Object into a URL-encoded query string.
	 */
	queryStringFromParams( params ) {
		console.debug( "Making query string from params: %o", params );

		if ( !params ) return '';

		let paramMap = mapify( params );
		console.debug( "Param map is: %o", paramMap );
		let pairs = [];
		for ( let [key, val] of paramMap ) {
			let encKey = encodeURIComponent( key );
			let encVal = encodeURIComponent( val );
			console.debug( "  adding pair: %s=%s", encKey, encVal );
			pairs.push( `${encKey}=${encVal}` );
		}

		console.debug( "Returning query string of %d param pairs.", pairs.length );
		return pairs.join( '&' );
	}


	/**
	 * Fetch a promise that is wrapped around an XMLHttpRequest for the
	 * specified {method}, {url}, and {body}.
	 * 
	 * @method getXhrPromise
	 */
	getXhrPromise( method, uri, body=null ) {
		if ( uri[0] !== '/' ) uri = `/${uri}`;
		var url = `${this.options.baseUrl}${uri}`;
		var xhr = this.getXhr();

		// console.debug( "Creating promise for %s %s", method, url );
		return new Promise( (resolve, reject) => {
			this.setupXhr( xhr );
			this.setMainEventHandlers( xhr, resolve, reject );

			xhr.open( method, url );
			// console.info( "XHR opened." );

			body = this.makeRequestBody( xhr, body );
			xhr.send( body );
			// console.info( "XHR sent." );
		}).
		cancellable().
		timeout( this.options.timeout, `Request timeout (${this.options.timeout}ms).` ).
		catch( Promise.CancellationError, Promise.TimeoutError, err => {
			console.error( err );
			xhr.abort();
			throw err; //Don't swallow it
		});
	}


	/**
	 * Fetch the appropriate XHR class for the current browser.
	 * @method getXhr
	 */
	getXhr() {
		// console.debug( "Getting a new XMLHttpRequest" );
		var xhr = new XMLHttpRequest;

		xhr.addEventListener( 'abort',     evt => this.onAbort(evt) );
		xhr.addEventListener( 'error',     evt => this.onError(evt) );
		xhr.addEventListener( 'load',      evt => this.onLoad(evt) );
		xhr.addEventListener( 'loadstart', evt => this.onLoadStart(evt) );
		xhr.addEventListener( 'progress',  evt => this.onProgress(evt) );
		xhr.addEventListener( 'timeout',   evt => this.onTimeout(evt) );
		xhr.addEventListener( 'loadend',   evt => this.onLoadEnd(evt) );

		return xhr;
	}


	/**
	 * Set up the default handlers for the `error` and `load` events that {resolve}
	 * or {reject} the Promise wrapped around the specified {xhr}.
	 *
	 * @method setMainEventHandlers
	 */
	setMainEventHandlers( xhr, resolve, reject ) {
		var self = this;

		xhr.addEventListener( "error", evt => {
			console.error( "Network error." );
			reject( new Error("Network error.") );
		});

		xhr.addEventListener( "load", evt => {
			var xhr = evt.currentTarget || evt.target;
			console.info( `${xhr.responseURL} => ${xhr.status} ${xhr.statusText}` );

			if ( xhr.status < 200 || xhr.status >= 400 ) {
				reject( HTTPError.fromXMLHttpRequest(xhr) );
			}

			// console.debug( "Transforming response from ", xhr );
			var responseData = self.extractResponseBody( xhr ) || xhr.response;
			resolve( responseData );
		});
	}


}


