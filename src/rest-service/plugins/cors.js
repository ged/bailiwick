/* -*- javascript -*- */
'use strict';

export var CORSPlugin = {
	setupXhr: xhr => {
		console.debug( "Setting withCredentials to true." );
		xhr.withCredentials = true;
	}
};

