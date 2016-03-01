/* -*- javascript -*- */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ValidationErrors = exports.ValidationError = exports.ServerError = exports.RequestError = exports.HTTPError = exports.NotImplementedError = undefined;

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

require("babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 *
 */

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztJQUlhLG9EQUFOLE1BQU0sbUJBQU4sU0FBa0MsS0FBbEMsQ0FBd0M7O0FBRTlDLGFBQWEsVUFBYixFQUEwQjtBQUN6QixVQUR5QjtBQUV6QixPQUFLLE9BQUwsR0FBZSxDQUFDLCtCQUFELEdBQWtDLFVBQWxDLEVBQTZDLEtBQTdDLENBQWYsQ0FGeUI7RUFBMUI7O0NBRk07SUFTTSxnQ0FBTixNQUFNLFNBQU4sU0FBd0IsS0FBeEIsQ0FBOEI7O0FBRXBDLGFBQWEsTUFBYixFQUFxQixVQUFyQixFQUFpQyxJQUFqQyxFQUF3QztBQUN2QyxRQUFPLENBQUMsR0FBRSxNQUFILEVBQVUsQ0FBVixHQUFhLFVBQWIsRUFBd0IsQ0FBL0IsRUFEdUM7QUFFdkMsT0FBSyxNQUFMLEdBQWMsTUFBZCxDQUZ1QztBQUd2QyxPQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FIdUM7QUFJdkMsT0FBSyxJQUFMLEdBQVksSUFBWixDQUp1QztFQUF4Qzs7Q0FGTTtJQVlNLHNDQUFOLE1BQU0sWUFBTixTQUEyQixTQUEzQixDQUFxQyxFQUFyQztJQUNNLG9DQUFOLE1BQU0sV0FBTixTQUEwQixTQUExQixDQUFvQyxFQUFwQztJQUVNLDRDQUFOLE1BQU0sZUFBTixTQUE4QixLQUE5QixDQUFvQyxFQUFwQzs7Ozs7O0lBTU0sOENBQU4sTUFBTSxnQkFBTixDQUF1Qjs7QUFFN0IsZUFBYztBQUNiLE9BQUssUUFBTCxHQUFnQixtQkFBaEIsQ0FEYTtFQUFkOztBQUtBLEtBQUksTUFBSixHQUFhO0FBQ1osTUFBSSxTQUFTLEVBQVQ7O0FBRFEsT0FHTixJQUFJLEtBQUosSUFBYSxLQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW5CLEVBQTBDLE9BQU8sSUFBUCxDQUFhLEtBQWIsRUFBMUM7O0FBRUEsU0FBTyxNQUFQLENBTFk7RUFBYjs7QUFTQSxLQUFJLFlBQUosR0FBbUI7QUFDbEIsTUFBSSxXQUFXLEVBQVgsQ0FEYztBQUVsQixPQUFLLElBQUksQ0FBQyxLQUFELEVBQVEsTUFBUixDQUFKLElBQXVCLEtBQUssUUFBTCxFQUFnQjtBQUMzQyxZQUFTLElBQVQsQ0FBZSxDQUFDLEdBQUUsS0FBSCxFQUFTLENBQVQsR0FBWSxNQUFaLEVBQW1CLENBQWxDLEVBRDJDO0dBQTVDOztBQUlBLFNBQU8sUUFBUCxDQU5rQjtFQUFuQjs7QUFVQSxLQUFJLElBQUosR0FBVztBQUNWLFNBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQURHO0VBQVg7O0FBS0EsS0FBSyxLQUFMLEVBQVksTUFBWixFQUFxQjtBQUNwQixPQUFLLFFBQUwsQ0FBYyxHQUFkLENBQW1CLEtBQW5CLEVBQTBCLE1BQTFCLEVBRG9CO0VBQXJCOztBQUtBLFdBQVU7QUFDVCxTQUFTLEtBQUssSUFBTCxLQUFjLENBQWQsQ0FEQTtFQUFWOztDQXBDTSIsImZpbGUiOiJlcnJvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtKi0gamF2YXNjcmlwdCAtKi0gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJztcblxuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cblx0Y29uc3RydWN0b3IoIG1ldGhvZG5hbWUgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgTm8gaW1wbGVtZW50YXRpb24gcHJvdmlkZWQgZm9yICR7bWV0aG9kbmFtZX0oLi4uKWA7XG5cdH1cblxufVxuXG5leHBvcnQgY2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG5cdGNvbnN0cnVjdG9yKCBzdGF0dXMsIHN0YXR1c1RleHQsIGJvZHkgKSB7XG5cdFx0c3VwZXIoIGAke3N0YXR1c30gJHtzdGF0dXNUZXh0fWAgKTtcblx0XHR0aGlzLnN0YXR1cyA9IHN0YXR1cztcblx0XHR0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0O1xuXHRcdHRoaXMuYm9keSA9IGJvZHk7XG5cdH1cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBIVFRQRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEhUVFBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRXJyb3JzIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmZhaWx1cmVzID0gbmV3IE1hcCgpO1xuXHR9XG5cblxuXHRnZXQgZmllbGRzKCkge1xuXHRcdHZhciBmaWVsZHMgPSBbXTtcblx0XHQvLyA6RklYTUU6IFVzZSBhbiBBcnJheSBjb21wcmVoZW5zaW9uIG9uY2UgdGhvc2UgYXJlIHN0YWJsZVxuXHRcdGZvciAoIGxldCBmaWVsZCBvZiB0aGlzLmZhaWx1cmVzLmtleXMoKSApIGZpZWxkcy5wdXNoKCBmaWVsZCApO1xuXG5cdFx0cmV0dXJuIGZpZWxkcztcblx0fVxuXG5cblx0Z2V0IGZ1bGxNZXNzYWdlcygpIHtcblx0XHR2YXIgbWVzc2FnZXMgPSBbXTtcblx0XHRmb3IoIGxldCBbZmllbGQsIHJlYXNvbl0gb2YgdGhpcy5mYWlsdXJlcyApIHtcblx0XHRcdG1lc3NhZ2VzLnB1c2goIGAke2ZpZWxkfSAke3JlYXNvbn1gICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lc3NhZ2VzO1xuXHR9XG5cblxuXHRnZXQgc2l6ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5mYWlsdXJlcy5zaXplO1xuXHR9XG5cblxuXHRhZGQoIGZpZWxkLCByZWFzb24gKSB7XG5cdFx0dGhpcy5mYWlsdXJlcy5zZXQoIGZpZWxkLCByZWFzb24gKTtcblx0fVxuXG5cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gKCB0aGlzLnNpemUgPT09IDAgKTtcblx0fVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
