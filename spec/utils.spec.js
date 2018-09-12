/* -*- javascript -*- */

/* eslint-disable */

/* global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console */
'use strict';

import chai from 'chai';

import * as utils from '../src/utils';


let expect = chai.expect;


/* The specs for mapify and demapify are originally from the tests for es6-mapify by
 * Jonathan Lipps <jlipps (at) gmail.com>, converted to use expect() syntax.
 *
 * Used under the terms of the Apache-2.0 license.
 */

describe( 'Utility functions', () => {

	afterEach( () => {
		utils.logger.reset();
	});


	describe( "logging", () => {

		let testingLogger = class {
			constructor() {
				this.debugLogs = [];
				this.errorLogs = [];
			}

			log( ...args ) { this.debugLogs.push(args) }
			debug( ...args ) { this.debugLogs.push(args) }
			error( ...args ) { this.errorLogs.push(args) }
		}


		describe( "at debug level", () => {

			beforeEach( () => {
				utils.logger.reset();
			});


			it( "is a no-op by default", () => {
				expect( function() {
					utils.logger.debug( "something" );
					utils.logger.debug( "something", "else" );
				} ).to.not.throw();
			});


			it( "calls `debug` on a custom logger", () => {
				let testLogger = new testingLogger();
				utils.logger.outputTo( testLogger );

				expect( function() {
					utils.logger.debug( "something" );
					utils.logger.debug( "something", "else" );
				}).to.not.throw();

				expect( testLogger.debugLogs ).to.have.lengthOf( 2 );
				expect( testLogger.debugLogs[0] ).to.eql([ "something" ]);
				expect( testLogger.debugLogs[1] ).to.eql([ "something", "else" ]);
			});

		});

	});

	describe( "mapify", () => {

		it( "can convert a basic object", () => {
			let m = utils.mapify({ a: 'b' });
			expect( m ).to.be.a( 'map' );
			expect( m.get('a') ).to.equal( 'b' );
		});


		it( "converts an empty object to an empty Map", () => {
			let m = utils.mapify({});
			expect( m ).to.be.a( 'map' );
			expect( m.get('a') ).to.be.undefined;
		});


		it( "returns a Map as-is", () => {
			let m = new Map();
			m.set( 'foo', 'bar' );
			m.set( 'baz', 'clang' );

			let m2 = utils.mapify( m );
			expect( m2.get('foo') ).to.equal( 'bar' );
			expect( m2.get('baz') ).to.equal( 'clang' );
		});


		it( "converts an object with multiple non-object types", () => {
			let m = utils.mapify({
				a: 'b',
				'foo-bar': 3,
				c: [1, "x", Array]
			});

			expect( m.get('a') ).to.equal( 'b' );
			expect( m.get('foo-bar') ).to.equal( 3 );
			let c = m.get( 'c' );
			expect( c.length ).to.equal( 3 );
			expect( c[0] ).to.equal( 1 );
			expect( c[1] ).to.equal( "x" );
			expect( new c[2]() ).to.be.a( 'array' );
		});


		it( "converts an array with an embedded object", () => {
			let a = utils.mapify( [1, {a: 'b'}, 2] );

			expect( a ).to.be.a( 'array' )
			expect( a[0] ).to.equal( 1 );
			expect( a[1] ).to.be.a( 'map' );
			expect( a[2] ).to.equal( 2 );

			expect( a[1].get('a') ).to.equal( 'b' );
		});


		it( "converts a nested object", () => {
			let m = utils.mapify({
				a: {
					b: [1, {c: 'd'}],
					e: 'f'
				},
				g: true
			});

			expect( m ).to.be.a( 'map' );
			expect( m.get('a') ).to.be.a( 'map' );
			expect( m.get('g') ).to.equal( true );

			let a = m.get( 'a' );
			expect( a.get('b') ).to.be.a( 'array' );
			expect( a.get('b')[1] ).to.be.a( 'map' );
			expect( a.get('b')[1].get('c') ).to.equal( 'd' );
			expect( a.get('e') ).to.equal( 'f' );

		});


		it( "returns a non-object as is", () => {
			expect( utils.mapify(2) ).to.equal( 2 );
			expect( utils.mapify('hi') ).to.equal( 'hi' );

			expect( typeof utils.mapify(undefined) ).to.equal( 'undefined' );

			expect( utils.mapify([1, 2, 3]) ).to.deep.equal( [1, 2, 3] );
			expect( utils.mapify(null) === null ).to.be.true;
		});


	});


	describe( "demapify", () => {

		it( "converts a simple Map to an Object", () => {
			let m = new Map();
			m.set( 'a', 'b' );
			expect( utils.demapify(m) ).to.deep.equal( {a: 'b'} );
		});


		it( "converts an empty Map to an empty Object", () => {
			let m = utils.demapify(new Map());
			expect( m ).to.deep.equal( {} );
		});


		it( "returns a non-Map as is", () => {
			expect( utils.demapify(2) ).to.equal( 2 );
			expect( utils.demapify('hi') ).to.equal( 'hi' );
			expect( utils.demapify(undefined) ).to.be.undefined;
			expect( utils.demapify([1, 2, 3]) ).to.deep.equal( [1, 2, 3] );
		});


		it( "converts a Map with multiple non-object types", () => {
			let m = new Map();
			m.set( 'a', 'b' );
			m.set( 'foo-bar', 3 );
			m.set( 'c', [1, "x", Array] );

			let d = utils.demapify( m );

			expect( d ).to.be.a( 'object' )
			expect( d.a ).to.equal( 'b' );
			expect( d['foo-bar'] ).to.equal( 3 );
			expect( d.c ).to.be.a( 'array' );
			expect( d.c.length ).to.equal( 3 );
			expect( d.c[0] ).to.equal( 1 );
			expect( d.c[1] ).to.equal( "x" );
			expect( new d.c[2]() ).to.be.a( 'array' );
		});


		it( "converts an Array with an embedded Map", () => {
			let m = new Map();
			m.set( 'a', 'b' );
			let a = utils.demapify([1, m, 2]);

			expect( a ).to.be.a( 'array' );
			expect( a[0] ).to.equal( 1 );
			expect( a[1] ).to.deep.equal( {a: 'b'} );
			expect( a[2] ).to.equal( 2 );
		});


		it( "converts a nested Map to a nested Object", () => {
			let m1 = new Map();
			let m2 = new Map();
			let m3 = new Map();

			m3.set( 'c', 'd' );
			m2.set( 'b', [1, m3] );
			m2.set( 'e', 'f' );
			m1.set( 'a', m2 );
			m1.set( 'g', true );

			let d = utils.demapify( m1 );
			expect( d ).to.be.a( 'object' );
			expect( d ).to.deep.equal({
				a: {
					b: [1, {c: 'd'}],
					e: 'f'
				},
				g: true
			});
		});
	});

});

