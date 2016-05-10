/* -*- Criteria tests -*- */

 /* global it, describe, expect, beforeEach, console */
'use strict';

import {Model, Criteria, Datastore, NotImplementedError} from 'bailiwick';
import * as helpers from './helpers';

class Profile extends Model {}


describe( 'Datastore class', () => {

	var store;

	beforeEach( () => {
		store = new Datastore();
		jasmine.addMatchers( helpers.customMatchers );
	});


	describe( 'get', () => {

		it( 'rejects with "not implemented"', done => {
			store.get( Profile, 1 ).
				catch( err => {
					console.log( `Caught error: ${err}` );
					expect( err ).toBeA( NotImplementedError );
					expect( err.message ).
						toEqual( "No implementation provided for getInstance(...)" );
					done();
				});
		});

	});


	describe( 'getCollection', () => {

		it( 'rejects with "not implemented"', done => {
			store.get( Profile, Criteria.all() ).
				catch( err => {
					console.error( err );
					expect( err ).toBeA( NotImplementedError );
					expect( err.message ).
						toEqual( "No implementation provided for getCollection(...)" );
					done();
				});
		});

	});


	describe( 'store', () => {

		it( 'rejects with "not implemented"', done => {
			store.store( Profile, {} ).
				catch( err => {
					expect( err ).toBeA( NotImplementedError );
					expect( err.message ).
						toEqual( "No implementation provided for store(...)" );
					done();
				});
		});

	});


	describe( 'update', () => {

		it( 'rejects with "not implemented"', done => {
			store.update( Profile, 1, {} ).
				catch( err => {
					expect( err ).toBeA( NotImplementedError );
					expect( err.message ).
						toEqual( "No implementation provided for update(...)" );
					done();
				});
		});

	});


	describe( 'replace', () => {

		it( 'rejects with "not implemented"', done => {
			store.replace( Profile, {} ).
				catch( err => {
					expect( err ).toBeA( NotImplementedError );
					expect( err.message ).
						toEqual( "No implementation provided for replace(...)" );
					done();
				});
		});

	});


	describe( 'remove', () => {

		it( 'rejects with "not implemented"', done => {
			store.remove( Profile, {} ).
				catch( err => {
					expect( err ).toBeA( NotImplementedError );
					expect( err.message ).
						toEqual( "No implementation provided for remove(...)" );
					done();
				});
		});

	});

});
