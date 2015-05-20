/**
 * Utility Classes and functions
 * 
 * 
 */

import 'babel/polyfill';

export class NotImplementedError extends Error {

	constructor( methodname ) {
		super();
		this.message =  `No implementation provided for ${methodname}(...)`;
	}

}

export class HTTPError extends Error {

	static fromXMLHttpRequest( xhr ) {
		if ( !xhr.status || xhr.status == 0 ) return null;
		switch( Math.floor(xhr.status / 100) ) {
		case 4:
			return new RequestError( xhr.status, xhr.statusText, xhr.responseText );
			break;
		case 5:
			return new ServerError( xhr.status, xhr.statusText, xhr.responseText );
			break;
		default:
			var msg = `Oops, don't know how to handle a ${xhr.status} error.`;
			console.error( msg );
			return new HTTPError( xhr.status, xhr.statusText, xhr.responseText );
		}
	}

	constructor( status, statusText, message ) {
		super( message );
		this.status = status;
		this.statusText = statusText;
	}

}


export class RequestError extends HTTPError {}
export class ServerError extends HTTPError {}

export class ValidationFailure {

	constructor( field, failure ) {
		this.field = field;
		this.failure = failure;
	}


	message() {
		return `${this.field} ${this.failure}`;
	}

}

