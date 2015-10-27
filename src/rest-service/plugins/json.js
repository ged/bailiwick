/* -*- javascript -*- */
'use strict';

function isJSONContentType( contentType ) {
	return ( contentType.indexOf('application/json') >= 0 ||
	         contentType.indexOf('+json') >= 0 );
}

export var JSONPlugin = {

	makeRequestBody: (xhr, body) => {
		if ( !body ) { return null; }
		if ( !body instanceof Object ) { return null; }
		if ( xhr.responseType !== '' ) { return null; }

		console.debug( "Setting up a JSON body." );
		xhr.setRequestHeader( 'content-type', 'application/json; charset=utf-8' );
		xhr.responseType = 'json';

		return JSON.stringify( body );
	},

	extractResponseBody: (xhr) => {
		if ( xhr.responseType === 'json' ) {
			console.debug( `Native JSON response. Using xhr.response.` );
			return xhr.response;
		}

		else {
			var contentType = xhr.getResponseHeader( 'content-type' );

			if ( isJSONContentType(contentType) ) {
				console.info( "JSON response; parsing and returning %d bytes of data.",
				              xhr.response.length );
				return JSON.parse( xhr.response );
			} else {
				console.debug( "Not a JSON response (content-type = %s); skipping.", contentType );
			}
		}

	}

};
