/**
* Bailiwick.Model
*
* The base model class.
*
*/

export default class Model {

	constructor(store) {
		this.store = store;
		this.errors = [];
	}

	validate() {
		this.errors.clear();
		return new Promise( (resolve, reject) => {
			if ( errors.length == 0 ) {
				resolve();
			} else {
				reject( errors );
			}
		});
	}
}

