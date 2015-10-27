/* -*- javascript -*- */
"use strict";

/**
 * Decorator: @validator
 * Marks the decorated method as a validator
 */
export function validator( field ) {
	return function decorator( target, name, descriptor ) {
		var methodBody = descriptor.value;

		if ( !target.validators ) {
			target.validators = new Map();
		}

		descriptor.value = function() {
			return new Promise( (resolve, reject) => {
				try {
					resolve( methodBody.apply(this) );
				} catch( e ) {
					reject([ field, e.message || e ]);
				}
			});
		};
		target.validators.set( field, descriptor.value );

		return descriptor;
	};
}



