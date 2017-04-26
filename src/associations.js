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


class Association {

	static decorate( target, ...args ) {
		debug( "Decorating ", target, " with a ", this );
		let association = Reflect.construct( this, args );

		debug( "Association is: ", association );
		// target.associations.set( name, association );

		Object.assign( target, {
			[ association.getMethodName ]: function(...args) {
				return association.getFor( this, ...args );
			},
			[ association.addMethodName ]: function(...args) {
				return association.addFor( this, ...args );
			},
			[ association.removeMethodName ]: function(...args) {
				return association.removeFor( this, ...args );
			}
		});

		debug( "Target after decoration is: ", target );
	}

	constructor( name, modelClassSpec, options={} ) {
		this.name = name;
		this.modelClassSpec = modelClassSpec;
		this.options = options;
	}

	get getMethodName() {
		return `get${ inflection.capitalize(this.name) }`;
	}

	get addMethodName() {
		return `add${ inflection.capitalize(this.name) }`;
	}

	get removeMethodName() {
		return `remove${ inflection.capitalize(this.name) }`;
	}


	get modelClass() {
		// TODO: Handle the import type of spec, too: ['User', './user']
		if ( Array.isArray(this.modelClassSpec) ) {
			let [className, importPath] = this.modelClassSpec;
			// System.import( importPath ).then( mod => {
			// 	console.debug( `Importing model class ${className} from module: `, mod );
			// 	this.modelClassSpec = mod[ className ];
			// });
			throw new Error( "Imported model class not yet supported." );
		}
		return this.modelClassSpec;
	}

	urlFrom( origin ) {
		let base = origin.uri;
		let path = this.options.subResourceUri || this.modelClass.uri;
		return `${base}/${path}`;
	}

}


export class OneToManyAssociation extends Association {

	getFor( origin, avoidCache=false ) {
		let targetClass = this.modelClass;

		if ( !origin[ASSOCIATIONS_CACHE].has(this.name) ) {
			let url = this.urlFrom( origin );
			debug( `Fetching ${this.name} for ${origin} from ${url}` );
			return targetClass.from( url ).get().then( results => {
				origin[ ASSOCIATIONS_CACHE ].set( this.name, results );
						return Promise.resolve( results );
					});
				}

		return Promise.resolve( origin[ASSOCIATIONS_CACHE].get(this.name) );
	}



}


export class OneToOneAssociation extends OneToManyAssociation {
}


export class ManyToOneAssociation extends Association {

	getFor( origin, avoidCache=false ) {
		let targetClass = this.modelClass;

		if ( !origin[ASSOCIATIONS_CACHE].has(this.name) ) {
			let promise = null;

			if ( this.options.keyField ) {
				debug( `Using keyField ${this.options.keyField}` );
				let id = origin[ this.options.keyField ];
				if ( id ) {
					debug( `  ${this.options.keyField} is ${id}` );
					promise = targetClass.get( id );
				} else {
					debug( `  ${this.options.keyField} isn't set.` );
					promise = Promise.resolve( null );
				}
			} else {
				debug( `  No keyField; using urlFrom.` );
				let url = this.urlFrom( origin );
				promise = targetClass.from( url ).get();
			}

			return promise.then( results => {
				origin[ ASSOCIATIONS_CACHE ].set( this.name, results );
				return Promise.resolve( results );
			});
		}

		return Promise.resolve( origin[ASSOCIATIONS_CACHE].get(this.name) );
	}

}



/**
 * Delegator
 */
export function associationDelegator( targetClass ) {
	return {
		oneToMany: function( ...args ) {
			OneToManyAssociation.decorate( targetClass.prototype, ...args );
			},
		oneToOne: function( ...args ) {
			OneToOneAssociation.decorate( targetClass.prototype, ...args );
		},
		manyToOne: function( ...args ) {
			ManyToOneAssociation.decorate( targetClass.prototype, ...args );
			}
	};
}



/**
 * Decorators
 */

export function oneToMany( associationName, modelClass, options={} ) {
	debug( `Defining oneToMany association: ${associationName}` );

	return function( target, name, descriptor ) {
		OneToManyAssociation.decorate( target, associationName, modelClass, options );
		return descriptor;
	}
}


export function oneToOne( associationName, modelClass, subResourceUri=null ) {
	debug( `Defining oneToOne association: ${associationName}` );

	return function( target, name, descriptor ) {
		OneToOneAssociation.decorate( target, associationName, modelClass, options );
		return descriptor;
	}
}



export function manyToOne( associationName, modelClass, options={} ) {
	debug( `Defining oneToMany association: ${associationName}` );

	return function( target, name, descriptor ) {
		ManyToOneAssociation.decorate( target, associationName, modelClass, options );
	}
}


