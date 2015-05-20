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
		var dup = this.clone();
		realfunc.apply( dup, args );
		return dup;
	};

	return descriptor;
}

