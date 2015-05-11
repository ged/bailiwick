/**
 * RESTService Plugins for httpplease
 *
 * Had to implement these in-place because jspm doesn't import the plugins
 * correctly.
 *
 * jshint undef: true, unused: true, esnext: true
 * global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console
 */
'use strict';

import urllite from 'urllite';


export class JSONRequestProcessor {
	processRequest( req ) {
		var contentType = req.header('Content-Type'),
			hasJsonContentType = contentType && contentType.indexOf('application/json') !== -1;

		if (contentType != null && !hasJsonContentType) {
			return ;
		}
		if ( req.body ) {
			if ( !contentType ) {
				req.header('Content-Type', 'application/json');
			}
			req.body = JSON.stringify(req.body);
		}
	}
}

export class JSONResponseProcessor {
	processRequest( req ) {
		var accept = req.header('Accept');
		if (accept == null) {
			req.header('Accept', 'application/json');
		}
	}

	isJSONResponse( res ) {
		return res.contentType &&
			/^.*\/(?:.*\+)?json(;|$)/i.test( res.contentType );
	}

	processResponse( res ) {
		if ( this.isJSONResponse(res) ) {
			var raw = typeof res.body === 'string' ? res.body : res.text;
			if ( raw ) {
				res.body = JSON.parse( raw );
			}
		}
	}
}

export class CORSSupport {

	constructor() {
		this.warningShown = false;
	}

	get supportsXHR() {
		if ( typeof this._supportsXHR != 'undefined' ) {
			return this._supportsXHR;
		}

		this._supportsXHR = (
			typeof window !== "undefined" &&
			window !== null &&
			window.XMLHttpRequest &&
			'withCredentials' in new window.XMLHttpRequest()
		);
		return this._supportsXHR;
	}

	isCrossSiteRequest( req ) {
		var requestUrl, origin;

		if (typeof window === "undefined" || window === null) {
			return false;
		}

		requestUrl = urllite(req.url);
		origin = urllite(window.location.href);

		if ( !requestUrl.host ) {
			return false;
		}

		if ( requestUrl.protocol === origin.protocol &&
			requestUrl.host === origin.host &&
			requestUrl.port === origin.port )
		{
			return false;
		}

		return true;
	}

	createXHR( req ) {
		if ( ! this.isCrossSiteRequest(req) ) { return; }

		if ( ! this.warningShown && req.headers ) {
			for (var k in req.headers) {
				if ( req.headers.hasOwnProperty(k) ) {
					this.warningShown = true;
					if ( window && window.console && window.console.warn ) {
						window.console.warn("Request headers are ignored in old IE when using the oldiexdomain plugin.");
					}
					break;
				}
			}
		}

		if ( window.XDomainRequest && !this.supportsXHR ) {
			var xdr = new window.XDomainRequest();
			xdr.setRequestHeader = function() {};
			return xdr;
		} else if ( this.supportsXHR ) {
			console.debug( "Setting withCredentials to true" );
			req.withCredentials = true;
		}
	}
}

