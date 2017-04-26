/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';

import {Datastore, Criteria, Model, NotImplementedError} from '../src/index';
import {debug} from '../src/utils';
import {customMatchers} from './helpers';

const expect = chai.expect;


describe( 'Datastore class', () => {

	var Profile = class extends Model {},
	    store = null;


	beforeEach( () => {
		store = new Datastore();
		chai.use( chaiAsPromised );
	});


	describe( 'get', () => {

		it( 'rejects with "not implemented"', () => {
			return expect( store.get(Profile, 1) ).
				// to.be.rejectedWith( NotImplementedError, "No implementation provided for getInstance(...)" );
				to.be.rejectedWith( "No implementation provided for getInstance(...)" );
		});

	});


	describe( 'getCollection', () => {

		it( 'rejects with "not implemented"', () => {
			return expect( store.get(Profile, Criteria.all()) ).
				// to.be.rejectedWith( NotImplementedError, "No implementation provided for getCollection(...)" );
				to.be.rejectedWith( "No implementation provided for getCollection(...)" );
		});

	});


	describe( 'store', () => {

		it( 'rejects with "not implemented"', () => {
			return expect( store.store(Profile, {}) ).
				// to.be.rejectedWith( NotImplementedError, "No implementation provided for store(...)" );
				to.be.rejectedWith( "No implementation provided for store(...)" );
		});

	});


	describe( 'update', () => {

		it( 'rejects with "not implemented"', () => {
			return expect( store.update(Profile, 1, {}) ).
				// to.be.rejectedWith( NotImplementedError, "No implementation provided for update(...)" );
				to.be.rejectedWith( "No implementation provided for update(...)" );
		});

	});


	describe( 'replace', () => {

		it( 'rejects with "not implemented"', () => {
			return expect( store.replace(Profile, {}) ).
				// to.be.rejectedWith( NotImplementedError, "No implementation provided for replace(...)" );
				to.be.rejectedWith( "No implementation provided for replace(...)" );
		});

	});


	describe( 'remove', () => {

		it( 'rejects with "not implemented"', () => {
			return expect( store.remove(Profile, {}) ).
				// to.be.rejectedWith( NotImplementedError, "No implementation provided for remove(...)" );
				to.be.rejectedWith( "No implementation provided for remove(...)" );
		});

	});

});
