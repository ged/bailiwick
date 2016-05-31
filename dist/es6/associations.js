/* -*- javascript -*- */
"use strict";
/* eslint-disable */

const DATA = Symbol.for( "data" ),
      ASSOCIATIONS = Symbol.for( "associations" );

export const AssociationFactoryFunctions = new Map();

AssociationFactoryFunctions.set( "oneToMany", (name, modelClass, endpoint=null) => {
	return function( skipCache=false ) {
		return this[ ASSOCIATIONS ][ name ] || this[ DATA ][ name ];
	};
});
AssociationFactoryFunctions.set( "manyToOne", (name, modelClass, endpoint=null) => {
	return function( skipCache=false ) {
		return this[ ASSOCIATIONS ][ name ] || this[ DATA ][ name ];
	};
});
AssociationFactoryFunctions.set( "oneToOne", (name, modelClass, endpoint=null) => {
	return function( skipCache=false ) {
		return this[ ASSOCIATIONS ][ name ] || this[ DATA ][ name ];
	};
});


/**
 * Decorator: @association
 * Adds an association to the model
 */
export function association( target ) {
	return function declareAssociation( type, name, modelClass, endpoint=null ) {
		let factoryFunction = AssociationFactoryFunctions.get( type );

		if ( typeof factory !== "function" ) {
			throw `Unknown association type ${type}`;
		}

		target[ name ] = factoryFunction( name, modelClass, endpoint );
	}
}
