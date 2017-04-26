/* -*- javascript -*- */
"use strict";

export function customMatchers( chai, utils ) {

	var Assertion = chai.Assertion;


	Assertion.addProperty( 'dirty', function() {
		this.assert(
			this._obj.isDirty(),
			`expected ${this} to be marked dirty`,
			`expected ${this} not to be marked dirty`
		);
	});

};

