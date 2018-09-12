/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {Criteria} from '../src/index';
import {customMatchers} from './helpers';

const expect = chai.expect;

describe( 'Criteria', () => {

	it( 'can construct clones of itself', () => {
		let criteria = new Criteria();
		let clone = criteria.clone();

		expect( clone ).to.be.an.instanceof( Criteria );
		expect( clone ).to.not.equal( criteria );
		expect( clone ).to.deep.eq( criteria );
		expect( clone.filterClauses ).to.not.equal( criteria.filterClauses );
		expect( clone.filterClauses ).to.deep.eq( criteria.filterClauses );
	});


	it( 'copies its location when it is cloned', () => {
		let criteria = new Criteria();

		criteria.location = 'primary';
		let clone = criteria.clone();

		expect( clone.location ).to.eq( criteria.location );
		expect( clone.location ).to.deep.equal( criteria.location );
	});


	it( "it knows it doesn't have a filter if no clauses have been added", () => {
		let criteria = new Criteria();
		expect( criteria.hasFilter ).to.be.false;
	});


	describe( 'filtering', () => {

		it( 'can be set up in the constructor', () => {
			let criteria = new Criteria({ status: 'shipped', shipDate: '2013-11-12' });
			expect( criteria ).to.be.an.instanceof( Criteria );
			expect( criteria.hasFilter ).to.be.true;
			expect( criteria.filterClauses.get('status') ).to.equal( 'shipped' );
			expect( criteria.filterClauses.get('shipDate') ).to.equal( '2013-11-12' );
		});


		it( 'can be fluently mutated by adding filter clauses', () => {
			let criteria = new Criteria();
			let clone = criteria.
				filter({ status: 'shipped' }).
				filter({ shipDate: '2013-11-12' });

			expect( criteria ).to.be.an.instanceof( Criteria );
			expect( criteria.filterClauses.get('status') ).to.be.undefined;
			expect( criteria.filterClauses.get('shipDate') ).to.be.undefined;

			expect( clone ).to.be.an.instanceof( Criteria );
			expect( clone.filterClauses.get('status') ).to.equal( 'shipped' );
			expect( clone.filterClauses.get('shipDate') ).to.equal( '2013-11-12' );
		});


	});


	describe( 'limiting', () => {

		it( 'can be fluently mutated by adding a limit', () => {
			let criteria = new Criteria().limit( 20 );

			expect( criteria ).to.be.an.instanceof( Criteria );
			expect( criteria.maxResultCount ).to.equal( 20 );
		});

	});


	describe( 'offsetting', () => {

		it( 'can be fluently mutated by adding an offset', () => {
			let criteria = new Criteria().offset( 15 );

			expect( criteria ).to.be.an.instanceof( Criteria );
			expect( criteria.resultOffset ).to.equal( 15 );
		});

	});


	describe( 'setting an alternate location', () => {

		it( 'can be set to fetch results from a specific "location"', () => {
			let criteria = new Criteria().from( "/somewhere/else" );

			expect( criteria ).to.be.an.instanceof( Criteria );
			expect( criteria.location ).to.equal( "/somewhere/else" );
		});

	});

});
