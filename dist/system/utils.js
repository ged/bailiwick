/* -*- javascript -*- */
"use strict";

/**
 * Decorator: @monadic
 *
 * Declare a method that acts as a monadic mutator -- calling it will operate on (and return)
 * a clone of the receiving object instead of the receiver.
 */

System.register(["babel-runtime/core-js/map"], function (_export, _context) {
	var _Map;

	return {
		setters: [function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}],
		execute: function () {
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

			_export("monadic", monadic);

			function mapify(obj) {
				if (obj instanceof _Map) {
					return obj;
				}

				let m = new _Map();

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

			_export("mapify", mapify);

			function demapify(map) {
				if (map instanceof Array) {
					let newArr = [];
					for (let x of map) {
						newArr.push(demapify(x));
					}
					return newArr;
				} else if (!(map instanceof _Map)) {
					return map;
				}

				let obj = {};
				for (let [k, v] of map) {
					obj[k] = demapify(v);
				}

				return obj;
			}

			_export("demapify", demapify);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRTyxZQUFTLE9BQVQsQ0FBa0IsTUFBbEIsRUFBMEIsSUFBMUIsRUFBZ0MsVUFBaEMsRUFBNkM7QUFDbkQsUUFBSSxXQUFXLFdBQVcsS0FBWCxDQURvQztBQUVuRCxlQUFXLEtBQVgsR0FBbUIsVUFBVSxHQUFHLElBQUgsRUFBVTtBQUN0QyxhQUFRLEtBQVIsQ0FBZSxDQUFDLDJCQUFELEdBQThCLElBQTlCLEVBQW1DLENBQWxELEVBRHNDO0FBRXRDLFNBQUksTUFBTSxLQUFLLEtBQUwsRUFBTixDQUZrQztBQUd0QyxhQUFRLEtBQVIsQ0FBZSxpQ0FBZixFQUFrRCxHQUFsRCxFQUhzQztBQUl0QyxjQUFTLEtBQVQsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsRUFKc0M7QUFLdEMsWUFBTyxHQUFQLENBTHNDO0tBQXBCLENBRmdDOztBQVVuRCxXQUFPLFVBQVAsQ0FWbUQ7SUFBN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsWUFBUyxNQUFULENBQWlCLEdBQWpCLEVBQXVCO0FBQzdCLFFBQUssbUJBQUwsRUFBMEI7QUFBRSxZQUFPLEdBQVAsQ0FBRjtLQUExQjs7QUFFQSxRQUFJLElBQUksVUFBSixDQUh5Qjs7QUFLN0IsUUFBSyxPQUFPLEdBQVAsS0FBZSxRQUFmLElBQTJCLFFBQVEsSUFBUixFQUFlO0FBQzlDLFlBQU8sR0FBUCxDQUQ4QztLQUEvQzs7QUFJQSxRQUFLLGVBQWUsS0FBZixFQUF1QjtBQUMzQixTQUFJLFNBQVMsRUFBVCxDQUR1QjtBQUUzQixVQUFNLElBQUksQ0FBSixJQUFTLEdBQWYsRUFBcUI7QUFDcEIsYUFBTyxJQUFQLENBQWEsT0FBTyxDQUFQLENBQWIsRUFEb0I7TUFBckI7QUFHQSxZQUFPLE1BQVAsQ0FMMkI7S0FBNUI7O0FBUUEsU0FBSyxJQUFJLENBQUosSUFBUyxHQUFkLEVBQW1CO0FBQ2xCLFNBQUssSUFBSSxjQUFKLENBQW1CLENBQW5CLENBQUwsRUFBNkI7QUFDNUIsUUFBRSxHQUFGLENBQU8sQ0FBUCxFQUFVLE9BQU8sSUFBSSxDQUFKLENBQVAsQ0FBVixFQUQ0QjtNQUE3QjtLQUREOztBQU1BLFdBQU8sQ0FBUCxDQXZCNkI7SUFBdkI7Ozs7Ozs7Ozs7Ozs7OztBQXFDQSxZQUFTLFFBQVQsQ0FBbUIsR0FBbkIsRUFBeUI7QUFDL0IsUUFBSyxlQUFlLEtBQWYsRUFBdUI7QUFDM0IsU0FBSSxTQUFTLEVBQVQsQ0FEdUI7QUFFM0IsVUFBTSxJQUFJLENBQUosSUFBUyxHQUFmLEVBQXFCO0FBQ3BCLGFBQU8sSUFBUCxDQUFhLFNBQVMsQ0FBVCxDQUFiLEVBRG9CO01BQXJCO0FBR0EsWUFBTyxNQUFQLENBTDJCO0tBQTVCLE1BTU8sSUFBSyxFQUFFLG9CQUFGLEVBQXdCO0FBQ25DLFlBQU8sR0FBUCxDQURtQztLQUE3Qjs7QUFJUCxRQUFJLE1BQU0sRUFBTixDQVgyQjtBQVkvQixTQUFNLElBQUksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFKLElBQWMsR0FBcEIsRUFBMEI7QUFDekIsU0FBSyxDQUFMLElBQVcsU0FBVSxDQUFWLENBQVgsQ0FEeUI7S0FBMUI7O0FBSUEsV0FBTyxHQUFQLENBaEIrQjtJQUF6QiIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogRGVjb3JhdG9yOiBAbW9uYWRpY1xuICpcbiAqIERlY2xhcmUgYSBtZXRob2QgdGhhdCBhY3RzIGFzIGEgbW9uYWRpYyBtdXRhdG9yIC0tIGNhbGxpbmcgaXQgd2lsbCBvcGVyYXRlIG9uIChhbmQgcmV0dXJuKVxuICogYSBjbG9uZSBvZiB0aGUgcmVjZWl2aW5nIG9iamVjdCBpbnN0ZWFkIG9mIHRoZSByZWNlaXZlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vbmFkaWMoIHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvciApIHtcblx0dmFyIHJlYWxmdW5jID0gZGVzY3JpcHRvci52YWx1ZTtcblx0ZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCAuLi5hcmdzICkge1xuXHRcdGNvbnNvbGUuZGVidWcoIGBDbG9uaW5nIGZvciBtb25hZGljIG1ldGhvZCAke25hbWV9YCApO1xuXHRcdHZhciBkdXAgPSB0aGlzLmNsb25lKCk7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCIgIGNsb25lZDogJW8uLi4gYXBwbHlpbmcgbWV0aG9kXCIsIGR1cCApO1xuXHRcdHJlYWxmdW5jLmFwcGx5KCBkdXAsIGFyZ3MgKTtcblx0XHRyZXR1cm4gZHVwO1xuXHR9O1xuXG5cdHJldHVybiBkZXNjcmlwdG9yO1xufVxuXG5cblxuLypcbiAqIEV4dHJhY3RlZCBmcm9tIGVzNi1tYXBpZnkgYnkgSm9uYXRoYW4gTGlwcHMgPGpsaXBwcyAoYXQpIGdtYWlsLmNvbT4gdG8gYXZvaWRcbiAqIHRoZSBkZXBlbmRlbmN5IG9uIFRyYWNldXIuXG4gKlxuICogVXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEFwYWNoZS0yLjAgbGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJldHVybiBhIE1hcCBjb250YWluaW5nIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzcGVjaWZpZWQge29iamVjdH0uXG4gKlxuICogQG1ldGhvZCBtYXBpZnlcbiAqIEBwYXJhbSB7T2JqZWN0LEFycmF5fSBvYmplY3QgICB0aGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBNYXAsIG9yIGFuIEFycmF5IG9mXG4gKiAgICAgb2JqZWN0cyB0byBjb252ZXJ0LlxuICpcbiAqIEByZXR1cm5zIHtNYXB9ICB0aGUgbmV3bHktY3JlYXRlZCBNYXAgb2JqZWN0LCBvciBhbiBBcnJheSBvZiBjb252ZXJ0ZWQgTWFwXG4gKiAgICAgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwaWZ5KCBvYmogKSB7XG5cdGlmICggb2JqIGluc3RhbmNlb2YgTWFwICkgeyByZXR1cm4gb2JqOyB9XG5cblx0bGV0IG0gPSBuZXcgTWFwKCk7XG5cblx0aWYgKCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwgKSB7XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdGlmICggb2JqIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cdFx0bGV0IG5ld0FyciA9IFtdO1xuXHRcdGZvciAoIGxldCB4IG9mIG9iaiApIHtcblx0XHRcdG5ld0Fyci5wdXNoKCBtYXBpZnkoeCkgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld0Fycjtcblx0fVxuXG5cdGZvciAobGV0IGsgaW4gb2JqKSB7XG5cdFx0aWYgKCBvYmouaGFzT3duUHJvcGVydHkoaykgKSB7XG5cdFx0XHRtLnNldCggaywgbWFwaWZ5KG9ialtrXSkgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbTtcbn1cblxuXG4vKipcbiAqIFJldHVybiBhbiBPYmplY3QgY29udGFpbmluZyB0aGUga2V5LXZhbHVlIHBhaXJzIG9mIHRoZSBzcGVjaWZpZWQge21hcH0gYXNcbiAqIHByb3BlcnRpZXMuXG4gKlxuICogQG1ldGhvZCBkZW1hcGlmeVxuICogQHBhcmFtIHtNYXAsQXJyYXl9IG9iamVjdCAgIHRoZSBNYXAgdG8gY29udmVydCB0byBhbiBPYmpldCwgb3IgYW4gQXJyYXkgb2ZcbiAqICAgICBNYXBzIHRvIGNvbnZlcnQuXG4gKlxuICogQHJldHVybnMge09iamVjdH0gIHRoZSBuZXdseS1jcmVhdGVkIE9iamVjdCwgb3IgYW4gQXJyYXkgb2YgY29udmVydGVkIE9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVtYXBpZnkoIG1hcCApIHtcblx0aWYgKCBtYXAgaW5zdGFuY2VvZiBBcnJheSApIHtcblx0XHRsZXQgbmV3QXJyID0gW107XG5cdFx0Zm9yICggbGV0IHggb2YgbWFwICkge1xuXHRcdFx0bmV3QXJyLnB1c2goIGRlbWFwaWZ5KHgpICk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdBcnI7XG5cdH0gZWxzZSBpZiAoICEobWFwIGluc3RhbmNlb2YgTWFwKSApIHtcblx0XHRyZXR1cm4gbWFwO1xuXHR9XG5cblx0bGV0IG9iaiA9IHt9O1xuXHRmb3IgKCBsZXQgW2ssIHZdIG9mIG1hcCApIHtcblx0XHRvYmpbIGsgXSA9IGRlbWFwaWZ5KCB2ICk7XG5cdH1cblxuXHRyZXR1cm4gb2JqO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
