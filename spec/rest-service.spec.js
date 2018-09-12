/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';
import 'isomorphic-fetch';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import {RESTService, Criteria, Model, RequestError} from '../src/index';
import {logger} from '../src/utils';
import {customMatchers} from './helpers';

const expect = chai.expect;


const DEFAULT_HEADERS = Object.freeze({
	'Content-type': 'application/json'
});

function makeResolvingResponsePromise( data, status=200, statusText="Ok", headers={} ) {
	headers = Object.assign( {}, DEFAULT_HEADERS, headers );
	headers = new Headers( headers );

	let body = undefined;

	if ( data && typeof data === 'object' ) {
		body = JSON.stringify( data );
	} else if ( data ) {
		body = data.toString();
	}

	logger.debug( "Using response body: ", body );
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

	let User = class extends Model {},
	    datastore = null,
	    baseUrl = 'http://localhost:8889/v1',
	    sandbox = null;

	beforeEach( () => {
		sandbox = sinon.sandbox.create();

		chai.use( sinonChai );
		chai.use( customMatchers );
		chai.use( chaiAsPromised );

		User.datastore = datastore = new RESTService( baseUrl );
	});

	afterEach( ()  => {
		sandbox.restore();
	});


	it( 'knows what its baseUrl is', () => {
		expect( datastore.baseUrl ).to.equal( baseUrl + '/' );
	});


	it( 'has a fetch client', () => {
		expect( datastore.httpClient ).to.deep.equal({ fetch: fetch });
	});


	it( 'handles responses with no entity body correctly' );


	describe( 'getting a single object returns a Promise that', () => {

		it( 'resolves to the object with the specified ID', () => {
			let responseData = { id: 17, firstName: "Michael", lastName: "Carthwaite" };

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( makeResolvingResponsePromise(responseData) );

			return expect( datastore.get(User, 17) ).to.be.fulfilled.
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
					expect( datastore.httpClient.fetch ).to.have.been.
						calledWith( baseUrl + '/users/17', {
				method: 'GET',
				body: null,
				headers: {}
			});
		});
		});


		it( 'rejects with "no such object" when the service 404s', () => {
			let responseData = { message: "No such user." };

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( makeResolvingResponsePromise(responseData, 404, "Not found") );

			return expect( datastore.get(User, 17) ).to.be.rejectedWith( /\[404\] not found/i );
		});


		it( 'rejects with a server error when the service 500s', () => {
			let responseData = { message: "Internal error." };

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( makeResolvingResponsePromise(responseData, 500, "Server error") );

			return expect( datastore.get(User, 17) ).to.be.rejectedWith( /\[500\] server error/i );
		});

	});


	describe( 'getting a collection returns a Promise that', () => {

		let objects = [
			{ firstName: "Robin", lastName: "Loxley", alias: "Robin Hood" },
			{ firstName: "Robin", lastName: "Williams" },
			{ firstName: "Robin", lastName: "Leach" }
		];


		it( "resolves with an empty Array if the endpoint returns an empty collection", () => {
			let responseData = [];
			let criteria = new Criteria({ firstName: 'Rayban' });

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( makeResolvingResponsePromise(responseData) );

			return expect( datastore.get(User, criteria) ).
				to.eventually.deep.equal( responseData ).
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
			expect( datastore.httpClient.fetch ).
						to.have.been.calledWith( baseUrl + '/users?firstName=Rayban', {
					method: 'GET',
					body: null,
					headers: {}
				});
		});
		});


		it( "resolves to an Array of objects if the endpoint returns a collection", () => {
			let criteria = new Criteria({ firstName: 'Robin' });

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( makeResolvingResponsePromise(objects) );

			return expect( datastore.get(User, criteria) ).
				to.eventually.deep.equal( objects ).
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
			expect( datastore.httpClient.fetch ).
						to.have.been.calledWith( baseUrl + '/users?firstName=Robin', {
					method: 'GET',
					body: null,
					headers: {}
				});
		});
		});

	});


	describe( 'storing an object returns a Promise that', () => {

		it( 'resolves if it is successfully stored', () => {
			let objectData = {firstName: "Jimiril", lastName: "Pan"};
			let responseData = { ...objectData,  id: 21 };
			let responsePromise = makeResolvingResponsePromise( responseData, 201, 'Created', {
				Location: baseUrl + '/users/21'
			} );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.store(User, objectData) ).
				to.eventually.deep.equal( responseData ).
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
			expect( datastore.httpClient.fetch ).
						to.have.been.calledWith( baseUrl + '/users', {
					method: 'POST',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});
		});


		it( 'rejects with an error if the request fails', () => {
			let objectData = {firstName: "Jimiril", lastName: "Pan"};
			let responsePromise =
				makeResolvingResponsePromise({ message: "Already exists" }, 409, 'Conflict' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.store(User, objectData) ).
				to.be.rejectedWith( /\[409\] conflict/i );
		});

	});


	describe( 'updating an object returns a Promise that', () => {

		it( 'resolves if it is successfully updated', () => {
			let objectData = {id: 71, firstName: "Jimiril", lastName: "Pan"};
			let responsePromise = makeResolvingResponsePromise( objectData, 200, 'Ok' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.update(User, 71, objectData) ).
				to.eventually.deep.equal( objectData ).
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
			expect( datastore.httpClient.fetch ).
						to.have.been.calledWith( baseUrl + '/users/71', {
					method: 'POST',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});
		});


		it( 'rejects if the update fails', () => {
			let objectData = {firstName: "Jimiril", lastName: "Pan"};
			let responsePromise =
				makeResolvingResponsePromise({ message: "Validation error" }, 400, 'Request error' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.update(User, 32, objectData) ).
				to.be.rejectedWith( /\[400\] request error/i );
		});

	});


	describe( 'replacing an object returns a Promise that', () => {

		it( 'resolves if the replacement was successful', () => {
			let objectData = {id: 18, firstName: "Cat", lastName: "of the Canals"};
			let responsePromise = makeResolvingResponsePromise( objectData, 200, 'Ok' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.replace(User, 18, objectData) ).
				to.eventually.deep.equal( objectData ).
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
			expect( datastore.httpClient.fetch ).
						to.have.been.calledWith( baseUrl + '/users/18', {
					method: 'PUT',
					body: JSON.stringify(objectData),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
		});
		});


		it( 'rejects the returned Promise when attempting to replace a non-existent object', () => {
			let objectData = {id: 28, firstName: "Jeyne", lastName: "Poole" };
			let responsePromise =
				makeResolvingResponsePromise({ message: "No such user (28)" }, 404, 'Not found' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.replace(User, 28, objectData) ).
				to.be.rejectedWith( /\[404\] not found/i );
		});

	});


	describe( 'removing an object returns a Promise that', () => {

		it( 'resolves if the removal was successful', () => {
			let objectData = {id: 136, firstName: "Cersei", lastName: "Lannister" };
			let responsePromise = makeResolvingResponsePromise( objectData, 200, 'Ok' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.remove(User, 136) ).
				to.eventually.deep.equal( objectData ).
				then( () => {
					expect( datastore.httpClient.fetch ).to.have.been.calledOnce;
			expect( datastore.httpClient.fetch ).
						to.have.been.calledWith( baseUrl + '/users/136', {
					method: 'DELETE',
					body: null,
					headers: {}
				});
		});
		});


		it( 'rejects if the removal failed', () => {
			let responsePromise =
				makeResolvingResponsePromise({ message: "Permission denied." }, 403, 'Forbidden' );

			sandbox.stub( datastore.httpClient, "fetch" ).
				resolves( responsePromise );

			return expect( datastore.remove(User, 136) ).
				to.be.rejectedWith( /\[403\] forbidden/i );
		});

	});

});
