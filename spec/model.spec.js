/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import {NullDatastore, Criteria, Model, ResultSet, validator, ValidationError} from '../src/index';
import {logger} from '../src/utils';
import {customMatchers} from './helpers';

const expect = chai.expect;


describe( 'Model class', () => {

	let sandbox = null;
	let User = class extends Model {

		@validator( 'firstName' )
		validateFirstName() {
			logger.debug( "validateFirstName called!" );
			if ( this.firstName === 'Nate' ) {
				throw new ValidationError( "no Nates allowed." );
			} else if ( !this.firstName || this.firstName === '' ) {
				throw new ValidationError( "missing" );
			}
		}

		@validator( 'lastName' )
		validateLastName() {
			logger.debug( "validateLastName called!" );
			if ( !this.lastName || this.lastName === '' ) {
				throw new ValidationError( "missing" );
			}
		}

	};


	beforeEach( () => {
		sandbox = sinon.sandbox.create();

		User.datastore = new NullDatastore();

		chai.use( sinonChai );
		chai.use( chaiAsPromised );
		chai.use( customMatchers );
	} );


	afterEach( ()  => {
		sandbox.restore();
	});


	describe( 'attributes', () => {
		let data, user;

		beforeEach( () => {
			data = { firstName: "Robin", lastName: "Hood", email: "hood@sherwood.org" };
			user = new User( data );
		} );


		it( 'are set up as object properties', () => {
			expect( user.firstName ).to.equal( data.firstName );
			expect( user.lastName ).to.equal( data.lastName );
			expect( user.email ).to.equal( data.email );
		} );


		it( 'show up in the toString() of a model object', () => {
			expect( user.toString() ).
				to.match( /\[object \w+ values=\{firstName: Robin, lastName: Hood.*\]/i );
		} );

	} );


	describe( 'dirty-marking', () => {
		let data, user;

		beforeEach( () => {
			data = { firstName: "Gavin", lastName: "Rossdale", email: "gavin@bush.group" };
			user = new User( data );
		} );


		it( 'marks new objects as dirty', () => {
			expect( user ).to.be.dirty;
		} );


		it( 'can remove all dirty flags', () => {
			user.markClean();
			return expect( user ).not.to.be.dirty;
		} );


		it( 'clears dirty flags when an object is created', () => {
			return expect( user.create() ).to.be.fulfilled.
				then( () => {
					expect( user ).to.not.be.dirty;
				});
		} );


		it( 'clears dirty flags when an object is updated', () => {
			return user.save().then( () => {
				user.firstName = "Devin";
				expect( user ).to.be.dirty;
				return expect( user.update() ).to.be.fulfilled.
					then( () => {
						expect( user ).to.not.be.dirty;
					});
			});

		} );

	} );


	describe( 'resultsets', () => {

		it( '#where returns a resultset that combines the model and a criteria', () => {
			let result = User.where( { firstName: 'Arya' } );
			expect( result ).to.be.an.instanceof( ResultSet );
			expect( result.criteria ).to.be.an.instanceof( Criteria );
			expect( result.criteria.filterClauses.get('firstName') ).to.equal( 'Arya' );
		} );

	} );


	describe( 'saving', () => {

		let data, user;

		beforeEach( () => {
			data = {
				firstName: "Rick",
				lastName: "Sanchez",
				email: "science.guy1966@realfakedoors.com"
			};
		} );


		it( "creates the object if it's new", () => {
			user = new User( data );

			sandbox.stub( User.datastore, 'store' ).resolves( data );
			return expect( user.save() ).to.be.fulfilled.
				then( () => {
					return expect( User.datastore.store ).to.have.been.calledOnce;
				});
		} );


		it( "updates the object if it's not new but has been changed", () => {
			user = new User( data, false );
			user.email = 'rs18841@trunkpeopletube.com'; // dirty the object

			sandbox.stub( User.datastore, 'update' ).resolves( data );

			return expect( user.save() ).to.be.fulfilled.
				then( () => {
					return expect( User.datastore.update ).to.have.been.calledOnce;
				});
		} );


		it( "doesn't do anything if it's not new and is unchanged", () => {
			user = new User( data, false );

			sandbox.stub( User.datastore, 'update' ).resolves( data );

			return expect( user.save() ).to.be.fulfilled.
				then( () => {
					return expect( User.datastore.update ).to.not.have.been.called;
				});
		} );


		it( "updates the object's fields with the returned entity if it's an Object", () => {
			let updatedEntity = Object.assign( {}, data, {
				created_at: 'Thu Aug  3 15:57:08 PDT 2017',
				email: 'scxxx@realfakedoors.com'
			});

			user = new User( data );

			sandbox.stub( User.datastore, 'store' ).resolves( updatedEntity );

			return expect( user.save() ).to.be.fulfilled.
				then( () => {
					return expect( user.created_at ).to.equal( updatedEntity.created_at );
				});
		} );


		it( "sets the object's ID to the value of the returned entity if it's not an Object", () => {
			user = new User( data );

			sandbox.stub( User.datastore, 'store' ).resolves( 12 );

			return expect( user.save() ).to.be.fulfilled.
				then( () => {
					return expect( user.id ).to.equal( 12 );
				});
		} );

	});


	describe( 'replacing', () => {

		let data, user;

		beforeEach( () => {
			data = {
				id: 12,
				firstName: "Rick",
				lastName: "Sanchez",
				email: "science.guy1966@realfakedoors.com",
				removed_at: new Date()
			};
			user = new User( data );
		} );


		it( "replaces the object's data in the datastore", () => {
			sandbox.stub( User.datastore, 'replace' ).
				resolves( Object.assign(data, {removed_at: null}) );

			return expect( user.replace() ).to.be.fulfilled.
				then( () => {
					expect( User.datastore.replace ).to.have.been.calledOnce;
					expect( user.removed_at ).to.beNull;
				});
		} );

	});


	describe( 'deleting', () => {

		let data, user;

		beforeEach( () => {
			data = {
				id: 12,
				firstName: "Rick",
				lastName: "Sanchez",
				email: "science.guy1966@realfakedoors.com",
				removed_at: null
			};
			user = new User( data );
		} );


		it( "removes the object from the datastore", () => {
			let removedDate = new Date();
			sandbox.stub( User.datastore, 'remove' ).
				resolves( Object.assign(data, {removed_at: removedDate}) );
			return expect( user.delete() ).to.be.fulfilled.
				then( () => {
					expect( User.datastore.remove ).to.have.been.calledOnce;
					expect( user.removed_at ).to.eq( removedDate );
				});
		} );


		it( "is a no-op if it doesn't have an ID", () => {
			user.id = null;

			sandbox.stub( User.datastore, 'remove' );

			return expect( user.delete() ).to.be.fulfilled.
				then( () => {
					expect( User.datastore.remove ).not.to.have.been.called;
				});
		} );

	});


	describe( 'validation', () => {

		let data, user;

		beforeEach( () => {
			data = { firstName: "Miki", lastName: "Berenyi", email: "m@lulabox.eu" };
			user = new User( data );
		} );


		it( 'returns a Promise that resolves if the object is valid', () => {
			return expect( user.validate() ).to.be.fulfilled;
		} );

		it( 'returns a Promise that rejects if the object is not valid', () => {
			user.firstName = 'Nate'; // No Nates allowed
			user.lastName = null; // missing

			return expect( user.validate() ).to.be.rejectedWith( "no Nates" );
		} );

	} );


	describe( 'refreshing', () => {

		it( "refreshes the object if the object has an id", () => {
			let user = new User( { id: 123, firstName: "Mr." } );

			sandbox.stub( User.datastore, 'get' ).withArgs( user.constructor, user.id ).resolves( { firstName: "Mister" } );

			return expect( user.refresh() ).to.be.fulfilled.then( () => {
				expect( user.firstName ).to.equal( "Mister" );
			} );

		} );


		it( "throws an error if the object does not have an id", () => {
			let user = new User();

			expect( user.refresh.bind( user ) ).to.throw(/Cannot refresh an object with no id/);
		} );
	} );

} );


