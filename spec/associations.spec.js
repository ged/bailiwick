/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
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
		sandbox  = null,
		user     = null;

	beforeEach( () => {
		sandbox = sinon.sandbox.create();

		chai.use( sinonChai );
		chai.use( chaiAsPromised );
		chai.use( customMatchers );

		Base.datastore = new NullDatastore();
		user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
	});

	afterEach( ()  => {
		sandbox.restore();
	});


	describe( 'associations delegator', () => {

		it( 'has a delegator to add associations', () => {
			expect( User.associations ).to.be.an( 'Object' );
			expect( User.associations.oneToMany ).to.be.a( 'Function' );
			expect( User.associations.manyToOne ).to.be.a( 'Function' );
		});


	});


	describe( 'oneToMany', () => {

		var properties;

		before( () => {
			User.associations.oneToMany( 'properties', Property );
			properties = [
				new Property({ id: 12, name: "1212 Example Lane", owner_id: 8 }),
				new Property({ id: 28, name: "812 Fancy Circle", owner_id: 8 }),
				new Property({ id: 1262, name: "1333 E. Bantam St.", owner_id: 8 })
			];
		});


		it( 'adds a collection getter method to the decorated Class', () => {
			sandbox.stub( Property, 'get' ).resolves( properties );
			return expect( user.getProperties() ).
				to.eventually.deep.equal( properties ).
				then( () => {
					expect( Property.get ).to.have.been.calledOnce;

					let criteria = Property.get.args[0][0];
					expect( criteria ).to.be.a( 'object' );
					expect( criteria.location ).to.equal( `users/${user.id}/properties` );
				});
		});


		it( 'caches the fetched collection', () => {
			sandbox.stub( Property, 'get' ).resolves( properties );

			return expect( user.getProperties() ).
				to.eventually.deep.equal( properties ).
				then( () => user.getProperties() ).
				then( () => {
					expect( Property.get ).to.have.been.calledOnce;
				});
		});


		it( 'adds a collection addition method to the decorated Class' );
		it( 'adds a collection deletion method to the decorated Class' );

	});


	describe( 'manyToOne', () => {

		var property;

		before( () => {
			Property.associations.manyToOne( 'owner', User, {keyField: 'owner_id'} );
		});

		beforeEach( () => {
			property = new Property({ id: 12, name: "1212 Example Lane", owner_id: 8 });
		});


		it( 'adds an object getter method to the decorated Class', () => {
			sandbox.stub( User, 'get' ).resolves( user );

			return expect( property.getOwner() ).
				to.eventually.deep.equal( user ).
				then( () => {
					expect( User.get ).to.have.been.calledOnce;
					expect( User.get ).to.have.been.calledWith( property.owner_id );
				});
		});


		it( 'caches the fetched object', () => {
			sandbox.stub( User, 'get' ).resolves( user );

			return expect( property.getOwner() ).
				to.eventually.deep.equal( user ).
				then( () => property.getOwner() ).
				then( () => {
					expect( User.get ).to.have.been.calledOnce;
				});
		});


		it( 'adds a setter method to the decorated Class' );
		it( 'adds a deletion method to the decorated Class' );

	});

});


