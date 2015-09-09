/**
 * RESTService tests
 *
 * jshint undef: true, unused: true, esnext: true
 * global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console, jasmine
 */
'use strict';

import 'babel/polyfill';

import {mapify,demapify} from '../src/utils';
import {customMatchers} from './helpers';


/* The specs for mapify and demapify are originally from the tests for es6-mapify by
 * Jonathan Lipps <jlipps (at) gmail.com>, converted to use expect() syntax.
 * 
 * Used under the terms of the Apache-2.0 license.
 */

describe( 'Utility functions', () => {

	beforeEach( () => {
		jasmine.addMatchers( customMatchers );
	} );


	describe( "mapify", () => {

		it( "can convert a basic object", () => {
			let m = mapify({ a: 'b' });
			expect( m ).toBeA( Map );
			expect( m.get('a') ).toEqual( 'b' );
		});


		it( "converts an empty object to an empty Map", () => {
			let m = mapify({});
			expect( m ).toBeA( Map );
			expect( m.get('a') ).toBeUndefined();
		});


		it( "returns a Map as-is", () => {
			let m = new Map();
			m.set( 'foo', 'bar' );
			m.set( 'baz', 'clang' );

			let m2 = mapify( m );
			expect( m2.get('foo') ).toEqual( 'bar' );
			expect( m2.get('baz') ).toEqual( 'clang' );
		});


		it( "converts an object with multiple non-object types", () => {
			let m = mapify({
				a: 'b',
				'foo-bar': 3,
				c: [1, "x", Array]
			});

			expect( m.get('a') ).toEqual( 'b' );
			expect( m.get('foo-bar') ).toEqual( 3 );
			let c = m.get( 'c' );
			expect( c.length ).toEqual( 3 );
			expect( c[0] ).toEqual( 1 );
			expect( c[1] ).toEqual( "x" );
			expect( new c[2]() ).toBeA( Array );
		});


		it( "converts an array with an embedded object", () => {
			let a = mapify( [1, {a: 'b'}, 2] );

			expect( a ).toBeA( Array )
			expect( a[0] ).toEqual( 1 );
			expect( a[1] ).toBeA( Map );
			expect( a[2] ).toEqual( 2 );

			expect( a[1].get('a') ).toEqual( 'b' );
		});


		it( "converts a nested object", () => {
			let m = mapify({
				a: {
					b: [1, {c: 'd'}],
					e: 'f'
				},
				g: true
			});

			expect( m ).toBeA( Map );
			expect( m.get('a') ).toBeA( Map );
			expect( m.get('g') ).toEqual( true );

			let a = m.get( 'a' );
			expect( a.get('b') ).toBeA( Array );
			expect( a.get('b')[1] ).toBeA( Map );
			expect( a.get('b')[1].get('c') ).toEqual( 'd' );
			expect( a.get('e') ).toEqual( 'f' );

		});


		it( "returns a non-object as is", () => {
			expect( mapify(2) ).toEqual( 2 );
			expect( mapify('hi') ).toEqual( 'hi' );

			expect( typeof mapify(undefined) ).toEqual( 'undefined' );

			expect( mapify([1, 2, 3]) ).toEqual( [1, 2, 3] );
			expect( mapify(null) === null ).toBeTruthy();
		});


	});


	describe( "demapify", () => {

		it( "converts a simple Map to an Object", () => {
			let m = new Map();
			m.set( 'a', 'b' );
			expect( demapify(m) ).toEqual( {a: 'b'} );
		});


		it( "converts an empty Map to an empty Object", () => {
			let m = demapify(new Map());
			expect( m ).toEqual( {} );
		});


		it( "returns a non-Map as is", () => {
			expect( demapify(2) ).toEqual( 2 );
			expect( demapify('hi') ).toEqual( 'hi' );
			expect( demapify(undefined) ).toBeUndefined();
			expect( demapify([1, 2, 3]) ).toEqual( [1, 2, 3] );
		});


		it( "converts a Map multiple non-object types", () => {
			let m = new Map();
			m.set( 'a', 'b' );
			m.set( 'foo-bar', 3 );
			m.set( 'c', [1, "x", Array] );

			let d = demapify( m );

			expect( d ).toBeA( Object )
			expect( d.a ).toEqual( 'b' );
			expect( d['foo-bar'] ).toEqual( 3 );
			expect( d.c ).toBeA( Array );
			expect( d.c.length ).toEqual( 3 );
			expect( d.c[0] ).toEqual( 1 );
			expect( d.c[1] ).toEqual( "x" );
			expect( new d.c[2]() ).toBeA( Array );
		});


		it( "converts an Array with an embedded Map", () => {
			let m = new Map();
			m.set( 'a', 'b' );
			let a = demapify([1, m, 2]);

			expect( a ).toBeA( Array );
			expect( a[0] ).toEqual( 1 );
			expect( a[1] ).toEqual( {a: 'b'} );
			expect( a[2] ).toEqual( 2 );
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

			let d = demapify( m1 );
			expect( d ).toBeA( Object );
			expect( d ).toEqual({
				a: {
					b: [1, {c: 'd'}],
					e: 'f'
				},
				g: true
			});
		});
	});

});

