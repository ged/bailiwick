/**
 * Model tests
 *
 * jshint undef: true, unused: true, esnext: true
 * global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console
 */
'use strict';

import Promise from 'bluebird';
import 'babel/polyfill';

import {NullDatastore, Model} from '../src/index';


class User extends Model {}


describe( 'Model class', () => {

	var datastore;

	beforeEach( () => {
		User.datastore = new NullDatastore();
	});


	describe( 'attributes', () => {

		it( 'are set up as object properties', () => {
			var data = { firstName: "Robin", lastName: "Hood", email: "hood@sherwood.org" };
			var user = new User( data );

			expect( user.firstName ).toEqual( data.firstName );
			expect( user.lastName ).toEqual( data.lastName );
			expect( user.email ).toEqual( data.email );
		});


	});


});


