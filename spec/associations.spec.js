/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
	NullDatastore,
	Criteria,
	Model,
	OneToManyAssociation,
	ManyToOneAssociation,
	oneToMany,
	manyToOne
} from '../src/index';
import {customMatchers} from './helpers';

const expect = chai.expect;

describe( 'Associations', () => {

	let
		Base     = class Base extends Model {},
		sandbox  = null;

	beforeEach( () => {
		sandbox = sinon.sandbox.create();

		chai.use( sinonChai );
		chai.use( chaiAsPromised );
		chai.use( customMatchers );

		Base.datastore = new NullDatastore();
	});

	afterEach( ()  => {
		sandbox.restore();
	});


	describe( 'associations delegator', () => {

		let User = class User extends Base {};


		it( 'exists', () => {
			expect( User.associations ).to.be.an( 'Object' );
		});


		it( 'can add oneToMany associations', () => {
			expect( User.associations.oneToMany ).to.be.a( 'Function' );
		});

		it( 'can add manyToOne associations', () => {
			expect( User.associations.manyToOne ).to.be.a( 'Function' );
		});

	});


	describe( 'oneToMany association', () => {

		let
			user,
			properties,
			User     = class User extends Base {},
			Property = class Property extends Base {};


		before( () => {
			User.associations.oneToMany( 'properties', Property );
		});

		beforeEach( ()  => {
			user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
			properties = [
				new Property({ id: 12, name: "1212 Example Lane", owner_id: 8 }),
				new Property({ id: 28, name: "812 Fancy Circle", owner_id: 8 }),
				new Property({ id: 1262, name: "1333 E. Bantam St.", owner_id: 8 })
			];
		});


		it( 'adds a collection getter method to the Class', () => {
			sandbox.stub( Property, 'get' ).resolves( properties );
			return expect( user.getProperties() ).
				to.eventually.deep.equal( properties ).
				then( () => {
					expect( Property.get ).to.have.been.calledOnce;

					let criteria = Property.get.args[0][0];
					expect( criteria ).to.be.instanceof( Criteria );
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


		it( 'adds a collection addition method to the Class' );
		it( 'adds a collection deletion method to the Class' );


	});


	describe( 'oneToMany association decorator', () => {

		let
			user,
			properties,
			User,
			Property = class Property extends Base {};


		before( () => {
			User = class User extends Base {
				@oneToMany( 'properties', Property ) properties;
			};
		})

		beforeEach( () => {
			user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
			properties = [
				new Property({ id: 12, name: "1212 Example Lane", owner_id: 8 }),
				new Property({ id: 28, name: "812 Fancy Circle", owner_id: 8 }),
				new Property({ id: 1262, name: "1333 E. Bantam St.", owner_id: 8 })
			];
		})


		it( 'adds a collection getter method to the decorated Class', () => {
			sandbox.stub( Property, 'get' ).resolves( properties );
			return expect( user.getProperties() ).
				to.eventually.deep.equal( properties ).
				then( () => {
					expect( Property.get ).to.have.been.calledOnce;

					let criteria = Property.get.args[0][0];
					expect( criteria ).to.be.instanceof( Criteria );
					expect( criteria.location ).to.equal( `users/${user.id}/properties` );
				});
		} );
	
	});


	describe( 'manyToOne association', () => {

		let
			property,
			user,
			Property = class Property extends Base {},
			User = class User extends Base {};

		before( () => {
			Property.associations.manyToOne( 'owner', User, {keyField: 'owner_id'} );
		});

		beforeEach( () => {
			user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
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


	describe( 'manyToOne association decorator', () => {

		let
			user,
			property,
			User = class User extends Base {},
			Property;


		before( () => {
			Property = class Property extends Base {
				@manyToOne( 'owner', User, 'owner_id' ) owner_id;
			};
		})

		beforeEach( () => {
			user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
			property = new Property({ id: 12, name: "1212 Example Lane", owner_id: 8 });
		})


		it.skip( 'adds an instance getter method to the decorated Class', () => {
			expect( property ).to.have.property( 'owner_id', 8 );

			sandbox.stub( User, 'get' ).resolves( user );

			return expect( property.getOwner() ).
				to.eventually.deep.equal( user ).
				then( () => {
					expect( User.get ).to.have.been.calledOnce
					expect( User.get ).to.have.been.calledWith( user.id );
				});
		} );
	
	});



});


