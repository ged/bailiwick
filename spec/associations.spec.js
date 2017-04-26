/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {NullDatastore, Criteria, Model, OneToManyAssociation, ManyToOneAssociation} from '../src/index';
import {customMatchers} from './helpers';

const expect = chai.expect;

describe( 'Associations', () => {

	let
		Base     = class extends Model {},
		User     = class extends Base {},
		Property = class extends Base {},
		Profile  = class extends Base {},
		sandbox  = null,
		user     = null,
		property = null,
		profile  = null;

	beforeEach( () => {
		sandbox = sinon.sandbox.create();
		Base.datastore = new NullDatastore();
		chai.use( sinonChai );
		chai.use( customMatchers );

		user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
		property = new Property({ id: 12, name: "1212 Example Lane", owner_id: 8 });
		profile = new Profile({ id: 111 });
	});

	afterEach( ()  => {
		sandbox.restore();
	});


	describe( 'associations delegator', () => {

		it( 'has a delegator to add associations', () => {
			expect( User.associations ).to.be.an( 'Object' );
			expect( User.associations.oneToMany ).to.be.a( 'Function' );
			expect( User.associations.oneToOne ).to.be.a( 'Function' );
			expect( User.associations.manyToOne ).to.be.a( 'Function' );
		});


	});


	describe( 'oneToMany', () => {

		before( () => {
			User.associations.oneToMany( 'properties', Property );
		});


		it( 'adds a collection getter method to the decorated Class', done => {
			sandbox.stub( Property, 'get' ).resolves( [property] );
			user.getProperties().
				then( result => {
					expect( result ).to.be.a( 'Array' );
					expect( result[0] ).to.equal( property );
					expect( Property.get ).to.have.been.called;

					let criteria = Property.get.args[0][0];
					expect( criteria ).to.be.a( 'object' );
					expect( criteria.location ).to.equal( `users/${user.id}/properties` );
				}).
				then( done ).
				catch( done.fail );
		});


		it( 'adds a collection addition method to the decorated Class' );
		it( 'adds a collection deletion method to the decorated Class' );

	});


	describe( 'oneToOne', () => {

		before( () => {
			User.associations.oneToOne( 'profile', Profile );
		});


		it( 'adds a getter method to the decorated Class' );
		it( 'adds a setter method to the decorated Class' );
		it( 'adds a deletion method to the decorated Class' );

	});


	describe( 'manyToOne', () => {

		before( () => {
			Property.associations.manyToOne( 'owner', User, {keyField: 'owner_id'} );
		});


		it( 'adds an object getter method to the decorated Class', done => {
			sandbox.stub( User, 'get' ).resolves( user );
			property.getOwner().
				then( result => {
					expect( result ).to.equal( user );
					expect( User.get ).to.have.been.called;

					let id = User.get.args[0][0];
					expect( id ).to.equal( property.owner_id );
				}).
				then( done ).
				catch( done.fail );
		});

		it( 'adds a setter method to the decorated Class' );
		it( 'adds a deletion method to the decorated Class' );

	});

});


