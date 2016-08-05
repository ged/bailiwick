/* -*- javascript -*- */
 /* global it, describe, expect, beforeEach, beforeAll, console, jasmine */
'use strict';

import Promise from 'bluebird';
import {Model, Criteria, RESTService} from 'bailiwick';
import * as errors from 'bailiwick/errors';
import {debug} from 'bailiwick/utils';
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

	let body = undefined;

	if ( data && typeof data === 'object' ) {
		let json = JSON.stringify( data );
		body = new Blob( [json], {type : 'application/json'} );
	} else if ( data ) {
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
				debug( e );
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
					debug( err );
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
					debug( err );
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
				debug( e );
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
				debug( e );
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
			let responseData = { ...objectData,  id: 21 };
			let responsePromise = makeResolvingResponsePromise( responseData, 201, 'Created', {
				Location: baseUrl + '/users/21'
			} );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.store( User, objectData ).
				then( result => {
					expect( result ).toBeAn( Object );
					expect( result.id ).toEq( 21 );
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
					debug( err );
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
			let objectData = {firstName: "Jimiril", lastName: "Pan"};
			let responsePromise =
				makeResolvingResponsePromise({ message: "Validation error" }, 400, 'Request error' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.update( User, 32, objectData ).
				then( result => {
					fail( "Didn't get an error response: ", result );
				}).
				catch( err => {
					debug( err );
					expect( err ).toBeA( errors.RequestError );
					expect( err.response.status ).toEqual( 400 );
					expect( err.response.body.json().message ).toEqual( "Validation error" );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users/32', {
					method: 'POST',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});

	});


	describe( 'replacing an object returns a Promise that', () => {

		it( 'resolves if the replacement was successful', done => {
			let objectData = {id: 18, firstName: "Cat", lastName: "of the Canals"};
			let responsePromise = makeResolvingResponsePromise( objectData, 200, 'Ok' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.replace( User, 18, objectData ).
				then( result => {
					expect( result ).toEqual( objectData );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users/18', {
					method: 'PUT',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});

		});


		it( 'rejects the returned Promise when attempting to replace a non-existent object', done => {
			let objectData = {id: 28, firstName: "Jeyne", lastName: "Poole" };
			let responsePromise =
				makeResolvingResponsePromise({ message: "No such user (28)" }, 404, 'Not found' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.replace( User, 28, objectData ).
				then( result => {
					fail( "Didn't get an error response: ", result );
				}).
				catch( err => {
					debug( err );
					expect( err ).toBeA( errors.RequestError );
					expect( err.response.status ).toEqual( 404 );
					expect( err.response.body.json().message ).toEqual( "No such user (28)" );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users/28', {
					method: 'PUT',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});

	});


	describe( 'removing an object returns a Promise that', () => {

		it( 'resolves if the removal was successful', done => {
			let responsePromise = makeResolvingResponsePromise( null, 204, 'No content' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.remove( User, 136 ).
				then( result => {
					expect( result ).toBeNull();
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users/136', {
					method: 'DELETE',
					body: null,
					headers: {}
				});

		});


		it( 'rejects if the removal failed', done => {
			let responsePromise =
				makeResolvingResponsePromise({ message: "Permission denied." }, 403, 'Forbidden' );

			spyOn( datastore.httpClient, "fetch" ).and.
				returnValue( responsePromise );

			datastore.remove( User, 136 ).
				then( result => {
					fail( "Didn't get an error response: ", result );
				}).
				catch( err => {
					debug( err );
					expect( err ).toBeA( errors.RequestError );
					expect( err.response.status ).toEqual( 403 );
					expect( err.response.body.json().message ).toEqual( "Permission denied." );
				}).
				finally( done );

			expect( datastore.httpClient.fetch ).toHaveBeenCalledTimes( 1 );
			expect( datastore.httpClient.fetch ).
				toHaveBeenCalledWith( baseUrl + '/users/136', {
					method: 'DELETE',
					body: null,
					headers: {}
				});
		});

	});

});
