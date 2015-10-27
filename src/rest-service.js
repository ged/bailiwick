/* -*- javascript -*- */
'use strict';

import {Datastore} from './datastore';
import {Xhr} from './rest-service/xhr';

export * from './rest-service/plugins';

/**
 * REST service datastore
 *
 * @class RESTService
 * @constructor
 *
 */
export class RESTService extends Datastore {

	constructor( baseUrl ) {
		super();
		this.baseUrl = baseUrl;
		this.http = new Xhr({ baseUrl: baseUrl });
	}


	/**
	 * Configure the service instance to use the specified {plugins}.
	 *
	 * @method
	 * @param {Array} plugins  an Array of Xhr plugins.
	 * @return {RESTService} the reconfigured RESTService object.
	 */
	usePlugins( ...plugins ) {
		this.http = this.http.using( ...plugins );
		return this;
	}


	/**
	 * Fetch a single instance of the specified {type} with the given {id}, and return
	 * a Promise that resolves to it.
	 */
	getInstance( type, id ) {
		var uri = type.uri;
		if ( id ) { uri += '/' + id.toString(); }
		return this.http.get( uri );
	}


	/**
	 * Fetch a collection of the specified object {type} that matches the specified
	 * {criteria} (a Criteria object), and return a Promise that resolves to the resulting
	 * Array.
	 */
	getCollection( type, criteria ) {
		var uri = criteria.location || type.uri;
		var params = this.makeParamsFromCriteria( criteria );

		console.info( "GET %s params: %o", uri, params );
		return this.http.get( uri, params );
	}


	/**
	 * Turn the specified {criteria} into a Map of parameters suitable for passing in an Xhr
	 * request.
	 */
	makeParamsFromCriteria( criteria ) {
		if ( !criteria ) { return null; }

		var params = new Map();

		for ( let [key, val] of criteria.filterClauses ) {
			console.debug( `Adding parameter ${key}=${val} from criteria's filter clauses.` );
			params.set( key, val );
		}

		if ( criteria.maxResultCount ) { params.set( 'limit', criteria.maxResultCount ); }
		if ( criteria.resultOffset ) { params.set( 'offset', criteria.resultOffset ); }

		return params;
	}


	/**
	 * Store a new instance of the specified {type} with the given {data} via the REST service,
	 * and return a Promise that resolves to the result.
	 */
	store( type, data ) {
		var uri = type.uri;
		// :TODO: Just return the ID from this?
		return this.http.post( uri, data );
	}


	/**
	 * Update the instance of the specified {type} with the given {id} via the REST
	 * service using the specified {data}, and return a Promise that resolves to the result.
	 */
	update( type, id, data ) {
		var uri = `${type.uri}/${id}`;
		return this.http.post( uri, data );
	}


	/**
	 * Replace the data for the instance of the specified {type} with the given {id} via the REST
	 * service using the specified {data}, and return a Promise that resolves to the result.
	 */
	replace( type, id, data ) {
		var uri = `${type.uri}/${id}`;
		return this.http.put( uri, data );
	}


	/**
	 * Delete the instance of the specified {type} with the given {id} via the REST service and
	 * return a Promise that resolves to the result.
	 */
	remove( type, id ) {
		var uri = `${type.uri}/${id}`;
		return this.http.delete( uri );
	}


}
