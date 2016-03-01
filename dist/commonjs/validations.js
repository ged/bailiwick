/* -*- javascript -*- */
"use strict";

/**
 * Decorator: @validator
 * Marks the decorated method as a validator
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

exports.validator = validator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validator(field) {
	return function decorator(target, name, descriptor) {
		var methodBody = descriptor.value;

		if (!target.validators) {
			target.validators = new _map2.default();
		}

		descriptor.value = function () {
			return new _promise2.default((resolve, reject) => {
				try {
					resolve(methodBody.apply(this));
				} catch (e) {
					reject([field, e.message || e]);
				}
			});
		};
		target.validators.set(field, descriptor.value);

		return descriptor;
	};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQU1nQjs7OztBQUFULFNBQVMsU0FBVCxDQUFvQixLQUFwQixFQUE0QjtBQUNsQyxRQUFPLFNBQVMsU0FBVCxDQUFvQixNQUFwQixFQUE0QixJQUE1QixFQUFrQyxVQUFsQyxFQUErQztBQUNyRCxNQUFJLGFBQWEsV0FBVyxLQUFYLENBRG9DOztBQUdyRCxNQUFLLENBQUMsT0FBTyxVQUFQLEVBQW9CO0FBQ3pCLFVBQU8sVUFBUCxHQUFvQixtQkFBcEIsQ0FEeUI7R0FBMUI7O0FBSUEsYUFBVyxLQUFYLEdBQW1CLFlBQVc7QUFDN0IsVUFBTyxzQkFBYSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3hDLFFBQUk7QUFDSCxhQUFTLFdBQVcsS0FBWCxDQUFpQixJQUFqQixDQUFULEVBREc7S0FBSixDQUVFLE9BQU8sQ0FBUCxFQUFXO0FBQ1osWUFBTyxDQUFFLEtBQUYsRUFBUyxFQUFFLE9BQUYsSUFBYSxDQUFiLENBQWhCLEVBRFk7S0FBWDtJQUhpQixDQUFwQixDQUQ2QjtHQUFYLENBUGtDO0FBZ0JyRCxTQUFPLFVBQVAsQ0FBa0IsR0FBbEIsQ0FBdUIsS0FBdkIsRUFBOEIsV0FBVyxLQUFYLENBQTlCLENBaEJxRDs7QUFrQnJELFNBQU8sVUFBUCxDQWxCcUQ7RUFBL0MsQ0FEMkI7Q0FBNUIiLCJmaWxlIjoidmFsaWRhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtKi0gamF2YXNjcmlwdCAtKi0gKi9cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIERlY29yYXRvcjogQHZhbGlkYXRvclxuICogTWFya3MgdGhlIGRlY29yYXRlZCBtZXRob2QgYXMgYSB2YWxpZGF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRvciggZmllbGQgKSB7XG5cdHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IoIHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvciApIHtcblx0XHR2YXIgbWV0aG9kQm9keSA9IGRlc2NyaXB0b3IudmFsdWU7XG5cblx0XHRpZiAoICF0YXJnZXQudmFsaWRhdG9ycyApIHtcblx0XHRcdHRhcmdldC52YWxpZGF0b3JzID0gbmV3IE1hcCgpO1xuXHRcdH1cblxuXHRcdGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc29sdmUoIG1ldGhvZEJvZHkuYXBwbHkodGhpcykgKTtcblx0XHRcdFx0fSBjYXRjaCggZSApIHtcblx0XHRcdFx0XHRyZWplY3QoWyBmaWVsZCwgZS5tZXNzYWdlIHx8IGUgXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0dGFyZ2V0LnZhbGlkYXRvcnMuc2V0KCBmaWVsZCwgZGVzY3JpcHRvci52YWx1ZSApO1xuXG5cdFx0cmV0dXJuIGRlc2NyaXB0b3I7XG5cdH07XG59XG5cblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
