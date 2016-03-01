/* -*- javascript -*- */
"use strict";

import 'babel/polyfill';

export class NotImplementedError extends Error {

	constructor( methodname ) {
		super();
		this.message = `No implementation provided for ${methodname}(...)`;
	}

}

export class HTTPError extends Error {

	constructor( status, statusText, body ) {
		super( `${status} ${statusText}` );
		this.status = status;
		this.statusText = statusText;
		this.body = body;
	}

}


export class RequestError extends HTTPError {}
export class ServerError extends HTTPError {}

export class ValidationError extends Error {}


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
