/**
 * Model tests
 *
 */

/* global it, beforeEach, describe, expect, console, jasmine */
"use strict";


import {NullDatastore, Model, ResultSet, Criteria} from 'bailiwick';
import {validator, ValidationError} from 'bailiwick/validations';
import {customMatchers} from './helpers';


class User extends Model {

	@validator( 'firstName' )
	validateFirstName() {
		console.debug( "validateFirstName called!" );
		if ( this.firstName === 'Nate' ) {
			throw new ValidationError( "no Nates allowed." );
		} else if ( !this.firstName || this.firstName === '' ) {
			throw new ValidationError( "missing" );
		}
	}

	@validator( 'lastName' )
	validateLastName() {
		console.debug( "validateLastName called!" );
		if ( !this.lastName || this.lastName === '' ) {
			throw new ValidationError( "missing" );
		}
	}

	// @validator( 'email' )
	// validateEmail() {
	// 	if ( this.email === '' ) { return Promise.reject('missing'); }
	// 	return this.constructor.get({ email: this.email }).
	// 		then( response => {
	// 			return Promise.reject( "User already exists" );
	// 		}).
	// 		catch( reason => {
	// 			return Promise.resolve( true );
	// 		});
	// }

}


describe( 'Model class', () => {

	beforeEach( () => {
		User.datastore = new NullDatastore();
		jasmine.addMatchers( customMatchers );
	} );


	describe( 'attributes', () => {
		var data, user;

		beforeEach( () => {
			data = { firstName: "Robin", lastName: "Hood", email: "hood@sherwood.org" };
			user = new User( data );
		} );


		it( 'are set up as object properties', () => {
			expect( user.firstName ).toEqual( data.firstName );
			expect( user.lastName ).toEqual( data.lastName );
			expect( user.email ).toEqual( data.email );
		} );


		it( 'show up in the toString() of a model object', () => {
			expect( user.toString() ).
				toMatch( /\[object User values=\{firstName: Robin, lastName: Hood.*\]/i );
		} );

	} );


	class DirtyMatcher {
		compare( actual ) {
			var dirty = actual.isDirty();
			return {
				pass: dirty,
				message: `${actual} is${dirty ? '' : ' not'} marked dirty.`
			};
		}
	}


	describe( 'dirty-marking', () => {
		var data, user;

		beforeEach( () => {
			data = { firstName: "Gavin", lastName: "Rossdale", email: "gavin@bush.group" };
			user = new User( data );
			jasmine.addMatchers( {
				toBeDirty: () => new DirtyMatcher()
			} );
		} );


		it( 'marks new objects as dirty', () => {
			expect( user ).toBeDirty();
		} );


		it( 'can remove all dirty flags', () => {
			user.markClean();
			expect( user ).not.toBeDirty();
		} );

	} );


	describe( 'resultsets', () => {

		it( '#where returns a resultset that combines the model and a criteria', () => {
			var result = User.where( { firstName: 'Arya' } );
			expect( result ).toBeA( ResultSet );
			expect( result.criteria ).toBeA( Criteria );
			expect( result.criteria.filterClauses.get('firstName') ).toEqual( 'Arya' );
		} );

	} );


	describe( 'validation', () => {

		var data, user;

		beforeEach( () => {
			data = { firstName: "Miki", lastName: "Berenyi", email: "m@lulabox.eu" };
			user = new User( data );
		} );


		it( 'returns a Promise that resolves if the object is valid', done => {
			var success = jasmine.createSpy( 'promise resolved' );
			var failure = jasmine.createSpy( 'promise rejected' );

			var promise = user.validate();
			expect( promise ).toBeA( Promise );

			promise.then( success ).catch( failure ).finally( () => {
				expect( success ).toHaveBeenCalled();
				expect( failure ).not.toHaveBeenCalled();
				done();
			} );
		} );

		it( 'returns a Promise that rejects if the object is not valid', done => {
			var success = jasmine.createSpy( 'promise resolved' );
			var failure = jasmine.createSpy( 'promise rejected' );

			user.firstName = 'Nate'; // No Nates allowed
			user.lastName = null; // missing

			var promise = user.validate();
			expect( promise ).toBeA( Promise );

			promise.then( success ).catch( failure ).finally( () => {
				expect( failure ).toHaveBeenCalled();
				expect( success ).not.toHaveBeenCalled();
				done();
			} );
		} );

	} );

} );


describe( 'ResultSet class', () => {

	var user1,
		user2,
		user3;

	beforeEach( done => {
		jasmine.addMatchers( customMatchers );
		User.datastore = new NullDatastore();
		Promise.join(
			User.create( { firstName: "Paul", lastName: "Atreides", nickName: "Muad'Dib" } ),
			User.create( { firstName: "Alia", lastName: "Atreides", nickName: "St. Alia of the Knife" } ),
			User.create( { firstName: "Duncan", lastName: "Idaho" } ),
			( paul, alia, duncan ) => {
				console.debug( `Alia is ${alia}` );
				user1 = paul;
				user2 = alia;
				user3 = duncan;
			}
		).
		finally( done );
	} );


	it( 'can be created with a Model and a Criteria', done => {
		var criteria = Criteria.all();
		var rs = new ResultSet( User, criteria );

		rs.get().
			then( users => {
				expect( users.length ).toEqual( 3 );
				expect( users[ 0 ].firstName ).toEqual( user1.firstName );
				expect( users[ 1 ].firstName ).toEqual( user2.firstName );
				expect( users[ 2 ].firstName ).toEqual( user3.firstName );
			} ).
			finally( done );
	} );

} );
