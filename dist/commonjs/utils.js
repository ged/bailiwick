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

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

exports.monadic = monadic;
exports.mapify = mapify;
exports.demapify = demapify;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFRZ0I7UUFnQ0E7UUFxQ0E7Ozs7QUFyRVQsU0FBUyxPQUFULENBQWtCLE1BQWxCLEVBQTBCLElBQTFCLEVBQWdDLFVBQWhDLEVBQTZDO0FBQ25ELEtBQUksV0FBVyxXQUFXLEtBQVgsQ0FEb0M7QUFFbkQsWUFBVyxLQUFYLEdBQW1CLFVBQVUsR0FBRyxJQUFILEVBQVU7QUFDdEMsVUFBUSxLQUFSLENBQWUsQ0FBQywyQkFBRCxHQUE4QixJQUE5QixFQUFtQyxDQUFsRCxFQURzQztBQUV0QyxNQUFJLE1BQU0sS0FBSyxLQUFMLEVBQU4sQ0FGa0M7QUFHdEMsVUFBUSxLQUFSLENBQWUsaUNBQWYsRUFBa0QsR0FBbEQsRUFIc0M7QUFJdEMsV0FBUyxLQUFULENBQWdCLEdBQWhCLEVBQXFCLElBQXJCLEVBSnNDO0FBS3RDLFNBQU8sR0FBUCxDQUxzQztFQUFwQixDQUZnQzs7QUFVbkQsUUFBTyxVQUFQLENBVm1EO0NBQTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLFNBQVMsTUFBVCxDQUFpQixHQUFqQixFQUF1QjtBQUM3QixLQUFLLDRCQUFMLEVBQTBCO0FBQUUsU0FBTyxHQUFQLENBQUY7RUFBMUI7O0FBRUEsS0FBSSxJQUFJLG1CQUFKLENBSHlCOztBQUs3QixLQUFLLE9BQU8sR0FBUCxLQUFlLFFBQWYsSUFBMkIsUUFBUSxJQUFSLEVBQWU7QUFDOUMsU0FBTyxHQUFQLENBRDhDO0VBQS9DOztBQUlBLEtBQUssZUFBZSxLQUFmLEVBQXVCO0FBQzNCLE1BQUksU0FBUyxFQUFULENBRHVCO0FBRTNCLE9BQU0sSUFBSSxDQUFKLElBQVMsR0FBZixFQUFxQjtBQUNwQixVQUFPLElBQVAsQ0FBYSxPQUFPLENBQVAsQ0FBYixFQURvQjtHQUFyQjtBQUdBLFNBQU8sTUFBUCxDQUwyQjtFQUE1Qjs7QUFRQSxNQUFLLElBQUksQ0FBSixJQUFTLEdBQWQsRUFBbUI7QUFDbEIsTUFBSyxJQUFJLGNBQUosQ0FBbUIsQ0FBbkIsQ0FBTCxFQUE2QjtBQUM1QixLQUFFLEdBQUYsQ0FBTyxDQUFQLEVBQVUsT0FBTyxJQUFJLENBQUosQ0FBUCxDQUFWLEVBRDRCO0dBQTdCO0VBREQ7O0FBTUEsUUFBTyxDQUFQLENBdkI2QjtDQUF2Qjs7Ozs7Ozs7Ozs7O0FBcUNBLFNBQVMsUUFBVCxDQUFtQixHQUFuQixFQUF5QjtBQUMvQixLQUFLLGVBQWUsS0FBZixFQUF1QjtBQUMzQixNQUFJLFNBQVMsRUFBVCxDQUR1QjtBQUUzQixPQUFNLElBQUksQ0FBSixJQUFTLEdBQWYsRUFBcUI7QUFDcEIsVUFBTyxJQUFQLENBQWEsU0FBUyxDQUFULENBQWIsRUFEb0I7R0FBckI7QUFHQSxTQUFPLE1BQVAsQ0FMMkI7RUFBNUIsTUFNTyxJQUFLLEVBQUUsNkJBQUYsRUFBd0I7QUFDbkMsU0FBTyxHQUFQLENBRG1DO0VBQTdCOztBQUlQLEtBQUksTUFBTSxFQUFOLENBWDJCO0FBWS9CLE1BQU0sSUFBSSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUosSUFBYyxHQUFwQixFQUEwQjtBQUN6QixNQUFLLENBQUwsSUFBVyxTQUFVLENBQVYsQ0FBWCxDQUR5QjtFQUExQjs7QUFJQSxRQUFPLEdBQVAsQ0FoQitCO0NBQXpCIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBEZWNvcmF0b3I6IEBtb25hZGljXG4gKlxuICogRGVjbGFyZSBhIG1ldGhvZCB0aGF0IGFjdHMgYXMgYSBtb25hZGljIG11dGF0b3IgLS0gY2FsbGluZyBpdCB3aWxsIG9wZXJhdGUgb24gKGFuZCByZXR1cm4pXG4gKiBhIGNsb25lIG9mIHRoZSByZWNlaXZpbmcgb2JqZWN0IGluc3RlYWQgb2YgdGhlIHJlY2VpdmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9uYWRpYyggdGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yICkge1xuXHR2YXIgcmVhbGZ1bmMgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXHRkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oIC4uLmFyZ3MgKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyggYENsb25pbmcgZm9yIG1vbmFkaWMgbWV0aG9kICR7bmFtZX1gICk7XG5cdFx0dmFyIGR1cCA9IHRoaXMuY2xvbmUoKTtcblx0XHRjb25zb2xlLmRlYnVnKCBcIiAgY2xvbmVkOiAlby4uLiBhcHBseWluZyBtZXRob2RcIiwgZHVwICk7XG5cdFx0cmVhbGZ1bmMuYXBwbHkoIGR1cCwgYXJncyApO1xuXHRcdHJldHVybiBkdXA7XG5cdH07XG5cblx0cmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cblxuXG4vKlxuICogRXh0cmFjdGVkIGZyb20gZXM2LW1hcGlmeSBieSBKb25hdGhhbiBMaXBwcyA8amxpcHBzIChhdCkgZ21haWwuY29tPiB0byBhdm9pZFxuICogdGhlIGRlcGVuZGVuY3kgb24gVHJhY2V1ci5cbiAqXG4gKiBVc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQXBhY2hlLTIuMCBsaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmV0dXJuIGEgTWFwIGNvbnRhaW5pbmcgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNwZWNpZmllZCB7b2JqZWN0fS5cbiAqXG4gKiBAbWV0aG9kIG1hcGlmeVxuICogQHBhcmFtIHtPYmplY3QsQXJyYXl9IG9iamVjdCAgIHRoZSBvYmplY3QgdG8gY29udmVydCB0byBhIE1hcCwgb3IgYW4gQXJyYXkgb2ZcbiAqICAgICBvYmplY3RzIHRvIGNvbnZlcnQuXG4gKlxuICogQHJldHVybnMge01hcH0gIHRoZSBuZXdseS1jcmVhdGVkIE1hcCBvYmplY3QsIG9yIGFuIEFycmF5IG9mIGNvbnZlcnRlZCBNYXBcbiAqICAgICBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBpZnkoIG9iaiApIHtcblx0aWYgKCBvYmogaW5zdGFuY2VvZiBNYXAgKSB7IHJldHVybiBvYmo7IH1cblxuXHRsZXQgbSA9IG5ldyBNYXAoKTtcblxuXHRpZiAoIHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCApIHtcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0aWYgKCBvYmogaW5zdGFuY2VvZiBBcnJheSApIHtcblx0XHRsZXQgbmV3QXJyID0gW107XG5cdFx0Zm9yICggbGV0IHggb2Ygb2JqICkge1xuXHRcdFx0bmV3QXJyLnB1c2goIG1hcGlmeSh4KSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3QXJyO1xuXHR9XG5cblx0Zm9yIChsZXQgayBpbiBvYmopIHtcblx0XHRpZiAoIG9iai5oYXNPd25Qcm9wZXJ0eShrKSApIHtcblx0XHRcdG0uc2V0KCBrLCBtYXBpZnkob2JqW2tdKSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtO1xufVxuXG5cbi8qKlxuICogUmV0dXJuIGFuIE9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgb2YgdGhlIHNwZWNpZmllZCB7bWFwfSBhc1xuICogcHJvcGVydGllcy5cbiAqXG4gKiBAbWV0aG9kIGRlbWFwaWZ5XG4gKiBAcGFyYW0ge01hcCxBcnJheX0gb2JqZWN0ICAgdGhlIE1hcCB0byBjb252ZXJ0IHRvIGFuIE9iamV0LCBvciBhbiBBcnJheSBvZlxuICogICAgIE1hcHMgdG8gY29udmVydC5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAgdGhlIG5ld2x5LWNyZWF0ZWQgT2JqZWN0LCBvciBhbiBBcnJheSBvZiBjb252ZXJ0ZWQgT2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZW1hcGlmeSggbWFwICkge1xuXHRpZiAoIG1hcCBpbnN0YW5jZW9mIEFycmF5ICkge1xuXHRcdGxldCBuZXdBcnIgPSBbXTtcblx0XHRmb3IgKCBsZXQgeCBvZiBtYXAgKSB7XG5cdFx0XHRuZXdBcnIucHVzaCggZGVtYXBpZnkoeCkgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld0Fycjtcblx0fSBlbHNlIGlmICggIShtYXAgaW5zdGFuY2VvZiBNYXApICkge1xuXHRcdHJldHVybiBtYXA7XG5cdH1cblxuXHRsZXQgb2JqID0ge307XG5cdGZvciAoIGxldCBbaywgdl0gb2YgbWFwICkge1xuXHRcdG9ialsgayBdID0gZGVtYXBpZnkoIHYgKTtcblx0fVxuXG5cdHJldHVybiBvYmo7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
