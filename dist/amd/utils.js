define(["exports", "babel-runtime/core-js/map"], function (exports, _map) {
	/* -*- javascript -*- */
	"use strict";

	/**
  * Decorator: @monadic
  *
  * Declare a method that acts as a monadic mutator -- calling it will operate on (and return)
  * a clone of the receiving object instead of the receiver.
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.monadic = monadic;
	exports.mapify = mapify;
	exports.demapify = demapify;

	var _map2 = _interopRequireDefault(_map);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function monadic(target, name, descriptor) {
		var realfunc = descriptor.value;
		descriptor.value = function (...args) {
			console.debug(`Cloning for monadic method ${ name }`);
			var dup = this.clone();
			console.debug("  cloned: %o... applying method", dup);
			realfunc.apply(dup, args);
			return dup;
		};

		return descriptor;
	}

	/*
  * Extracted from es6-mapify by Jonathan Lipps <jlipps (at) gmail.com> to avoid
  * the dependency on Traceur.
  *
  * Used under the terms of the Apache-2.0 license.
  */

	/**
  * Return a Map containing the properties of the specified {object}.
  *
  * @method mapify
  * @param {Object,Array} object   the object to convert to a Map, or an Array of
  *     objects to convert.
  *
  * @returns {Map}  the newly-created Map object, or an Array of converted Map
  *     objects
  */
	function mapify(obj) {
		if (obj instanceof _map2.default) {
			return obj;
		}

		let m = new _map2.default();

		if (typeof obj !== 'object' || obj === null) {
			return obj;
		}

		if (obj instanceof Array) {
			let newArr = [];
			for (let x of obj) {
				newArr.push(mapify(x));
			}
			return newArr;
		}

		for (let k in obj) {
			if (obj.hasOwnProperty(k)) {
				m.set(k, mapify(obj[k]));
			}
		}

		return m;
	}

	/**
  * Return an Object containing the key-value pairs of the specified {map} as
  * properties.
  *
  * @method demapify
  * @param {Map,Array} object   the Map to convert to an Objet, or an Array of
  *     Maps to convert.
  *
  * @returns {Object}  the newly-created Object, or an Array of converted Object
  */
	function demapify(map) {
		if (map instanceof Array) {
			let newArr = [];
			for (let x of map) {
				newArr.push(demapify(x));
			}
			return newArr;
		} else if (!(map instanceof _map2.default)) {
			return map;
		}

		let obj = {};
		for (let [k, v] of map) {
			obj[k] = demapify(v);
		}

		return obj;
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7Ozs7Ozs7OztTQVFnQjtTQWdDQTtTQXFDQTs7Ozs7Ozs7OztBQXJFVCxVQUFTLE9BQVQsQ0FBa0IsTUFBbEIsRUFBMEIsSUFBMUIsRUFBZ0MsVUFBaEMsRUFBNkM7QUFDbkQsTUFBSSxXQUFXLFdBQVcsS0FBWCxDQURvQztBQUVuRCxhQUFXLEtBQVgsR0FBbUIsVUFBVSxHQUFHLElBQUgsRUFBVTtBQUN0QyxXQUFRLEtBQVIsQ0FBZSxDQUFDLDJCQUFELEdBQThCLElBQTlCLEVBQW1DLENBQWxELEVBRHNDO0FBRXRDLE9BQUksTUFBTSxLQUFLLEtBQUwsRUFBTixDQUZrQztBQUd0QyxXQUFRLEtBQVIsQ0FBZSxpQ0FBZixFQUFrRCxHQUFsRCxFQUhzQztBQUl0QyxZQUFTLEtBQVQsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsRUFKc0M7QUFLdEMsVUFBTyxHQUFQLENBTHNDO0dBQXBCLENBRmdDOztBQVVuRCxTQUFPLFVBQVAsQ0FWbUQ7RUFBN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsVUFBUyxNQUFULENBQWlCLEdBQWpCLEVBQXVCO0FBQzdCLE1BQUssNEJBQUwsRUFBMEI7QUFBRSxVQUFPLEdBQVAsQ0FBRjtHQUExQjs7QUFFQSxNQUFJLElBQUksbUJBQUosQ0FIeUI7O0FBSzdCLE1BQUssT0FBTyxHQUFQLEtBQWUsUUFBZixJQUEyQixRQUFRLElBQVIsRUFBZTtBQUM5QyxVQUFPLEdBQVAsQ0FEOEM7R0FBL0M7O0FBSUEsTUFBSyxlQUFlLEtBQWYsRUFBdUI7QUFDM0IsT0FBSSxTQUFTLEVBQVQsQ0FEdUI7QUFFM0IsUUFBTSxJQUFJLENBQUosSUFBUyxHQUFmLEVBQXFCO0FBQ3BCLFdBQU8sSUFBUCxDQUFhLE9BQU8sQ0FBUCxDQUFiLEVBRG9CO0lBQXJCO0FBR0EsVUFBTyxNQUFQLENBTDJCO0dBQTVCOztBQVFBLE9BQUssSUFBSSxDQUFKLElBQVMsR0FBZCxFQUFtQjtBQUNsQixPQUFLLElBQUksY0FBSixDQUFtQixDQUFuQixDQUFMLEVBQTZCO0FBQzVCLE1BQUUsR0FBRixDQUFPLENBQVAsRUFBVSxPQUFPLElBQUksQ0FBSixDQUFQLENBQVYsRUFENEI7SUFBN0I7R0FERDs7QUFNQSxTQUFPLENBQVAsQ0F2QjZCO0VBQXZCOzs7Ozs7Ozs7Ozs7QUFxQ0EsVUFBUyxRQUFULENBQW1CLEdBQW5CLEVBQXlCO0FBQy9CLE1BQUssZUFBZSxLQUFmLEVBQXVCO0FBQzNCLE9BQUksU0FBUyxFQUFULENBRHVCO0FBRTNCLFFBQU0sSUFBSSxDQUFKLElBQVMsR0FBZixFQUFxQjtBQUNwQixXQUFPLElBQVAsQ0FBYSxTQUFTLENBQVQsQ0FBYixFQURvQjtJQUFyQjtBQUdBLFVBQU8sTUFBUCxDQUwyQjtHQUE1QixNQU1PLElBQUssRUFBRSw2QkFBRixFQUF3QjtBQUNuQyxVQUFPLEdBQVAsQ0FEbUM7R0FBN0I7O0FBSVAsTUFBSSxNQUFNLEVBQU4sQ0FYMkI7QUFZL0IsT0FBTSxJQUFJLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBSixJQUFjLEdBQXBCLEVBQTBCO0FBQ3pCLE9BQUssQ0FBTCxJQUFXLFNBQVUsQ0FBVixDQUFYLENBRHlCO0dBQTFCOztBQUlBLFNBQU8sR0FBUCxDQWhCK0I7RUFBekIiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtKi0gamF2YXNjcmlwdCAtKi0gKi9cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIERlY29yYXRvcjogQG1vbmFkaWNcbiAqXG4gKiBEZWNsYXJlIGEgbWV0aG9kIHRoYXQgYWN0cyBhcyBhIG1vbmFkaWMgbXV0YXRvciAtLSBjYWxsaW5nIGl0IHdpbGwgb3BlcmF0ZSBvbiAoYW5kIHJldHVybilcbiAqIGEgY2xvbmUgb2YgdGhlIHJlY2VpdmluZyBvYmplY3QgaW5zdGVhZCBvZiB0aGUgcmVjZWl2ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb25hZGljKCB0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IgKSB7XG5cdHZhciByZWFsZnVuYyA9IGRlc2NyaXB0b3IudmFsdWU7XG5cdGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiggLi4uYXJncyApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBgQ2xvbmluZyBmb3IgbW9uYWRpYyBtZXRob2QgJHtuYW1lfWAgKTtcblx0XHR2YXIgZHVwID0gdGhpcy5jbG9uZSgpO1xuXHRcdGNvbnNvbGUuZGVidWcoIFwiICBjbG9uZWQ6ICVvLi4uIGFwcGx5aW5nIG1ldGhvZFwiLCBkdXAgKTtcblx0XHRyZWFsZnVuYy5hcHBseSggZHVwLCBhcmdzICk7XG5cdFx0cmV0dXJuIGR1cDtcblx0fTtcblxuXHRyZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuXG5cbi8qXG4gKiBFeHRyYWN0ZWQgZnJvbSBlczYtbWFwaWZ5IGJ5IEpvbmF0aGFuIExpcHBzIDxqbGlwcHMgKGF0KSBnbWFpbC5jb20+IHRvIGF2b2lkXG4gKiB0aGUgZGVwZW5kZW5jeSBvbiBUcmFjZXVyLlxuICpcbiAqIFVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBBcGFjaGUtMi4wIGxpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXR1cm4gYSBNYXAgY29udGFpbmluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgc3BlY2lmaWVkIHtvYmplY3R9LlxuICpcbiAqIEBtZXRob2QgbWFwaWZ5XG4gKiBAcGFyYW0ge09iamVjdCxBcnJheX0gb2JqZWN0ICAgdGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGEgTWFwLCBvciBhbiBBcnJheSBvZlxuICogICAgIG9iamVjdHMgdG8gY29udmVydC5cbiAqXG4gKiBAcmV0dXJucyB7TWFwfSAgdGhlIG5ld2x5LWNyZWF0ZWQgTWFwIG9iamVjdCwgb3IgYW4gQXJyYXkgb2YgY29udmVydGVkIE1hcFxuICogICAgIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcGlmeSggb2JqICkge1xuXHRpZiAoIG9iaiBpbnN0YW5jZW9mIE1hcCApIHsgcmV0dXJuIG9iajsgfVxuXG5cdGxldCBtID0gbmV3IE1hcCgpO1xuXG5cdGlmICggdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsICkge1xuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRpZiAoIG9iaiBpbnN0YW5jZW9mIEFycmF5ICkge1xuXHRcdGxldCBuZXdBcnIgPSBbXTtcblx0XHRmb3IgKCBsZXQgeCBvZiBvYmogKSB7XG5cdFx0XHRuZXdBcnIucHVzaCggbWFwaWZ5KHgpICk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdBcnI7XG5cdH1cblxuXHRmb3IgKGxldCBrIGluIG9iaikge1xuXHRcdGlmICggb2JqLmhhc093blByb3BlcnR5KGspICkge1xuXHRcdFx0bS5zZXQoIGssIG1hcGlmeShvYmpba10pICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG07XG59XG5cblxuLyoqXG4gKiBSZXR1cm4gYW4gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleS12YWx1ZSBwYWlycyBvZiB0aGUgc3BlY2lmaWVkIHttYXB9IGFzXG4gKiBwcm9wZXJ0aWVzLlxuICpcbiAqIEBtZXRob2QgZGVtYXBpZnlcbiAqIEBwYXJhbSB7TWFwLEFycmF5fSBvYmplY3QgICB0aGUgTWFwIHRvIGNvbnZlcnQgdG8gYW4gT2JqZXQsIG9yIGFuIEFycmF5IG9mXG4gKiAgICAgTWFwcyB0byBjb252ZXJ0LlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9ICB0aGUgbmV3bHktY3JlYXRlZCBPYmplY3QsIG9yIGFuIEFycmF5IG9mIGNvbnZlcnRlZCBPYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbWFwaWZ5KCBtYXAgKSB7XG5cdGlmICggbWFwIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cdFx0bGV0IG5ld0FyciA9IFtdO1xuXHRcdGZvciAoIGxldCB4IG9mIG1hcCApIHtcblx0XHRcdG5ld0Fyci5wdXNoKCBkZW1hcGlmeSh4KSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3QXJyO1xuXHR9IGVsc2UgaWYgKCAhKG1hcCBpbnN0YW5jZW9mIE1hcCkgKSB7XG5cdFx0cmV0dXJuIG1hcDtcblx0fVxuXG5cdGxldCBvYmogPSB7fTtcblx0Zm9yICggbGV0IFtrLCB2XSBvZiBtYXAgKSB7XG5cdFx0b2JqWyBrIF0gPSBkZW1hcGlmeSggdiApO1xuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
