define(["exports", "babel-runtime/core-js/map", "babel/polyfill"], function (exports, _map) {
	/* -*- javascript -*- */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ValidationErrors = exports.ValidationError = exports.ServerError = exports.RequestError = exports.HTTPError = exports.NotImplementedError = undefined;

	var _map2 = _interopRequireDefault(_map);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let NotImplementedError = exports.NotImplementedError = class NotImplementedError extends Error {

		constructor(methodname) {
			super();
			this.message = `No implementation provided for ${ methodname }(...)`;
		}

	};
	let HTTPError = exports.HTTPError = class HTTPError extends Error {

		constructor(status, statusText, body) {
			super(`${ status } ${ statusText }`);
			this.status = status;
			this.statusText = statusText;
			this.body = body;
		}

	};
	let RequestError = exports.RequestError = class RequestError extends HTTPError {};
	let ServerError = exports.ServerError = class ServerError extends HTTPError {};
	let ValidationError = exports.ValidationError = class ValidationError extends Error {};
	let ValidationErrors = exports.ValidationErrors = class ValidationErrors {

		constructor() {
			this.failures = new _map2.default();
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7S0FJYSxvREFBTixNQUFNLG1CQUFOLFNBQWtDLEtBQWxDLENBQXdDOztBQUU5QyxjQUFhLFVBQWIsRUFBMEI7QUFDekIsV0FEeUI7QUFFekIsUUFBSyxPQUFMLEdBQWUsQ0FBQywrQkFBRCxHQUFrQyxVQUFsQyxFQUE2QyxLQUE3QyxDQUFmLENBRnlCO0dBQTFCOztFQUZNO0tBU00sZ0NBQU4sTUFBTSxTQUFOLFNBQXdCLEtBQXhCLENBQThCOztBQUVwQyxjQUFhLE1BQWIsRUFBcUIsVUFBckIsRUFBaUMsSUFBakMsRUFBd0M7QUFDdkMsU0FBTyxDQUFDLEdBQUUsTUFBSCxFQUFVLENBQVYsR0FBYSxVQUFiLEVBQXdCLENBQS9CLEVBRHVDO0FBRXZDLFFBQUssTUFBTCxHQUFjLE1BQWQsQ0FGdUM7QUFHdkMsUUFBSyxVQUFMLEdBQWtCLFVBQWxCLENBSHVDO0FBSXZDLFFBQUssSUFBTCxHQUFZLElBQVosQ0FKdUM7R0FBeEM7O0VBRk07S0FZTSxzQ0FBTixNQUFNLFlBQU4sU0FBMkIsU0FBM0IsQ0FBcUMsRUFBckM7S0FDTSxvQ0FBTixNQUFNLFdBQU4sU0FBMEIsU0FBMUIsQ0FBb0MsRUFBcEM7S0FFTSw0Q0FBTixNQUFNLGVBQU4sU0FBOEIsS0FBOUIsQ0FBb0MsRUFBcEM7S0FNTSw4Q0FBTixNQUFNLGdCQUFOLENBQXVCOztBQUU3QixnQkFBYztBQUNiLFFBQUssUUFBTCxHQUFnQixtQkFBaEIsQ0FEYTtHQUFkOztBQUtBLE1BQUksTUFBSixHQUFhO0FBQ1osT0FBSSxTQUFTLEVBQVQ7O0FBRFEsUUFHTixJQUFJLEtBQUosSUFBYSxLQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW5CLEVBQTBDLE9BQU8sSUFBUCxDQUFhLEtBQWIsRUFBMUM7O0FBRUEsVUFBTyxNQUFQLENBTFk7R0FBYjs7QUFTQSxNQUFJLFlBQUosR0FBbUI7QUFDbEIsT0FBSSxXQUFXLEVBQVgsQ0FEYztBQUVsQixRQUFLLElBQUksQ0FBQyxLQUFELEVBQVEsTUFBUixDQUFKLElBQXVCLEtBQUssUUFBTCxFQUFnQjtBQUMzQyxhQUFTLElBQVQsQ0FBZSxDQUFDLEdBQUUsS0FBSCxFQUFTLENBQVQsR0FBWSxNQUFaLEVBQW1CLENBQWxDLEVBRDJDO0lBQTVDOztBQUlBLFVBQU8sUUFBUCxDQU5rQjtHQUFuQjs7QUFVQSxNQUFJLElBQUosR0FBVztBQUNWLFVBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQURHO0dBQVg7O0FBS0EsTUFBSyxLQUFMLEVBQVksTUFBWixFQUFxQjtBQUNwQixRQUFLLFFBQUwsQ0FBYyxHQUFkLENBQW1CLEtBQW5CLEVBQTBCLE1BQTFCLEVBRG9CO0dBQXJCOztBQUtBLFlBQVU7QUFDVCxVQUFTLEtBQUssSUFBTCxLQUFjLENBQWQsQ0FEQTtHQUFWOztFQXBDTSIsImZpbGUiOiJlcnJvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtKi0gamF2YXNjcmlwdCAtKi0gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJztcblxuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cblx0Y29uc3RydWN0b3IoIG1ldGhvZG5hbWUgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgTm8gaW1wbGVtZW50YXRpb24gcHJvdmlkZWQgZm9yICR7bWV0aG9kbmFtZX0oLi4uKWA7XG5cdH1cblxufVxuXG5leHBvcnQgY2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG5cdGNvbnN0cnVjdG9yKCBzdGF0dXMsIHN0YXR1c1RleHQsIGJvZHkgKSB7XG5cdFx0c3VwZXIoIGAke3N0YXR1c30gJHtzdGF0dXNUZXh0fWAgKTtcblx0XHR0aGlzLnN0YXR1cyA9IHN0YXR1cztcblx0XHR0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0O1xuXHRcdHRoaXMuYm9keSA9IGJvZHk7XG5cdH1cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEhUVFBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRXJyb3JzIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmZhaWx1cmVzID0gbmV3IE1hcCgpO1xuXHR9XG5cblxuXHRnZXQgZmllbGRzKCkge1xuXHRcdHZhciBmaWVsZHMgPSBbXTtcblx0XHQvLyA6RklYTUU6IFVzZSBhbiBBcnJheSBjb21wcmVoZW5zaW9uIG9uY2UgdGhvc2UgYXJlIHN0YWJsZVxuXHRcdGZvciAoIGxldCBmaWVsZCBvZiB0aGlzLmZhaWx1cmVzLmtleXMoKSApIGZpZWxkcy5wdXNoKCBmaWVsZCApO1xuXG5cdFx0cmV0dXJuIGZpZWxkcztcblx0fVxuXG5cblx0Z2V0IGZ1bGxNZXNzYWdlcygpIHtcblx0XHR2YXIgbWVzc2FnZXMgPSBbXTtcblx0XHRmb3IoIGxldCBbZmllbGQsIHJlYXNvbl0gb2YgdGhpcy5mYWlsdXJlcyApIHtcblx0XHRcdG1lc3NhZ2VzLnB1c2goIGAke2ZpZWxkfSAke3JlYXNvbn1gICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lc3NhZ2VzO1xuXHR9XG5cblxuXHRnZXQgc2l6ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5mYWlsdXJlcy5zaXplO1xuXHR9XG5cblxuXHRhZGQoIGZpZWxkLCByZWFzb24gKSB7XG5cdFx0dGhpcy5mYWlsdXJlcy5zZXQoIGZpZWxkLCByZWFzb24gKTtcblx0fVxuXG5cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gKCB0aGlzLnNpemUgPT09IDAgKTtcblx0fVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
