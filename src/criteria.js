/**
 * Fluent criteria for Bailiwick querying
 *
 * @class Criteria
 * @constructor
 *
 */

class Criteria {

	constructor( pairs={} ) {
		this.filterClauses = new Map();
		this.limit = null;
		this.offset = null;

		this._filter( pairs );
	}


	clone() {
		var newObj = this.constructor();
		newObj.filterClauses = new Map( this.filterClauses );
		newObj.limit = this.limit;
		newObj.offset = this.offset;
		return newObj;
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
	 * @params {Integer} newLimit The new limit on how many objects to return.
	 */
	limit( newLimit ) {
		return this.clone()._limit( newLimit );
	}


	/**
	 * Add the given @pairs@ to the filter.
	 */
	_filter( pairs ) {
		for ( let key in pairs ) {
			this.filterClauses.set( key, pairs[key] );
		}
	}

}