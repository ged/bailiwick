'use strict';

import {NotImplementedError} from '../src/utils';
import {Datastore} from '../src/datastore';
import {Model} from '../src/model';


class Profile extends Model {}


describe( 'base Datastore class', () => {

	var store;

	beforeEach( () => {
		store = new Datastore();
	});


	describe( 'get', () => {

		it( 'rejects with "not implemented"', done => {
			store.get( Profile, 1 ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).
						toEqual( "No implementation provided for getInstance(...)" );
					done();
				});
		});

	});


	describe( 'getCollection', () => {

		it( 'rejects with "not implemented"', done => {
			store.get( Profile ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
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
					expect( err.name ).toEqual( "Error" );
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
					expect( err.name ).toEqual( "Error" );
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
					expect( err.name ).toEqual( "Error" );
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
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).
						toEqual( "No implementation provided for remove(...)" );
					done();
				});
		});

	});

});

