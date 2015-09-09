/* -*- javascript -*- */
"use strict";

/**
 * Decorator: monadic
 *
 * Declare a method that acts as a monadic mutator -- calling it will operate on (and return)
 * a clone of the receiving object instead of the receiver.
 */
export function monadic( target, name, descriptor ) {
	var realfunc = descriptor.value;
	descriptor.value = function( ...args ) {
		console.debug( `Cloning for monadic method ${name}` );
		var dup = this.clone();
		console.debug( "  cloned: %o... applying method", dup );
		realfunc.apply( dup, args );
		return dup;
	};

	return descriptor;
}


/*
 * Extracted from es6-mapify by Jonathan Lipps <jlipps (at) gmail.com> to avoid
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
	if ( obj instanceof Map ) return obj;

	let m = new Map();

	if ( typeof obj !== 'object' || obj === null ) {
		return obj;
	}

	if ( obj instanceof Array ) {
		let newArr = [];
		for ( let x of obj ) {
			newArr.push( mapify(x) );
		}
		return newArr;
	}

	for (let k in obj) {
		if ( obj.hasOwnProperty(k) ) {
			m.set( k, mapify(obj[k]) );
		}
	};

	return m;
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
export function demapify( map ) {
	if ( map instanceof Array ) {
		let newArr = [];
		for ( let x of map ) {
			newArr.push( demapify(x) );
		}
		return newArr;
	} else if ( !(map instanceof Map) ) {
		return map;
	}

	let obj = {};
	for ( let [k, v] of map ) {
		obj[ k ] = demapify( v );
	}

	return obj;
};

