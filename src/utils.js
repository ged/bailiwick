/**
 * Utility Classes and functions
 * 
 * 
 */

export class NotImplementedError extends Error {

	constructor( methodname ) {
		super( `No implementation provided for ${methodname}(...)` );
	}

}

