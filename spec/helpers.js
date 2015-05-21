/* -*- javascript -*- */
"use strict";

import 'babel/polyfill';

class JasmineCustomMatcher {

	constructor( utils, eqTesters ) {
		this.utils = utils;
		this.eqTesters = eqTesters;
		this.actual = null;
		this.expected = null;
		this.verb = 'match';
	}

	matches() {
		console.warn( "The default custom matcher never matches!" );
		return false;
	}

	compare( actual, expected ) {
		this.actual = actual;
		this.expected = expected;

		return this;
	}

	get pass() { return this.matches(); }

	get message() {
		if ( this.matches() ) {
			return this.describePositiveMatch();
		} else {
			return this.describeNegativeMatch();
		}
	}

	describePositiveMatch() {
		return `${this.actual} does ${this.verb} ${this.expected}`
	}

	describeNegativeMatch() {
		return `${this.actual} does not ${this.verb} ${this.expected}`;
	}

}


class BeAMatcher extends JasmineCustomMatcher {
	matches() {
		return this.actual instanceof this.expected;
	}

	describePositiveMatch() {
		return `${this.actual} is a ${this.expected.name}`;
	}

	describeNegativeMatch() {
		return `${this.actual} is not a ${this.expected.name}`;
	}
}


/*
 * Promise matchers
 */

class BeFulfilledMatcher extends JasmineCustomMatcher {

	matches() {
		return this.actual.isFulfilled();
	}

	describePositiveMatch() {
		return `${this.actual} is fulfilled.`
	}

	describeNegativeMatch() {
		return `${this.actual} is not fulfilled.`
	}

};



export class CustomMatcherFactory {

	toBeA( ...args ) { return new BeAMatcher(...args); }
	toBeFulfilled( ...args ) { return new BeFulfilledMatcher(...args); }

}

export var customMatchers = new CustomMatcherFactory();


