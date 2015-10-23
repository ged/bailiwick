/**
 * Utility Classes and functions
 * 
 * 
 */

import 'babel/polyfill';

export class NotImplementedError extends Error {

	constructor( methodname ) {
		super();
		this.message = `No implementation provided for ${methodname}(...)`;
	}

}

export class HTTPError extends Error {

	static fromXMLHttpRequest( xhr ) {
		if ( !xhr.status || xhr.status == 0 ) return null;
		switch( Math.floor(xhr.status / 100) ) {
		case 4:
			return new RequestError( xhr.status, xhr.statusText, xhr.response );
			break;
		case 5:
			return new ServerError( xhr.status, xhr.statusText, xhr.response );
			break;
		default:
			var msg = `Oops, don't know how to handle a ${xhr.status} error.`;
			console.error( msg );
			return new HTTPError( xhr.status, xhr.statusText, xhr.response );
		}
	}

	constructor( status, statusText, body ) {
		super( `${status} ${statusText}` );
		this.status = status;
		this.statusText = statusText;
		this.body = body;
	}

}


export class RequestError extends HTTPError {}
export class ServerError extends HTTPError {}

/**
 *
 */
export class ValidationErrors {

	constructor() {
		this.failures = new Map();
	}


	get fields() {
		var fields = [];
		// :FIXME: Use an Array comprehension once those are stable
		for ( let field of this.failures.keys() ) fields.push( field );

		return fields;
	}


	get fullMessages() {
		var messages = [];
		for( let [field, reason] of this.failures ) {
			messages.push( `${field} ${reason}` );
		}

		return messages;
	}


	get size() {
		return this.failures.size;
	}


	add( field, reason ) {
		this.failures.set( field, reason );
	}


	isEmpty() {
		return ( this.size === 0 );
	}

}


