/**
 * Criteria tests
 */
'use strict';

import {Criteria} from '../src/criteria';


describe( 'Criteria class', () => {

	describe( 'filtering', () => {

		it( 'can be set up in the constructor', () => {
			var pairs = { firstName: "Robin", email: "hood@sherwood.org" };
			var criteria = new Criteria( pairs );

			expect( criteria.filterClauses.keys() ).toContain( 'firstName', 'email' );
		});


	});


});


