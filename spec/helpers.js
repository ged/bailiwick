/* -*- javascript -*- */
"use strict";

export var customMatchers = {

	toBeA: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual instanceof expected
				};
				if ( result.pass ) {
					result.message = `${actual} is a ${expected.name}`;
				} else {
					result.message = `${actual} is not a ${expected.name}`;
				}

				return result;
			}
		};
	}

};

