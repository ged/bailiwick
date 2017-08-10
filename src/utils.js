/* -*- javascript -*- */
"use strict";

/**
 * Logger interface for Bailiwick classes
 */
export var logger = {

	output: null,


	outputTo( destination ) {
		this.output = destination;
	},


	reset() {
		this.output = null;
	},


	debug( ...args ) {
		if ( this.output ) {
			try { this.output.debug(...args) }
			catch( e ) { }
		}
	},

	error( ...args ) {
		if ( this.output ) {
			try { this.output.error(...args) }
			catch( e ) { }
		}
	}

};


/**
 * Decorator: @monadic
 *
 * Declare a method that acts as a monadic mutator -- calling it will operate on (and return)
 * a clone of the receiving object instead of the receiver.
 */
export function monadic( target, name, descriptor ) {
	var realfunc = descriptor.value;
	descriptor.value = function( ...args ) {
		var dup = this.clone();
		realfunc.apply( dup, args );
		return dup;
	};

	return descriptor;
}



/*
 * Originall extracted from es6-mapify by Jonathan Lipps <jlipps (at) gmail.com> to avoid
 * the dependency on Traceur.
 *
 * Used under the terms of the Apache-2.0 license.
 */


/**
 * Return a Map containing the properties of the specified {object}.
 *
 * @method mapify
 * @param {Object,Array} object   the object to convert to a Map, or an Array of
 *     objects to convert.
 *
 * @returns {Map}  the newly-created Map object, or an Array of converted Map
 *     objects
 */
export function mapify( obj ) {
	if ( typeof obj !== 'object' || obj === null || obj instanceof Map ) {
		return obj;
	}

	if (obj instanceof Array) {
		return obj.map( x => mapify(x) );
	} else {
		let m = new Map();
		Object.keys( obj ).forEach( k => {
			m.set( k, mapify(obj[k]) );
		});
		return m;
	}

}



/**
 * Return an Object containing the key-value pairs of the specified {map} as
 * properties.
 *
 * @method demapify
 * @param {Map,Array} object   the Map to convert to an Objet, or an Array of
 *     Maps to convert.
 *
 * @returns {Object}  the newly-created Object, or an Array of converted Object
 */
export function demapify( obj ) {
	if (obj instanceof Array) {
		logger.debug( "Demapifying an Array of Maps." );
		return obj.map( x => demapify(x) );
	} else if ( !(obj instanceof Map) ) {
		logger.debug( "Not a Map, returning it as-is." );
		return obj;
	}

	logger.debug( "Turning a Map into an Object." );
	let rval = {};
	for (let [k, v] of obj) {
		rval[k] = demapify(v);
	}
	return rval;
};

