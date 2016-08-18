/* -*- javascript -*- */
"use strict";

import Promise from 'bluebird';
import ExtendableError from 'es6-error';


const VALIDATORS = Symbol.for("validators");


/**
 * Decorator: @validator
 * Marks the decorated method as a validator
 */
export function validator( field ) {
	return function decorator( target, name, descriptor ) {
		var methodBody = descriptor.value;

		// Promisify the method and add it to the list of validators
		descriptor.value = Promise.method( methodBody );
		target.constructor.validators.set( field, descriptor.value );

		return descriptor;
	};
}



// Model validation failures
export class ValidationError extends ExtendableError {

	field = null;

	constructor( message, field=null ) {
		super( message );
		this.field = field;
	}

}


/**
 * Validation error container
 */
export class ValidationErrors {

	constructor() {
		this.failures = new Map();
	}


	get fields() {
		let fields = [];
		// :FIXME: Use an Array comprehension once those are stable
		for ( let field of this.failures.keys() ) fields.push( field );

		return fields;
	}


	get fullMessages() {
		let messages = [];
		for( let [field, reason] of this.failures ) {
			messages.push( `${field} ${reason}` );
		}

		return messages;
	}


	get size() {
		return this.failures.size;
	}


	add( field, reason ) {
		debug( "Added a failued: ", field, reason );
		this.failures.set( field, reason );
	}


	isEmpty() {
		return ( this.size === 0 );
	}

}
