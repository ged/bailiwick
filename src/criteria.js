/* -*- javascript -*- */
'use strict';

/**
 * Fluent criteria for Bailiwick querying
 *
 * @class Criteria
 * @constructor
 *
 */
export class Criteria {

	constructor( model, pairs={} ) {
		// console.debug( `Constructing criteria for ${model.name}` );
		this.model = model;
		this.filterClauses = new Map();
		this.maxResultCount = null;
		this.resultOffset = null;

		this._filter( pairs );
	}


	clone() {
		var newObj = Reflect.construct( this.constructor, [this.model] );
		newObj.filterClauses = new Map( this.filterClauses );
		newObj.maxResultCount = this.maxResultCount;
		newObj.resultOffset = this.resultOffset;
		return newObj;
	}


	/**
	 * Fetch results using the criteria's filter, limit, and offset.
	 * @returns {Promise} a promise that will resolve to the results.
	 */
	get( limit=null, offset=null ) {
		var criteria = this;
		if ( limit ) criteria = criteria.limit( limit );
		if ( offset ) criteria = criteria.offset( offset );

		return criteria.model.get( criteria );
	}


	/**
	 * Create clone of the current criteria with the additional filter
	 * {pairs}.
	 * 
	 */
	filter( pairs ) {
		return this.clone()._filter( pairs );
	}


	/**
	 * Create a clone of the current criteria with its limit set to {newLimit}.
	 * @param {Integer} newLimit The new limit on how many objects to return.
	 */
	limit( newLimit ) {
		return this.clone()._limit( newLimit );
	}


	/**
	 * Create a clone of the current criteria with its offset set to {newOffset}.
	 * @param {Integer} newOffset The new index into the filtered set to use as the first
	 *                  result.
	 */
	offset( newOffset ) {
		return this.clone()._offset( newOffset );
	}


	/**
	 * Add the given {pairs} to the filter.
	 * @param {Object} pairs  key/value pairs to match against filtered objects.
	 * @return {this} for chaining.
	 */
	_filter( pairs ) {
		for ( let key in pairs ) {
			this.filterClauses.set( key, pairs[key] );
		}
		return this;
	}

	/**
	 * Set the limit of the receiver to {count}.
	 * @param {Integer} count  the new maximum count to return.
	 * @return {this} for chaining.
	 */
	_limit( count ) {
		this.maxResultCount = count;
		return this;
	}


	/**
	 * Set the offset into the filtered set that will be used as the first result.
	 * @param {Integer} count  the new offset
	 * @return {this} for chaining.
	 */
	_offset( index ) {
		this.resultOffset = index;
		return this;
	}

}