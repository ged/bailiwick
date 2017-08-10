/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import {NullDatastore, ResultSet, Criteria, Model} from '../src/index';
import {logger} from '../src/utils';
import {customMatchers} from './helpers';

const expect = chai.expect;


describe( 'ResultSet class', () => {

	var User = class extends Model {},
	    user1,
		user2,
		user3;

	beforeEach( () => {
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


	it( 'can be created with a Model and a Criteria', () => {
		var criteria = Criteria.all();
		var rs = new ResultSet( User, criteria );

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

} );
