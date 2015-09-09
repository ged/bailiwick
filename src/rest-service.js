/* -*- javascript -*- */
'use strict';

import Promise from 'bluebird';
import {Datastore} from './datastore';

import {VERSION} from './index';
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
	 * 
	 */
	getInstance( type, id ) {
		var uri = type.uri;
		if ( id ) { uri += '/' + id.toString(); }
		return this.http.get( uri );
	}


	/**
	 * 
	 */
	getCollection( type, criteria ) {
		var uri = type.uri;
		var params = this.makeParamsFromCriteria( criteria );

		console.info( "GET %s params: %o", uri, params );
		return this.http.get( uri, params );
	}


	/**
	 * 
	 */
	makeParamsFromCriteria( criteria ) {
		if ( !criteria ) return null;

		var params = new Map();

		for ( let [key, val] of criteria.filterClauses ) {
			console.debug( `Adding parameter ${key}=${val} from criteria's filter clauses.` );
			params.set( key, val );
		}

		if ( criteria.maxResultCount ) params.set( 'limit', criteria.maxResultCount );
		if ( criteria.resultOffset ) params.set( 'offset', criteria.resultOffset );

		return params;
	}


	/**
	 * 
	 */
	store( type, data ) {
		var uri = type.uri;
		// :TODO: Just return the ID from this?
		return this.http.post( uri, data );
	}


	/**
	 * 
	 */
	update( type, id, data ) {
		var uri = `${type.uri}/${id}`;
		return this.http.post( uri, data );
	}


	/**
	 * 
	 */
	replace( type, id, data ) {
		var uri = `${type.uri}/${id}`;
		return this.http.put( uri, data );
	}


	/**
	 * 
	 */
	remove( type, id ) {
		var uri = `${type.uri}/${id}`;
		return this.http.delete( uri );
	}


}

