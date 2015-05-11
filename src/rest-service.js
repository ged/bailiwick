/* -*- javascript -*- */
'use strict';

import httpplease from 'httpplease';
// import {jsonrequest, jsonresponse, oldiexdomain} from 'httpplease/plugins';
import Promise from 'bluebird';

import {Datastore} from './datastore';
import * as plugins from './rest-service/plugins';


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
		this.http = httpplease.use(
			new plugins.JSONResponseProcessor(),
			new plugins.JSONRequestProcessor(),
			new plugins.CORSSupport()
		);
	}

	getInstance( type, id ) {
		return new Promise( (resolve, reject) => {
			var url = `${this.baseUrl}/${type.uri}/${id}`;
			console.debug( `GETting ${url}` );

			this.http.get( url, (err, res) => {
				if ( err ) {
					console.error( `ERROR [${err.status}]: ${err.message}` );
					reject( err );
				} else {
					console.info( "Successful response" );
					console.debug( res );
					resolve( res.body );
				}
			});
		});
	}

	getCollection( type, criteria ) {
		return new Promise( (resolve, reject) => {
			var url = `${this.baseUrl}/${type.uri}`;
			var params = this.makeParamsFromCriteria( criteria );

			if ( params ) {
				url = url + '?' + params;
			}

			this.http.get( url, (err, res) => {
				if ( err ) {
					console.error( `ERROR [${err.status}]: ${err.message}` );
					reject( err );
				} else {
					console.info( "Successful response" );
					console.debug( res );
					resolve( res.body );
				}
			});
		});
	}

	makeParamsFromCriteria( criteria ) {
		// No-op for now
		return null;
	}

}

