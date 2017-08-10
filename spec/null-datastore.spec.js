/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import {NullDatastore, Criteria, Model} from '../src/index';
import {logger} from '../src/utils';

const expect = chai.expect;


describe( 'Null Datastore class', () => {

	var User = class extends Model {},
	    datastore = null;


	beforeEach( () => {
		chai.use( chaiAsPromised );
		datastore = new NullDatastore();
	});


	describe( 'get', () => {

		it( 'fetches the object with the specified ID', () => {
			var testData = { testing: "object" };
			return datastore.store( User, testData ).then( id => {
				datastore.get( User, id ).then( result => {
					expect( result ).to.deep.equal( testData );
				});
			})
		});


		it( 'rejects with "no such object" when getting a non-existent object', () => {
			return expect( datastore.get(User, 1) ).
				to.be.rejectedWith( "No such User ID=1" );
		});

	});


	describe( 'get a collection', () => {

		describe( 'with an empty store', () => {

			it( 'resolves with an empty Array ', () => {
				return expect( datastore.get(User) ).
					to.eventually.deep.equal( [] );
			});

		});


		describe( 'with a store containing objects', () => {

			var objects = [
				{ firstName: "Robin", lastName: "Loxley", alias: "Robin Hood" },
				{ firstName: "Robin", lastName: "Williams" },
				{ firstName: "Robin", lastName: "Leach" }
			];


			beforeEach( () => {
				return Promise.each( objects, obj => datastore.store(User, obj) );
			});


			it( "resolves with an Array of matches if the criteria match", () => {
				var criteria = new Criteria( User, { firstName: 'Robin' } );
				return expect( datastore.get(User, criteria) ).
					to.eventually.deep.equal( objects );
			});


			it( "resolves with an empty Array if the criteria don't match anything", () => {
				var criteria = new Criteria({ firstName: 'Rob' });
				return expect( datastore.get(User, criteria) ).
					to.eventually.deep.equal( [] );
			});


		});

	});


	describe( 'updating', () => {

		var objects = [
			{ firstName: "Marian", lastName: "Cooper", alias: "Maid Marian" },
			{ firstName: "Jillian", lastName: "Garland" },
			{ firstName: "Gillian", lastName: "Temper" }
		];
		var ids;


		beforeEach( () => {
			return Promise.
				map( objects, obj => datastore.store(User, obj) ).
				then( results => ids = results );
		});


		it( 'can update the data for an existing object', () => {
			var objId = ids[ 0 ];
			return expect( datastore.update(User, objId, {firstName: 'Jemma'}) ).
				to.eventually.deep.equal({
					firstName: "Jemma",
					lastName: "Cooper",
					alias: "Maid Marian"
				}).
				then( () => {
					return expect( datastore.get(User, objId) ).
						to.eventually.deep.equal({
							firstName: "Jemma",
							lastName: "Cooper",
							alias: "Maid Marian"
					});
				});
		});


		it( 'rejects the returned Promise when attempting to update a non-existent object', () => {
			var nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			logger.debug( `Non-existent ID = ${nonexistentId}` );

			return expect( datastore.update(User, nonexistentId, {firstName: 'Jaime'}) ).
				to.be.rejectedWith( `No such User ID=${nonexistentId}` );
		});

	});


	describe( 'replacing', () => {

		var objects = [
			{ firstName: "Petyr", lastName: "Baelish", alias: "Little Finger" },
			{ firstName: "Jeyne", lastName: "Poole" },
			{ firstName: "Arya", lastName: "Stark", alias: "Waterdancer" }
		];
		var ids;


		beforeEach( () => {
			return Promise.map( objects, obj => datastore.store(User, obj) ).
				then( newIds => ids = newIds );
		});


		it( 'can replace the data for an existing object', () => {
			var objId = ids[ 2 ];
			var replaceData = {firstName: "Cat", lastName: "of the Canals"};

			return expect( datastore.replace(User, objId, replaceData) ).
				to.eventually.deep.equal( objects[2] ).
				then( () => {
					expect( datastore.get(User, objId) ).
						to.eventually.deep.equal( replaceData );
					});

		});


		it( 'rejects the returned Promise when attempting to replace a non-existent object', () => {
			var nonexistentId = ids.reduce( (id1, id2) => Math.max(id1, id2) ) + 1;
			logger.debug( `Non-existent ID = ${nonexistentId}` );

			return expect( datastore.replace(User, nonexistentId, {firstName: 'Jaime'}) ).
				to.be.rejectedWith( `No such User ID=${nonexistentId}` );
		});

	});


	describe( 'removing', () => {

		var objects = [
			{ firstName: "Lukas-Kasha", alias: "the King" },
			{ firstName: "Kayim" },
			{ firstName: "Nur-Jehan" }
		];
		var ids;

		beforeEach( () => {
			return Promise.map( objects, obj => datastore.store(User, obj) ).
				then( newIds => ids = newIds );
		});


		it( 'can remove the data for an existing object', () => {
			var objId = ids[ 1 ];
			return expect( datastore.remove(User, objId) ).
				to.eventually.be.true.
				then( () => {
					expect( datastore.get(User, objId) ).
						to.be.rejectedWith( `No such User ID=${objId}` );
					});

		});


		it( 'resolves the returned Promise when removing a non-existent object', () => {
			var nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			logger.debug( `Non-existent ID = ${nonexistentId}` );

			return expect( datastore.remove(User, nonexistentId) ).
				to.eventually.be.false;
		});

	});

});

