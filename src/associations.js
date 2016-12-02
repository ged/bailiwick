/* -*- javascript -*- */
"use strict";
/* eslint-disable */

import inflection from 'inflection';
import Promise from 'bluebird';

import {debug} from './utils';


const DATA = Symbol.for( "data" ),
      ASSOCIATIONS = Symbol.for( "associations" ),
      ASSOCIATIONS_CACHE = Symbol.for("associationsCache"),
      DATASTORE = Symbol.for("datastore");


function capitalize( string ) {
	string = string.toString();

	if ( string.length === 0 ) return '';

	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}


export function oneToMany( associationName, modelClass, subResourceUri=null ) {
	debug( `Defining oneToMany association: ${associationName}` );
	let capitalized = capitalize( associationName );

	return function( target, name, descriptor ) {

		Object.assign( target, {
			[`get${capitalized}`]: function( avoidCache=false ) {
				if ( !subResourceUri ) {
					subResourceUri = modelClass.uri;
				}

				if ( !this[ ASSOCIATIONS_CACHE ].has(associationName) ) {
					let url = `${this.uri}/${subResourceUri}`;
					debug( `Fetching ${associationName} for ${this} from ${url}` );
					return modelClass.from( url ).get().then( results => {
						this[ ASSOCIATIONS_CACHE ].set( associationName, results );
						return Promise.resolve( results );
					});
				}

				return Promise.resolve( this[ ASSOCIATIONS_CACHE ].get(associationName) );
			},
			[`add${capitalized}`]: function( ...objects ) {
				return Promise.resolve( true );
			},
			[`remove${capitalized}`]: function( ...objects ) {
				return Promise.resolve( true );
			}
		});
		debug( "property descriptors are: ",
			Object.getOwnPropertyDescriptors(target) );

		return descriptor;
	}
}


export function oneToOne( associationName, modelClass, subResourceUri=null ) {
	debug( `Defining oneToOne association: ${associationName}` );
	let capitalized = capitalize( associationName );

	return function( target, name, descriptor ) {

		Object.assign( target, {
			[`get${capitalized}`]: function( avoidCache=false ) {
				if ( !subResourceUri ) {
					subResourceUri = modelClass.uri;
				}

				if ( !this[ ASSOCIATIONS_CACHE ].has(associationName) ) {
					let url = `${this.uri}/${subResourceUri}`;
					debug( `Fetching ${associationName} for ${this} from ${url}` );
					return modelClass.from( url ).get().then( result => {
						this[ ASSOCIATIONS_CACHE ].set( associationName, result );
						return Promise.resolve( result );
					});
				}

				return Promise.resolve( this[ ASSOCIATIONS_CACHE ].get(associationName) );
			},
			[`set${capitalized}`]: function( ...objects ) {
				return Promise.resolve( true );
			},
			[`remove${capitalized}`]: function( ...objects ) {
				return Promise.resolve( true );
			}
		});
		debug( "property descriptors are: ",
			Object.getOwnPropertyDescriptors(target) );

		return descriptor;
	}
}



export function manyToOne( associationName, modelClass, keyField=null ) {
	debug( `Defining oneToMany association: ${associationName}` );
	let capitalized = capitalize( associationName );
	if ( !keyField ) {
		keyField = inflection.underscore( associationName ) + '_id';
	}

	return function( target, name, descriptor ) {

		Object.assign( target, {
			[`get${capitalized}`]: function( avoidCache=false ) {
				if ( !this[ ASSOCIATIONS_CACHE ].has(associationName) ) {
					let id = this[ keyField ];

					debug( `Fetching ${associationName} (${modelClass.name} id=${id}) for ${this}` );
					return modelClass.get( id ).then( result => {
						this[ ASSOCIATIONS_CACHE ].set( associationName, result );
						return Promise.resolve( result );
					});
				}

				return Promise.resolve( this[ ASSOCIATIONS_CACHE ].get(associationName) );
			},
			[`set${capitalized}`]: function( ...objects ) {
				return Promise.resolve( true );
			},
			[`remove${capitalized}`]: function( ...objects ) {
				return Promise.resolve( true );
			}
		});
		debug( "property descriptors are: ",
			Object.getOwnPropertyDescriptors(target) );

		return descriptor;
	}
}


