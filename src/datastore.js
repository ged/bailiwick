/**
 * Bailiwick.Store -- base class for bailiwick model store adapters
 */

import Promise from 'bluebird';
import {NotImplementedError} from './utils';

export class Datastore {

	constructor() {}

	get( type, id=null ) {
		// Collection API if the ID is complex
		if ( typeof id === 'object' ) {
			return this.getCollection( type, id );
		} else {
			return this.getInstance( type, id );
		}
	}

	getCollection( type, id ) {
		return Promise.reject( new NotImplementedError("getCollection") );
	}
	getInstance( type, id ) {
		return Promise.reject( new NotImplementedError("getInstance") );
	}


}

