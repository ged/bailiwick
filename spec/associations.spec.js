/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';
import {NullDatastore, Criteria, Model, oneToMany, manyToOne, oneToOne} from 'bailiwick';
import {customMatchers} from './helpers';

import {User, Property} from './models';


describe( 'Associations', () => {

	let user     = null,
	    property = null;

	beforeEach( () => {
		Base.datastore = new NullDatastore();
		jasmine.addMatchers( customMatchers );

		user = new User({ id: 8, first_name: 'Bob', last_name: 'Martinez' });
		property = new Property({ id: 12, name: "1212 Example Lane" });
	});


	describe( 'oneToMany', () => {

		it( 'adds a collection getter method to the decorated Class', done => {
			spyOn( Property, 'get' ).and.returnValue( Promise.resolve([property]) );
			user.getProperties().
				then( result => {
					expect( result ).toEqual([ property ]);
					expect( Property.get ).toHaveBeenCalled();

					let args = Property.get.calls.argsFor( 0 );
					let criteria = args[0];
					expect( criteria ).toBeA( Criteria );
					expect( criteria.location ).toEqual( 'users/8/properties' );
				}).
				then( done ).
				catch( done.fail );
		});

	});


	describe( 'manyToOne', () => {

		it( 'adds an object getter method to the decorated Class', done => {
			spyOn( User, 'get' ).and.returnValue( Promise.resolve(user) );
			property.getOwner().
				then( result => {
					expect( result ).toEqual( user );
					expect( User.get ).toHaveBeenCalled();

					let args = User.get.calls.argsFor( 0 );
					expect( args ).toContain( 8 );
				}).
				then( done ).
				catch( done.fail );
		});

	});

});


