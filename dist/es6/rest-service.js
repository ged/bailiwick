/* -*- javascript -*- */
/* eslint-disable no-unused-vars */
'use strict';

import Promise from 'bluebird';
import 'fetch';

import {Datastore} from './datastore';
import {mapify, monadic} from './utils';


/**
 * REST service datastore that uses the fetch API
 *
 * @class RESTService
 * @constructor
 *
 */
export class RESTService extends Datastore {

	constructor( baseUrl='http://localhost/' ) {
		super();

		if (typeof fetch === 'undefined') {
			throw new Error('RESTService requires a fetch polyfill');
		}

		if ( !baseUrl.endsWith('/') ) {
			baseUrl = baseUrl + '/';
		}

		this.baseUrl = baseUrl;
		this.httpClient = { fetch };
	}


	/**
	 * Return a copy of the reciving object.
	 */
	clone() {
		var newObj = Reflect.construct( this.constructor, [this.baseUrl] );
		newObj.httpClient = this.httpClient;
		return newObj;
	}

	/**
	 * Return a clone of the original datastore that uses the {newHttpClient} instead of
	 * whatever it was using before.
	 */
	@monadic
	forUrl( newBaseUrl ) {
		this.baseUrl = newBaseUrl;
	}


	/**
	 * Return a clone of the original datastore that uses the {newHttpClient} instead of
	 * whatever it was using before.
	 */
	@monadic
	using( newHttpClient ) {
		this.httpClient = newHttpClient;
	}


	/**
	 * Send an request with the specified {verb} via the HTTP client to the given {url},
	 * serializing the {body} (if given) as JSON, and de-serializing the result (if it's a
	 * JSON response).
	 */
	sendJsonRequest( url, method='GET', body=null, headers={} ) {
		let info = {
			method,
			body,
			headers
		};

		if ( !(url.startsWith('http:') || url.startsWith('https:')) ) {
			if ( url.startsWith('/') ) { url = url.slice(1); }
			url = `${this.baseUrl}${url}`;
		}

		if ( info.body && typeof body !== 'string' ) {
			info.body = JSON.stringify( body );
			info.headers[ 'Content-type' ] = "application/json; charset=UTF-8";
		}

		return this.httpClient.
			fetch( url, info ).
			then( response => {
				let mediatype = response.headers.get( 'content-type' );
				if ( mediatype.startsWith('application/json') ) {
					console.debug( "Got JSON response; deserializing." );
					return response.json();
				} else {
					console.debug( "Got a %s response; using the raw text.", mediatype );
					return response.text();
				}
			});
	}


	/**
	 * Fetch a single instance of the specified {type} with the given {id}, and return
	 * a Promise that resolves to it.
	 */
	getInstance( type, id ) {
		var uri = type.uri;
		if ( id ) { uri += '/' + id.toString(); }
		return this.sendJsonRequest( uri );
	}


	/**
	 * Fetch a collection of the specified object {type} that matches the specified
	 * {criteria} (a Criteria object), and return a Promise that resolves to the resulting
	 * Array.
	 */
	getCollection( type, criteria ) {
		var uri = criteria.location || type.uri;
		var params = this.makeParamsFromCriteria( criteria );
		var queryString = this.queryStringFromParams( params );

		console.info( "GET %s params: %o", uri, params );
		if ( queryString !== '' ) {
			uri += '?' + queryString;
		}

		return this.sendJsonRequest( uri );
	}


	/**
	 * Store a new instance of the specified {type} with the given {data} via the REST service,
	 * and return a Promise that resolves to the result.
	 */
	store( type, data ) {
		return this.sendJsonRequest( type.uri, 'POST', data );
	}


	/**
	 * Update the instance of the specified {type} with the given {id} via the REST
	 * service using the specified {data}, and return a Promise that resolves to the result.
	 */
	update( type, id, data ) {
		var url = `${type.uri}/${id}`;
		return this.sendJsonRequest( uri, 'POST', data );
	}


	/**
	 * Replace the data for the instance of the specified {type} with the given {id} via the REST
	 * service using the specified {data}, and return a Promise that resolves to the result.
	 */
	replace( type, id, data ) {
		var uri = `${type.uri}/${id}`;
		return this.sendJsonRequest( uri, 'PUT', data );
	}


	/**
	 * Delete the instance of the specified {type} with the given {id} via the REST service and
	 * return a Promise that resolves to the result.
	 */
	remove( type, id ) {
		var uri = `${type.uri}/${id}`;
		return this.sendJsonRequest( uri, 'DELETE' );
	}


	/*
	 * Utility functions
	 */

	/**
	 * Turn the specified {criteria} into a Map of parameters suitable for passing in an Xhr
	 * request.
	 */
	makeParamsFromCriteria( criteria ) {
		if ( !criteria ) { return null; }

		var params = new Map();

		for ( let [key, val] of criteria.filterClauses ) {
			console.debug( `Adding parameter ${key}=${val} from criteria's filter clauses.` );
			params.set( key, val );
		}

		if ( criteria.maxResultCount ) { params.set( 'limit', criteria.maxResultCount ); }
		if ( criteria.resultOffset ) { params.set( 'offset', criteria.resultOffset ); }

		return params;
	}


	/**
	 * Turn the specified {params} Object into a URL-encoded query string.
	 */
	queryStringFromParams( params ) {
		console.debug( "Making query string from params: %o", params );

		if ( !params ) { return ''; }

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


}