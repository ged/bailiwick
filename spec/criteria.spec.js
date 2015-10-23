/**
 * Criteria tests
 *
 * jshint undef: true, unused: true, esnext: true
 * global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console
 */
'use strict';

import Promise from 'bluebird';
import 'babel/polyfill';

import {Criteria} from '../src/index';


describe( 'Criteria', () => {

	it( 'can construct clones of itself', () => {
		var criteria = new Criteria();
		var clone = criteria.clone();

		expect( clone ).toBeDefined();
		expect( clone ).not.toBe( criteria );
		expect( clone.filterClauses ).not.toBe( criteria.filterClauses );
	});


	it( "it knows it doesn't have a filter if no clauses have been added", () => {
		expect( new Criteria().hasFilter() ).toBeFalsy();
	});


	describe( 'filtering', () => {

		it( 'can be set up in the constructor', () => {
			var criteria = new Criteria({ status: 'shipped', shipDate: '2013-11-12' });
			expect( criteria ).toBeDefined();
			expect( criteria.hasFilter() ).toBeTruthy();
			expect( criteria.filterClauses.get('status') ).toEqual( 'shipped' );
			expect( criteria.filterClauses.get('shipDate') ).toEqual( '2013-11-12' );
		});


		it( 'can be fluently mutated by adding filter clauses', () => {
			var criteria = new Criteria();
			var clone = criteria.
				filter({ status: 'shipped' }).
				filter({ shipDate: '2013-11-12' });

			expect( criteria ).toBeDefined();
			expect( criteria.filterClauses.get('status') ).not.toBeDefined();
			expect( criteria.filterClauses.get('shipDate') ).not.toBeDefined();

			expect( clone ).toBeDefined();
			expect( clone.filterClauses.get('status') ).toEqual( 'shipped' );
			expect( clone.filterClauses.get('shipDate') ).toEqual( '2013-11-12' );
		});

	});


	describe( 'limiting', () => {

		it( 'can be fluently mutated by adding a limit', () => {
			var criteria = new Criteria().limit( 20 );

			expect( criteria ).toBeDefined();
			expect( criteria.maxResultCount ).toEqual( 20 );
		});

	});


	describe( 'offsetting', () => {

		it( 'can be fluently mutated by adding an offset', () => {
			var criteria = new Criteria().offset( 15 );

			expect( criteria ).toBeDefined();
			expect( criteria.resultOffset ).toEqual( 15 );
		});

	});


	describe( 'setting an alternate location', () => {

		it( 'can be set to fetch results from a specific "location"', () => {
			var criteria = new Criteria().from( "/somewhere/else" );

			expect( criteria ).toBeDefined();
			expect( criteria.location ).toEqual( "/somewhere/else" );
		});

	});

});


