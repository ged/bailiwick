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
	},

	toBeFulfilled: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual.isFulfilled()
				};
				if ( result.pass ) {
					result.message = `${actual} is fulfilled`;
				} else {
					result.message = `${actual} is not fulfilled`;
				}

				return result;
			}
		};
	},

	toBeRejected: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual.isRejected()
				};
				if ( result.pass ) {
					result.message = `${actual} is rejected`;
				} else {
					result.message = `${actual} is not rejected`;
				}

				return result;
			}
		};
	},

	toBePending: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual.isPending()
				};
				if ( result.pass ) {
					result.message = `${actual} is pending`;
				} else {
					result.message = `${actual} is not pending`;
				}

				return result;
			}
		};
	}

};


