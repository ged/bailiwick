/* -*- javascript -*- */
 /* global it, describe, expect, beforeEach, beforeAll, console, jasmine */
'use strict';

import {Model, Criteria, RESTService} from 'bailiwick';
import * as errors from 'bailiwick/errors';
import {customMatchers} from './helpers';

Promise.config({
	// Enables all warnings except "forgotten return" statements.
	warnings: {
		wForgottenReturn: false
	}
});


const DEFAULT_HEADERS = Object.freeze({
	'Content-type': 'application/json'
});

class User extends Model {}

function makeResolvingResponsePromise( data, status=200, statusText="Ok", headers={} ) {
	headers = Object.assign( {}, DEFAULT_HEADERS, headers );
	headers = new Headers( headers );

	let body = null;

	if ( typeof data === 'object' ) {
		let json = JSON.stringify( data );
		body = new Blob( [json], {type : 'application/json'} );
	} else if ( data != null ) {
		body = new Blob( [data.toString()], {type: 'application/octet-stream'} );
	}

	let response = new Response( body, {
		status,
		statusText,
		headers
	});

	return Promise.resolve( response );
}

function makeFailingResponsePromise( message="Network error", status=404 ) {
	let error = new TypeError( message );
	return Promise.reject( error );
}


describe( 'REST Service datastore class', () => {

	var datastore,
		baseUrl = 'http://localhost:8889/v1';

	beforeEach( () => {
		datastore = new RESTService( baseUrl );
		jasmine.addMatchers( customMatchers );
	});


	it( 'knows what its baseUrl is', () => {
		expect( datastore.baseUrl ).toEqual( baseUrl + '/' );
	});


	it( 'has a fetch client', () => {
		expect( datastore.httpClient ).toEqual({ fetch: fetch });
	});


	describe( 'getting a single object returns a Promise that', () => {

		it( 'resolves to the object with the specified ID', done => {
			let responseData = { id: 17, firstName: "Michael", lastName: "Carthwaite" };

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( makeResolvingResponsePromise(responseData) );

			datastore.get( User, 17 ).then( result => {
				expect( result ).toEqual( responseData );
			}).
			catch( e => {
				console.error( e );
			}).
			finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).toHaveBeenCalledWith( baseUrl + '/users/17', {
				method: 'GET',
				body: null,
				headers: {}
			});
		});


		it( 'rejects with "no such object" when the service 404s', done => {
			let responseData = { message: "No such user." };
			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( makeResolvingResponsePromise(responseData, 404, "Not found") );

			datastore.get( User, 17 ).
				then( result => {
					fail( "Didn't get an error response: ", result );
				}).
				catch( err => {
					console.error( err );
					expect( err ).toBeA( errors.RequestError );
					expect( err.response.status ).toEqual( 404 );
					expect( err.response.body.json().message ).toEqual( "No such user." );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).toHaveBeenCalledWith( baseUrl + '/users/17', {
				method: 'GET',
				body: null,
				headers: {}
			});
		});


		it( 'rejects with a server error when the service 500s', done => {
			let responseData = { message: "Internal error." };
			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( makeResolvingResponsePromise(responseData, 500, "Server error") );

			datastore.get( User, 17 ).
				then( result => {
					fail( "Didn't get an error response: ", result );
				}).
				catch( err => {
					console.error( err );
					expect( err ).toBeA( errors.ServerError );
					expect( err.response.status ).toEqual( 500 );
					expect( err.response.body.json().message ).toEqual( "Internal error." );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).toHaveBeenCalledWith( baseUrl + '/users/17', {
				method: 'GET',
				body: null,
				headers: {}
			});
		});

	});


	describe( 'getting a collection returns a Promise that', () => {

		let objects = [
			{ firstName: "Robin", lastName: "Loxley", alias: "Robin Hood" },
			{ firstName: "Robin", lastName: "Williams" },
			{ firstName: "Robin", lastName: "Leach" }
		];


		it( "resolves with an empty Array if the endpoint returns an empty collection", done => {
			let responseData = [];
			let criteria = new Criteria({ firstName: 'Rayban' });

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( makeResolvingResponsePromise(responseData) );

			datastore.get( User, criteria ).then( result => {
				expect( result ).toEqual( responseData );
			}).
			catch( e => {
				console.error( e );
			}).
			finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users?firstName=Rayban', {
					method: 'GET',
					body: null,
					headers: {}
				});
		});


		it( "resolves to an Array of objects if the endpoint returns a collection", done => {
			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( makeResolvingResponsePromise(objects) );
			let criteria = new Criteria({ firstName: 'Robin' });

			datastore.get( User, criteria ).then( result => {
				expect( result ).toEqual( objects );
			}).
			catch( e => {
				console.error( e );
			}).
			finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users?firstName=Robin', {
					method: 'GET',
					body: null,
					headers: {}
				});
		});

	});


	describe( 'storing an object returns a Promise that', () => {

		it( 'resolves if it is successfully stored', done => {
			let objectData = {firstName: "Jimiril", lastName: "Pan"};
			let responsePromise = makeResolvingResponsePromise( null, 201, 'Created', {
				Location: baseUrl + '/users/21'
			} );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.store( User, objectData ).
				then( result => {
					expect( result ).toEqual( 21 );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users', {
					method: 'POST',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});


		it( 'rejects with an error if the request fails', done => {
			let objectData = {firstName: "Jimiril", lastName: "Pan"};
			let responsePromise =
				makeResolvingResponsePromise({ message: "Already exists" }, 409, 'Conflict' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.store( User, objectData ).
				then( result => {
					fail( "Didn't get an error response: ", result );
				}).
				catch( err => {
					console.error( err );
					expect( err ).toBeA( errors.RequestError );
					expect( err.response.status ).toEqual( 409 );
					expect( err.response.body.json().message ).toEqual( "Already exists" );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users', {
					method: 'POST',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});

	});



	describe( 'updating an object returns a Promise that', () => {

		it( 'resolves if it is successfully updated', done => {
			let objectData = {id: 71, firstName: "Jimiril", lastName: "Pan"};
			let responsePromise = makeResolvingResponsePromise( objectData, 200, 'Ok' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.update( User, 71, objectData ).
				then( result => {
					expect( result ).toEqual( objectData );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users/71', {
					method: 'POST',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});


		it( 'rejects if the update fails', done => {
		});

	});


	describe( 'replacing', () => {

		let objects = [
			{ firstName: "Petyr", lastName: "Baelish", alias: "Little Finger" },
			{ firstName: "Jeyne", lastName: "Poole" },
			{ firstName: "Arya", lastName: "Stark", alias: "Waterdancer" }
		];
		let ids;

		beforeEach( done => {
			Promise.map( objects, obj => {
					return datastore.store( User, obj );
				}).
				then( newIds => {
					console.debug( `Got IDS=${newIds}` );
					ids = newIds;
				}).
				finally( done );
		});


		it( 'can replace the data for an existing object', done => {
			let objId = ids[ 2 ];
			datastore.replace( User, objId, {firstName: "Cat", lastName: "of the Canals"} ).
				then( replacedData => {
					expect( replacedData ).
						toEqual({ firstName: "Arya", lastName: "Stark", alias: "Waterdancer" });
					datastore.get( User, objId ).then( obj => {
						expect( obj ).
							toEqual({ firstName: "Cat", lastName: "of the Canals" });
					});
				}).
				finally( done );

		});


		it( 'rejects the returned Promise when attempting to replace a non-existent object', done => {
			let nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			console.debug( `Non-existent ID = ${nonexistentId}` );

			datastore.replace( User, nonexistentId, {firstName: 'Jaime'} ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).toEqual( `No such User ID=${nonexistentId}` );
				}).
				finally( done );
		});

	});


	describe( 'removing', () => {

		let objects = [
			{ firstName: "Lukas-Kasha", alias: "the King" },
			{ firstName: "Kayim" },
			{ firstName: "Nur-Jehan" }
		];
		let ids;

		beforeEach( done => {
			Promise.map( objects, obj => {
					return datastore.store( User, obj );
				}).
				then( newIds => {
					console.debug( `Got IDS=${newIds}` );
					ids = newIds;
				}).
				finally( done );
		});


		it( 'can remove the data for an existing object', done => {
			let objId = ids[ 1 ];
			datastore.remove( User, objId ).
				then( removedData => {
					expect( removedData ).toBe( true );

					datastore.get( User, objId ).then( obj => {
						fail( `User ${objId} was not removed.` );
					}).
					catch( err => {
						expect( err.name ).toEqual( "Error" );
						expect( err.message ).toEqual( `No such User ID=${objId}` );
					});
				}).
				finally( done );

		});


		it( 'resolves the returned Promise when removing a non-existent object', done => {
			let nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			console.debug( `Non-existent ID = ${nonexistentId}` );

			datastore.remove( User, nonexistentId ).
				then( result => {
					expect( result ).toBe( false );
				}).
				finally( done );
		});

	});

});
