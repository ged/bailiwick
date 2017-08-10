/* -*- javascript -*- */
"use strict";

import {Criteria} from './criteria';
import {logger, monadic} from './utils';

/**
 * A monadic/fluid interface to an unreified set of Model objects made up of
 * a Model class and a Criteria for selecting a subset of them.
 *
 * @class ResultSet
 * @constructor
 */
export class ResultSet {

	constructor( model, criteria=null ) {
		if ( criteria === null ) {
			criteria = new Criteria();
		}
		else if ( !(criteria instanceof Criteria) ) {
			criteria = new Criteria( criteria );
		}

		this.model = model;
		this.criteria = criteria;
	}


	/**
	 * Return a Promise that will resolve as the reified results described by
	 * the ResultSet.
	 * @method get
	 */
	get( limit=null, offset=null ) {
		var cr = this.criteria;
		if ( limit ) { cr = cr.limit( limit ); }
		if ( offset ) { cr = cr.offset( offset ); }

		logger.debug( `Fetching ${this.model.name} results matching criteria: `, cr );
		return this.model.get( cr );
	}


	/*
	 * Monadic API
	 */

	/**
	 * Monadic API -- duplicate the ResultSet.
	 * @return {ResultSet} the cloned result set
	 */
	clone() {
		return Reflect.construct( this.constructor, [this.model, this.criteria] );
	}


	/**
	 * Add selection criteria to the set.
	 * @method where
	 * @param {Object} params  key/value pairs that will be mapped to selection criteria.
	 * @return {ResultSet}  the cloned result set with the additional criteria.
	 */
	@monadic
	where( params ) {
		logger.debug( "Cloning resultset to add params: ", params );
		this.criteria = this.criteria.filter( params );
	}


	/**
	 * Add a limit to the maximum size of the set.
	 * @method limit
	 * @param {Number} count  the maximum number of results in the set
	 * @return {ResultSet}  the cloned result set with the new limit.
	 */
	@monadic
	limit( count ) {
		logger.debug( "Cloned resultset to add limit: ", count );
		this.criteria = this.criteria.limit( count );
	}


	/**
	 * Add an offset into the set that should be the first element.
	 * @method index
	 * @param {Number} index  the index of the first element of the set of all
	 *                        matching model objects.
	 * @return {ResultSet}  the cloned result set with the new offset.
	 */
	@monadic
	offset( index ) {
		logger.debug( "Cloned resultset to add offset: ", index );
		this.criteria = this.criteria.offset( index );
	}


	/**
	 * Specify a different location to fetch results from.
	 * @method from
	 * @param {Object} location   the location to specify when using the datastore.
	 * @return {ResultSet}  the cloned result set with the new location.
	 */
	@monadic
	from( location ) {
		logger.debug( "Clone resultset to change location: ", location );
		this.criteria = this.criteria.from( location );
	}

}
