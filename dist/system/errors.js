/* -*- javascript -*- */
"use strict";

System.register(["babel-runtime/core-js/map", "babel/polyfill"], function (_export, _context) {
	var _Map;

	return {
		setters: [function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}, function (_babelPolyfill) {}],
		execute: function () {
			let NotImplementedError = class NotImplementedError extends Error {

				constructor(methodname) {
					super();
					this.message = `No implementation provided for ${ methodname }(...)`;
				}

			};

			_export("NotImplementedError", NotImplementedError);

			let HTTPError = class HTTPError extends Error {

				constructor(status, statusText, body) {
					super(`${ status } ${ statusText }`);
					this.status = status;
					this.statusText = statusText;
					this.body = body;
				}

			};

			_export("HTTPError", HTTPError);

			let RequestError = class RequestError extends HTTPError {};

			_export("RequestError", RequestError);

			let ServerError = class ServerError extends HTTPError {};

			_export("ServerError", ServerError);

			let ValidationError = class ValidationError extends Error {};

			_export("ValidationError", ValidationError);

			let ValidationErrors = class ValidationErrors {

				constructor() {
					this.failures = new _Map();
				}

				get fields() {
					var fields = [];
					// :FIXME: Use an Array comprehension once those are stable
					for (let field of this.failures.keys()) fields.push(field);

					return fields;
				}

				get fullMessages() {
					var messages = [];
					for (let [field, reason] of this.failures) {
						messages.push(`${ field } ${ reason }`);
					}

					return messages;
				}

				get size() {
					return this.failures.size;
				}

				add(field, reason) {
					this.failures.set(field, reason);
				}

				isEmpty() {
					return this.size === 0;
				}

			};

			_export("ValidationErrors", ValidationErrors);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7T0FJYSxzQkFBTixNQUFNLG1CQUFOLFNBQWtDLEtBQWxDLENBQXdDOztBQUU5QyxnQkFBYSxVQUFiLEVBQTBCO0FBQ3pCLGFBRHlCO0FBRXpCLFVBQUssT0FBTCxHQUFlLENBQUMsK0JBQUQsR0FBa0MsVUFBbEMsRUFBNkMsS0FBN0MsQ0FBZixDQUZ5QjtLQUExQjs7SUFGTTs7OztPQVNNLFlBQU4sTUFBTSxTQUFOLFNBQXdCLEtBQXhCLENBQThCOztBQUVwQyxnQkFBYSxNQUFiLEVBQXFCLFVBQXJCLEVBQWlDLElBQWpDLEVBQXdDO0FBQ3ZDLFdBQU8sQ0FBQyxHQUFFLE1BQUgsRUFBVSxDQUFWLEdBQWEsVUFBYixFQUF3QixDQUEvQixFQUR1QztBQUV2QyxVQUFLLE1BQUwsR0FBYyxNQUFkLENBRnVDO0FBR3ZDLFVBQUssVUFBTCxHQUFrQixVQUFsQixDQUh1QztBQUl2QyxVQUFLLElBQUwsR0FBWSxJQUFaLENBSnVDO0tBQXhDOztJQUZNOzs7O09BWU0sZUFBTixNQUFNLFlBQU4sU0FBMkIsU0FBM0IsQ0FBcUMsRUFBckM7Ozs7T0FDTSxjQUFOLE1BQU0sV0FBTixTQUEwQixTQUExQixDQUFvQyxFQUFwQzs7OztPQUVNLGtCQUFOLE1BQU0sZUFBTixTQUE4QixLQUE5QixDQUFvQyxFQUFwQzs7OztPQU1NLG1CQUFOLE1BQU0sZ0JBQU4sQ0FBdUI7O0FBRTdCLGtCQUFjO0FBQ2IsVUFBSyxRQUFMLEdBQWdCLFVBQWhCLENBRGE7S0FBZDs7QUFLQSxRQUFJLE1BQUosR0FBYTtBQUNaLFNBQUksU0FBUyxFQUFUOztBQURRLFVBR04sSUFBSSxLQUFKLElBQWEsS0FBSyxRQUFMLENBQWMsSUFBZCxFQUFuQixFQUEwQyxPQUFPLElBQVAsQ0FBYSxLQUFiLEVBQTFDOztBQUVBLFlBQU8sTUFBUCxDQUxZO0tBQWI7O0FBU0EsUUFBSSxZQUFKLEdBQW1CO0FBQ2xCLFNBQUksV0FBVyxFQUFYLENBRGM7QUFFbEIsVUFBSyxJQUFJLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FBSixJQUF1QixLQUFLLFFBQUwsRUFBZ0I7QUFDM0MsZUFBUyxJQUFULENBQWUsQ0FBQyxHQUFFLEtBQUgsRUFBUyxDQUFULEdBQVksTUFBWixFQUFtQixDQUFsQyxFQUQyQztNQUE1Qzs7QUFJQSxZQUFPLFFBQVAsQ0FOa0I7S0FBbkI7O0FBVUEsUUFBSSxJQUFKLEdBQVc7QUFDVixZQUFPLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FERztLQUFYOztBQUtBLFFBQUssS0FBTCxFQUFZLE1BQVosRUFBcUI7QUFDcEIsVUFBSyxRQUFMLENBQWMsR0FBZCxDQUFtQixLQUFuQixFQUEwQixNQUExQixFQURvQjtLQUFyQjs7QUFLQSxjQUFVO0FBQ1QsWUFBUyxLQUFLLElBQUwsS0FBYyxDQUFkLENBREE7S0FBVjs7SUFwQ00iLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICdiYWJlbC9wb2x5ZmlsbCc7XG5cbmV4cG9ydCBjbGFzcyBOb3RJbXBsZW1lbnRlZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG5cdGNvbnN0cnVjdG9yKCBtZXRob2RuYW1lICkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE5vIGltcGxlbWVudGF0aW9uIHByb3ZpZGVkIGZvciAke21ldGhvZG5hbWV9KC4uLilgO1xuXHR9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEVycm9yIHtcblxuXHRjb25zdHJ1Y3Rvciggc3RhdHVzLCBzdGF0dXNUZXh0LCBib2R5ICkge1xuXHRcdHN1cGVyKCBgJHtzdGF0dXN9ICR7c3RhdHVzVGV4dH1gICk7XG5cdFx0dGhpcy5zdGF0dXMgPSBzdGF0dXM7XG5cdFx0dGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dDtcblx0XHR0aGlzLmJvZHkgPSBib2R5O1xuXHR9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdEVycm9yIGV4dGVuZHMgSFRUUEVycm9yIHt9XG5leHBvcnQgY2xhc3MgU2VydmVyRXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3Ige31cblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHt9XG5cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9ycyB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5mYWlsdXJlcyA9IG5ldyBNYXAoKTtcblx0fVxuXG5cblx0Z2V0IGZpZWxkcygpIHtcblx0XHR2YXIgZmllbGRzID0gW107XG5cdFx0Ly8gOkZJWE1FOiBVc2UgYW4gQXJyYXkgY29tcHJlaGVuc2lvbiBvbmNlIHRob3NlIGFyZSBzdGFibGVcblx0XHRmb3IgKCBsZXQgZmllbGQgb2YgdGhpcy5mYWlsdXJlcy5rZXlzKCkgKSBmaWVsZHMucHVzaCggZmllbGQgKTtcblxuXHRcdHJldHVybiBmaWVsZHM7XG5cdH1cblxuXG5cdGdldCBmdWxsTWVzc2FnZXMoKSB7XG5cdFx0dmFyIG1lc3NhZ2VzID0gW107XG5cdFx0Zm9yKCBsZXQgW2ZpZWxkLCByZWFzb25dIG9mIHRoaXMuZmFpbHVyZXMgKSB7XG5cdFx0XHRtZXNzYWdlcy5wdXNoKCBgJHtmaWVsZH0gJHtyZWFzb259YCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBtZXNzYWdlcztcblx0fVxuXG5cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmFpbHVyZXMuc2l6ZTtcblx0fVxuXG5cblx0YWRkKCBmaWVsZCwgcmVhc29uICkge1xuXHRcdHRoaXMuZmFpbHVyZXMuc2V0KCBmaWVsZCwgcmVhc29uICk7XG5cdH1cblxuXG5cdGlzRW1wdHkoKSB7XG5cdFx0cmV0dXJuICggdGhpcy5zaXplID09PSAwICk7XG5cdH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
