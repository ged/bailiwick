/**
 * Model tests
 */
'use strict';

import {NullDatastore} from '../src/null-datastore';
import {Model} from '../src/model';

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


