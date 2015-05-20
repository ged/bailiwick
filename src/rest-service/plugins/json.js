/* -*- javascript -*- */
'use strict';

function hasNonJsonContentType( xhr ) {
	return xhr.headers.has('content-type') &&
		xhr.headers.get('content-type').indexOf('application/json') == -1
}

export var JSONPlugin = {

	makeRequestBody: body => {
		if ( !body ) return;
		if ( !body instanceof Object ) return;
		if ( hasNonJsonContentType(this) ) return;

		console.debug( "Setting up a JSON body." );
		this.headers.set( 'content-type', 'application/json; charset=utf-8' );
		return JSON.stringify( body );
	},

	extractResponseBody: (xhr) => {
		var contentType = xhr.getResponseHeader( 'content-type' );

		if ( contentType.indexOf('application/json') >= 0 || contentType.indexOf('+json') >= 0 ) {
			console.info( "JSON response; parsing and returning %d bytes of data.", xhr.response.length );
			return JSON.parse( xhr.response );
		} else {
			console.debug( "Not a JSON response (content-type = %s); skipping.", contentType );
		}
	}

};

