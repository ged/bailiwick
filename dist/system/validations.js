/* -*- javascript -*- */
"use strict";

/**
 * Decorator: @validator
 * Marks the decorated method as a validator
 */

System.register(["babel-runtime/core-js/promise", "babel-runtime/core-js/map"], function (_export, _context) {
	var _Promise, _Map;

	return {
		setters: [function (_babelRuntimeCoreJsPromise) {
			_Promise = _babelRuntimeCoreJsPromise.default;
		}, function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}],
		execute: function () {
			function validator(field) {
				return function decorator(target, name, descriptor) {
					var methodBody = descriptor.value;

					if (!target.validators) {
						target.validators = new _Map();
					}

					descriptor.value = function () {
						return new _Promise((resolve, reject) => {
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

			_export("validator", validator);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNTyxZQUFTLFNBQVQsQ0FBb0IsS0FBcEIsRUFBNEI7QUFDbEMsV0FBTyxTQUFTLFNBQVQsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUIsRUFBa0MsVUFBbEMsRUFBK0M7QUFDckQsU0FBSSxhQUFhLFdBQVcsS0FBWCxDQURvQzs7QUFHckQsU0FBSyxDQUFDLE9BQU8sVUFBUCxFQUFvQjtBQUN6QixhQUFPLFVBQVAsR0FBb0IsVUFBcEIsQ0FEeUI7TUFBMUI7O0FBSUEsZ0JBQVcsS0FBWCxHQUFtQixZQUFXO0FBQzdCLGFBQU8sYUFBYSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3hDLFdBQUk7QUFDSCxnQkFBUyxXQUFXLEtBQVgsQ0FBaUIsSUFBakIsQ0FBVCxFQURHO1FBQUosQ0FFRSxPQUFPLENBQVAsRUFBVztBQUNaLGVBQU8sQ0FBRSxLQUFGLEVBQVMsRUFBRSxPQUFGLElBQWEsQ0FBYixDQUFoQixFQURZO1FBQVg7T0FIaUIsQ0FBcEIsQ0FENkI7TUFBWCxDQVBrQztBQWdCckQsWUFBTyxVQUFQLENBQWtCLEdBQWxCLENBQXVCLEtBQXZCLEVBQThCLFdBQVcsS0FBWCxDQUE5QixDQWhCcUQ7O0FBa0JyRCxZQUFPLFVBQVAsQ0FsQnFEO0tBQS9DLENBRDJCO0lBQTVCIiwiZmlsZSI6InZhbGlkYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBEZWNvcmF0b3I6IEB2YWxpZGF0b3JcbiAqIE1hcmtzIHRoZSBkZWNvcmF0ZWQgbWV0aG9kIGFzIGEgdmFsaWRhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0b3IoIGZpZWxkICkge1xuXHRyZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKCB0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IgKSB7XG5cdFx0dmFyIG1ldGhvZEJvZHkgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG5cdFx0aWYgKCAhdGFyZ2V0LnZhbGlkYXRvcnMgKSB7XG5cdFx0XHR0YXJnZXQudmFsaWRhdG9ycyA9IG5ldyBNYXAoKTtcblx0XHR9XG5cblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXNvbHZlKCBtZXRob2RCb2R5LmFwcGx5KHRoaXMpICk7XG5cdFx0XHRcdH0gY2F0Y2goIGUgKSB7XG5cdFx0XHRcdFx0cmVqZWN0KFsgZmllbGQsIGUubWVzc2FnZSB8fCBlIF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdHRhcmdldC52YWxpZGF0b3JzLnNldCggZmllbGQsIGRlc2NyaXB0b3IudmFsdWUgKTtcblxuXHRcdHJldHVybiBkZXNjcmlwdG9yO1xuXHR9O1xufVxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
