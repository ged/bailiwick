/**
 * REST service datastore
 *
 * @module RESTService
 *
 */

import {Datastore} from './datastore';


export class RESTService extends Datastore {

	constructor( http ) {
		super();
		this.http = http;
	}


	getInstance( type, id ) {
		let http = this.buildRequestFor( type );
		return http.get( id ).then( result => {
			Reflect.construct( type, result );
		});
	}

	getCollection( type, options ) {
		let http = this.buildRequestFor( type );
		return http.get( options )
	}




	buildRequestFor( type ) {
		
	}

}

