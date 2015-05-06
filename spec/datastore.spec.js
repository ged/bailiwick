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

	})

});

