/**
 * Criteria tests
 */
'use strict';

import {Criteria} from '../src/criteria';
import {Model} from '../src/model';

class Invoice extends Model {}


describe( 'Criteria', () => {

	it( 'can construct clones of itself', () => {
		var criteria = new Criteria( Invoice );
		var clone = criteria.clone();

		expect( clone ).toBeDefined();
		expect( clone ).not.toBe( criteria );
		expect( clone.filterClauses ).not.toBe( criteria.filterClauses );
		expect( clone.model ).toBe( criteria.model );
	});


	describe( 'filtering', () => {

		it( 'can be set up in the constructor', () => {
			var criteria = new Criteria( Invoice, { status: 'shipped', shipDate: '2013-11-12' } );
			expect( criteria ).toBeDefined();
			expect( criteria.filterClauses.get('status') ).toEqual( 'shipped' );
			expect( criteria.filterClauses.get('shipDate') ).toEqual( '2013-11-12' );
		});


		it( 'can be fluently mutated by adding filter clauses', () => {
			var criteria = new Criteria( Invoice );
			var clone = criteria.
				filter({ status: 'shipped' }).
				filter({ shipDate: '2013-11-12' });

			expect( criteria ).toBeDefined();
			expect( criteria.filterClauses.get('status') ).not.toBeDefined();
			expect( criteria.filterClauses.get('shipDate') ).not.toBeDefined();

			expect( clone ).toBeDefined();
			expect( clone.filterClauses.get('status') ).toEqual( 'shipped' );
			expect( clone.filterClauses.get('shipDate') ).toEqual( '2013-11-12' );
		});

	});


	describe( 'limiting', () => {

		it( 'can be fluently mutated by adding a limit', () => {
			var criteria = new Criteria( Invoice ).limit( 20 );

			expect( criteria ).toBeDefined();
			expect( criteria.maxResultCount ).toEqual( 20 );
		});

	});


	describe( 'offsetting', () => {

		it( 'can be fluently mutated by adding an offset', () => {
			var criteria = new Criteria( Invoice ).offset( 15 );

			expect( criteria ).toBeDefined();
			expect( criteria.resultOffset ).toEqual( 15 );
		});

	});


	describe( 'get', () => {

		beforeEach( () => {
			spyOn( Invoice, 'get' ).and.returnValue( 'promise' );
		});


		it( 'can fetch results via its model', () => {
			var criteria = new Criteria( Invoice );
			var result = criteria.get();

			expect( Invoice.get ).toHaveBeenCalledWith( criteria );
			expect( result ).toEqual( 'promise' );
		} );


		it( 'can fetch results via its model with a limit', () => {
			var criteria = new Criteria( Invoice );
			var result = criteria.get( 123 );

			expect( Invoice.get ).toHaveBeenCalledWith( new Criteria(Invoice).limit(123) );
			expect( result ).toEqual( 'promise' );
		} );


		it( 'can fetch results via its model with a limit and offset', () => {
			var criteria = new Criteria( Invoice );
			var result = criteria.get( 50, 151 );

			expect( Invoice.get ).
				toHaveBeenCalledWith( new Criteria(Invoice).limit(50).offset(151) );
			expect( result ).toEqual( 'promise' );
		} );

	});

});


