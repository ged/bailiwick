/* -*- javascript -*- */
"use strict";


// Copied from es5-error by Ben Youngblood, used under the terms of the MIT
// License:
//
// Copyright (c) 2015 Ben Youngblood
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
export class BailiwickError extends Error {

	constructor( message='' ) {
		super(message);

		// extending Error is weird and does not propagate `message`
		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable : false,
			value : message,
			writable : true,
		});

		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable : false,
			value : this.constructor.name,
			writable : true,
		});

		if (Error.hasOwnProperty('captureStackTrace')) {
			Error.captureStackTrace(this, this.constructor);
			return;
		}

		Object.defineProperty(this, 'stack', {
			configurable: true,
			enumerable : false,
			value : (new Error(message)).stack,
			writable : true,
		});
	}
}


export class NotImplementedError extends BailiwickError {

	constructor( methodname ) {
		super(`No implementation provided for ${methodname}(...)`);
	}

}

export class HTTPError extends BailiwickError {

	status = 500;
	statusText = "Unknown error";
	response = null;


	static fromResponse( response ) {
		if ( response.ok ) {
			raise `Expected an error response, but got: ${response}`;
		}

		switch( Math.floor(response.status / 100) ) {
			case 4:
				return new RequestError( response );
				break;
			case 5:
				return new ServerError( response );
				break;
			default:
				return new HTTPError( response );
		}
	}


	constructor( response ) {
		super( `[${response.status}] ${response.statusText}` );
		this.status = response.status;
		this.statusText = response.statusText;
		this.response = response;
	}


	/**
	 * toString() API -- return a human-readable representation of the object.
	 */
	get [Symbol.toStringTag]() {
		return `<${this.constructor.name} [${this.status}]: ${this.statusText}>`;
	}

}


// 4xx responses
export class RequestError extends HTTPError {}

// 5xx responses
export class ServerError extends HTTPError {}

