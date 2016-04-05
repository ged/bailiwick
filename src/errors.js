/* -*- javascript -*- */
"use strict";

import ExtendableError from 'es6-error';


export class NotImplementedError extends ExtendableError {

	constructor( methodname ) {
		super(`No implementation provided for ${methodname}(...)`);
	}

}

export class HTTPError extends ExtendableError {

	status = 500;
	statusText = "Unknown error";
	response = null;


	static fromResponse( response ) {
		if ( response.ok ) {
			raise `Expected an error response, but got: ${response}`;
		}

		switch( Math.floor(response.status / 100) ) {
			case 4:
				return new RequestError( response );
				break;
			case 5:
				return new ServerError( response );
				break;
			default:
				return new HTTPError( response );
		}
	}


	constructor( response ) {
		super( `[${response.status}] ${response.statusText}` );
		this.status = response.status;
		this.statusText = response.statusText;
		this.response = response;
	}


	/**
	 * toString() API -- return a human-readable representation of the object.
	 */
	get [Symbol.toStringTag]() {
		return `<${this.constructor.name} [${this.status}]: ${this.statusText}>`;
	}

}


// 4xx responses
export class RequestError extends HTTPError {}

// 5xx responses
export class ServerError extends HTTPError {}

