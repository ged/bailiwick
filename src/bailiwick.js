/**
 * Bailiwick -- A more domain-ish model toolkit.
 * $Id$
 *
 * Authors
 * - Michael Granger <ged@FaerieMUD.org>
 */

/**
 * The default namespace
 */

// import Model from './bailiwick/model';
// import Store from './bailiwick/store';

class Store {

	constructor() {}

	get( id ) {}
	getList( criteria ) {}

}

class NullStore extends Store {

	constructor() {
		this.objects = new Map();
		this.ids = function*() {
			let i = 0;
			while( 1 ) {
				yield( ++i );
			}
		};
	}

	get( id ) {
		var obj = this.objects.get( id );
		if ( obj ) {
			return Promise.resolve( obj );
		} else {
			return Promise.reject( `No such object ${id}` );
		}
	}

	getList( criteria={} ) {
		var results = [];
		for ( var object of this.objects.values() ) {
			for ( var key in criteria ) {
				if ( object[key] == criteria[key] ) results.push( value );
			}
		}

		return Promise.resolve( results );
	}

	store( object ) {
		let id = this.ids.next();
		this.objects.set( id, object );
		return Promise.resolve( id );
	}

	merge( id, object ) {
		let current = this.objects.get( id );
		if ( !current ) return Promise.reject( `No such object ${id}!` );

		Object.assign( current, object );

		return Promise.resolve( current );
	}

	replace( id, object ) {
		let current = this.objects.get( id );
		this.objects.set( id, object );
		return Promise.resolve( current );
	}

	remove( id ) {
		let current = this.object.
		this.objects.delete( id );
	}

}


class RESTService extends Store {
	url: 'http://localhost:8080/v1'

	constructor( url ) {
		if ( !url ) url = RESTService.defaultURL;
		this.url = url;
	}
}


class Model {

	constructor(values) {
		this.values = values;
		this.errors = [];
	}

	validate() {
		this.errors.clear();
		return new Promise( (resolve, reject) => {
			if ( errors.length == 0 ) {
				resolve();
			} else {
				reject( errors );
			}
		});
	}
}


export {
	Store,
	NullStore
	RESTService,
	Model,
}

