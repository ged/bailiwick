/* -*- javascript -*- */
'use strict';

import Promise from 'bluebird';
import {Datastore} from './datastore';

import {VERSION} from './index';
import {Xhr} from './rest-service/xhr';
import {JSONPlugin, CORSPlugin} from './rest-service/plugins';

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
		this.http = new Xhr({ baseUrl: baseUrl }).
			using( JSONPlugin, CORSPlugin );
	}


	getInstance( type, id ) {
		var uri = type.uri;
		if ( id ) { uri += '/' + id.toString(); }
		return this.http.get( uri );
	}


	getCollection( type, criteria ) {
		var uri = type.uri;
		var params = this.makeParamsFromCriteria( criteria );

		return this.http.get( uri, params );
	}


	makeParamsFromCriteria( criteria ) {
		if ( !criteria ) return null;

		var params = new Map();

		if ( criteria.maxResultCount ) params.set( 'limit', criteria.maxResultCount );
		if ( criteria.resultOffset ) params.set( 'offset', criteria.resultOffset );

		return params;
	}

}

