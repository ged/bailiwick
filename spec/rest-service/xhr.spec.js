/*
 * RESTService XHR tests
 *
 *jshint undef: true, unused: true, esnext: true
 *global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console, jasmine
 */
'use strict';

import Promise from 'bluebird';
import 'babel/polyfill';

import {Xhr} from '../../src/rest-service/xhr';
import {customMatchers} from '../helpers';


describe( 'Xhr object', () => {

	var xhr,
	    baseUrl = 'http://localhost:8889/v1';

	beforeEach( () => {
		jasmine.Ajax.install();
		jasmine.addMatchers( customMatchers );
		xhr = new Xhr();
	});


	afterEach( () => {
		jasmine.Ajax.uninstall();
	});


	describe( "fluent interface", () => {

		it( 'can construct clones of itself', () => {
			var clone = xhr.clone();

			expect( clone ).toBeDefined();
			expect( clone ).not.toBe( xhr );

			expect( clone.defaultHeaders ).not.toBe( xhr.defaultHeaders );
			expect( clone.defaultHeaders ).toEqual( xhr.defaultHeaders );
		});


		it( 'can construct clones of itself that use a different baseUrl', () => {
			var clone = xhr.withBaseUrl( baseUrl );

			expect( xhr.options[ 'baseUrl' ] ).not.toEqual( baseUrl );
			expect( clone.options[ 'baseUrl' ] ).toEqual( baseUrl );
		});


		it( 'can construct clones of itself that use a different timeout', () => {
			var clone = xhr.withTimeout( 300 );

			expect( xhr.options[ 'timeout' ] ).not.toEqual( 300 );
			expect( clone.options[ 'timeout' ] ).toEqual( 300 );
		});


		it( 'can construct clones of itself with an additional default request header', () => {
			var clone = xhr.withDefaultHeader( 'Accept', 'application/json' );

			expect( xhr.defaultHeaders.has( 'accept' ) ).toBeFalsy();
			expect( clone.defaultHeaders.has( 'accept' ) ).toBeTruthy();
		});

	});


	describe( "query parameters", () => {
	});


	describe( "default request headers", () => {
	});


	describe( "plugin system", () => {

		it( "installs hooks from provided plugins", () => {
			var fakeXhr = jasmine.createSpy( 'xhr' );
			var plugin = {
				setupXhr: arg => {
				}
			};
			spyOn( plugin, 'setupXhr' );

			var pluggedXhr = xhr.using( plugin );

			expect( pluggedXhr ).not.toBe( xhr );
			expect( xhr.pluginSlots.has( 'setupXhr' ) ).toBeFalsy();
			expect( pluggedXhr.pluginSlots.has( 'setupXhr' ) ).toBeTruthy();
			expect( pluggedXhr.pluginSlots.get( 'setupXhr' ) ).toBeA( Set );

			pluggedXhr.setupXhr( fakeXhr );

			expect( plugin.setupXhr ).toHaveBeenCalled();
		});


		it( "skips hooks after one that returns a truthy value", () => {
			var fakeXhr = jasmine.createSpy( 'xhr' );
			var firstPlugin = {
				setupXhr: arg => {
					return true;
				}
			};
			var secondPlugin = {
				setupXhr: arg => {
					return false;
				}
			};

			spyOn( firstPlugin, 'setupXhr' ).and.callThrough();
			spyOn( secondPlugin, 'setupXhr' ).and.callThrough();

			var pluggedXhr = xhr.using( firstPlugin, secondPlugin );
			var rval = pluggedXhr.setupXhr( fakeXhr );

			expect( firstPlugin.setupXhr ).toHaveBeenCalled();
			expect( secondPlugin.setupXhr ).not.toHaveBeenCalled();
			expect( rval ).toBe( true );
		});


		it( "ignores non-existent extension points defined by a plugin", () => {
			var plugin = {
				queryStringFromParams: arg => {
					return false
				}
			};
			spyOn( plugin, 'queryStringFromParams' );

			var pluggedXhr = xhr.using( plugin );
			pluggedXhr.queryStringFromParams();

			expect( plugin.queryStringFromParams ).not.toHaveBeenCalled();
		});

	});


	describe( "XMLHttpRequests", () => {

		beforeEach( () => {
			xhr = xhr.withBaseUrl( baseUrl );
		});


		it( "can GET from a simple URI", () => {
			var promise = xhr.get( 'users' );

			expect( promise ).toBePending();
			expect( jasmine.Ajax.requests.mostRecent().url ).toBe( `${baseUrl}/users` );

			jasmine.Ajax.requests.mostRecent().respondWith({
				"status": 200,
				"contentType": 'application/json',
				"responseText": '[{"name":"wallaby"}]'
			});

			expect( promise ).toBeFulfilled();
			expect( promise.value() ).toEqual([{ name: "wallaby" }]);
		});


		it( "can GET from a URI and one parameter", () => {
			var promise = xhr.get( 'users', {sortBy: 'lastname'} );

			expect( promise ).toBePending();
			expect( jasmine.Ajax.requests.mostRecent().url ).toBe( `${baseUrl}/users?sortBy=lastname` );

			jasmine.Ajax.requests.mostRecent().respondWith({
				"status": 200,
				"contentType": 'application/json',
				"responseText": '[{"name":"wallaby"}]'
			});

			expect( promise ).toBeFulfilled();
			expect( promise.value() ).toEqual([{ name: "wallaby" }]);
		});

	});

});

