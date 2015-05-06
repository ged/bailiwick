/**
 * An in-memory datastore (for testing)
 *
 * @class NullStore
 * @constructor
 *
 */

import Promise from 'bluebird';
import {Datastore} from './datastore';

function *genId() {
	let i = 0;
	while( 1 ) {
		yield( ++i );
	}
};


export class NullDatastore extends Datastore {

	constructor() {
		super();
		this.objects = new Map();
		this.ids = genId();
	}

	getCollectionForType( type ) {
		if ( ! this.objects.has(type) ) {
			this.objects.set( type, new Map() );
		}

		return this.objects.get( type );
	}

	getInstance( type, id ) {
		var collection = this.getCollectionForType( type );

		if ( collection.has(id) ) {
			return Promise.resolve( collection.get(id) );
		} else {
			return Promise.reject( new Error(`No such ${type.name} ID=${id}`) );
		}
	}

	getCollection( type, criteria=null ) {
		var collection = this.getCollectionForType( type );
		var results;

		if ( criteria ) {
			results = this.findMatchingObjects( collection, criteria );
		} else {
			results = Array.from( collection.values() );
		}

		return Promise.resolve( results );
	}

	findMatchingObjects( collection, criteria ) {
		// This should filter, limit, offset, etc.
		return collection.values();
	}

	store( type, data ) {
		let id = this.ids.next();
		let collection = this.getCollectionForType( type );

		console.debug( `Storing ${type.name} ID=${id}` );
		collection.set( id, data );
		return Promise.resolve( id );
	}

	update( type, id, data ) {
		let collection = this.getCollectionForType( type );
		let current = collection.get( id );
		if ( !current ) return Promise.reject( `No such object ${id}!` );

		console.debug( `Merging ${object.constructor.name} ID=${id}` );
		Object.assign( current, data );

		return Promise.resolve( current );
	}

	replace( type, id, data ) {
		let collection = this.getCollectionForType( type );
		let current = collection.get( id );
		collection.set( id, data );
		return Promise.resolve( current );
	}

	remove( type, id ) {
		let collection = this.getCollectionForType( type );
		collection.delete( id );
	}

	_clear() {
		this.objects.clear();
	}

}

