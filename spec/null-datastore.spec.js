/**
 * NullDatastore tests
 */
'use strict';

import {NullDatastore} from '../src/null-datastore';
import {Model} from '../src/model';

class User extends Model {}

describe( 'Null Datastore class', () => {

	var datastore;

	beforeEach( () => {
		datastore = new NullDatastore();
	});


	describe( 'get', () => {

		it( 'fetches the object with the specified ID', done => {
			var testData = { testing: "object" };
			datastore.store( User, testData ).then( id => {
				datastore.get( User, id ).then( result => {
					expect( result ).toEqual( testData );
				});
			}).
			finally( done );
		});


		it( 'rejects with "no such object" when getting a non-existant object', done => {
			datastore.get( User, 1 ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).toEqual( "No such User ID=1" );
					done();
				});
		});

	});


	describe( 'get a collection', () => {

		describe( 'with an empty store', () => {

			it( 'resolves with an empty Array ', done => {
				datastore.get( User ).
					then( result => {
						expect( typeof result ).toEqual( 'Array' );
						expect( result.length ).toBe( 0 );
					}).
					finally( done );
			});

		});

		describe( 'with a store containing objects', () => {

			var objects = [
				{ firstName: "Robin", lastName: "Loxley", alias: "Robin Hood" },
				{ firstName: "Robin", lastName: "Williams" },
				{ firstName: "Robin", lastName: "Leach" }
			];

			beforeEach( done => {
				var stores = [];
				for ( var object of objects ) {
					stores.push( datastore.store(object) );
				}
				Promise.all( stores ).then( done );
			});

			afterEach( () => {
				datastore._clear();
			});


			it( "resolves with an empty Array if the criteria don't match anything", done => {
				datastore.getList({ firstName: 'Rob' }).
					then( result => {
						expect( result.length ).toBe( 0 );
						done();
					});
			});

			it( "resolves with an Array of matches if the criteria match", done => {
				datastore.getList({ firstName: 'Robin' }).
					then( result => {
						expect( result.length ).toBe( 3 );
						expect( result ).toEqual( jasmine.arrayContaining(objects) );
						done();
					});
			});

		});

	});

});

