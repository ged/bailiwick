/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import Promise from 'bluebird';

import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';

import {NullDatastore, Criteria, Model, ResultSet, validator, ValidationError} from '../src/index';
import {debug} from '../src/utils';
import {customMatchers} from './helpers';

const expect = chai.expect;


describe( 'Model class', () => {

	var User = class extends Model {

	@validator( 'firstName' )
	validateFirstName() {
		debug( "validateFirstName called!" );
		if ( this.firstName === 'Nate' ) {
			throw new ValidationError( "no Nates allowed." );
		} else if ( !this.firstName || this.firstName === '' ) {
			throw new ValidationError( "missing" );
		}
	}

	@validator( 'lastName' )
	validateLastName() {
		debug( "validateLastName called!" );
		if ( !this.lastName || this.lastName === '' ) {
			throw new ValidationError( "missing" );
		}
	}

	};


	beforeEach( () => {
		User.datastore = new NullDatastore();
		chai.use( chaiAsPromised );
	} );


	describe( 'attributes', () => {
		var data, user;

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
		var data, user;

		beforeEach( () => {
			data = { firstName: "Gavin", lastName: "Rossdale", email: "gavin@bush.group" };
			user = new User( data );
		} );


		it( 'marks new objects as dirty', () => {
			expect( user ).to.be.dirty;
		} );


		it( 'can remove all dirty flags', () => {
			user.markClean();
			expect( user ).not.to.be.dirty;
		} );

	} );


	describe( 'resultsets', () => {

		it( '#where returns a resultset that combines the model and a criteria', () => {
			var result = User.where( { firstName: 'Arya' } );
			expect( result ).to.be.an.instanceof( ResultSet );
			expect( result.criteria ).to.be.an.instanceof( Criteria );
			expect( result.criteria.filterClauses.get('firstName') ).to.equal( 'Arya' );
		} );

	} );


	describe( 'validation', () => {

		var data, user;

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

} );


