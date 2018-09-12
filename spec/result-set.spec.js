/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {NullDatastore, ResultSet, Criteria, Model} from '../src/index';
import {logger} from '../src/utils';
import {customMatchers} from './helpers';

const expect = chai.expect;


describe( 'ResultSet class', () => {

	let User = class extends Model {},
	    user1,
		user2,
		user3,
		sandbox = null;

	beforeEach( () => {
		sandbox = sinon.sandbox.create();

		chai.use( sinonChai );
		chai.use( chaiAsPromised );
		chai.use( customMatchers );

		User.datastore = new NullDatastore();

		return Promise.all([
			User.create({ firstName: "Paul", lastName: "Atreides", nickName: "Muad'Dib" }).
				then( result => user1 = result ),
			User.create({ firstName: "Alia", lastName: "Atreides", nickName: "St. Alia of the Knife" }).
				then( result => user2 = result ),
			User.create({ firstName: "Duncan", lastName: "Idaho" }).
				then( result => user3 = result )
		]);
	} );

	afterEach( ()  => {
		sandbox.restore();
	});


	it( 'can be created with a Model and a Criteria', () => {
		let criteria = Criteria.all();
		let rs = new ResultSet( User, criteria );

		return expect( rs.get() ).to.be.fulfilled.then( results => {
			expect( results ).to.have.lengthOf( 3 );
			expect( results[0] ).to.be.an.instanceof( User ).and.
				have.property( 'firstName', 'Paul' );
			expect( results[1] ).to.be.an.instanceof( User ).and.
				have.property( 'firstName', 'Alia' );
			expect( results[2] ).to.be.an.instanceof( User ).and.
				have.property( 'firstName', 'Duncan' );
		});
	} );


	it( 'can generate a Criteria with both a URI and parameters', done => {
		let criteria = Criteria.all();
		let rs = new ResultSet( User )

		rs = rs.where({ a: 1, b: 2 });
		rs = rs.from( '/foo/bar' );

		expect( rs.criteria.location ).to.equal( '/foo/bar' );
		expect( rs.criteria.filterClauses.get('a') ).to.equal( 1 );
		expect( rs.criteria.filterClauses.get('b') ).to.equal( 2 );

		done();
	});


	it( 'can generate a Criteria with filter parameters', done => {
		let criteria = Criteria.all();
		let rs = new ResultSet( User )

		rs = rs.where({ a: 1, b: 2 });

		expect( rs.criteria.location ).to.beNull;
		expect( rs.criteria.filterClauses.get('a') ).to.equal( 1 );
		expect( rs.criteria.filterClauses.get('b') ).to.equal( 2 );

		done();
	});


	it( 'can fetch a Promise from its model', () => {
		sandbox.stub( User, 'get' ).resolves( user2 );

		let rs = new ResultSet( User )
		rs = rs.where({ id: 2 });

		return expect( rs.get() ).
			to.eventually.deep.equal( user2 ).
			then( () => {
				expect( User.get ).to.have.been.calledWith( rs.criteria ).once;
			});
	});

} );
