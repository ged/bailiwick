/* -*- javascript -*- */
/* eslint-disable no-unused-vars */
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RESTService = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _construct = require('babel-runtime/core-js/reflect/construct');

var _construct2 = _interopRequireDefault(_construct);

var _desc, _value, _class;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

require('fetch');

var _datastore = require('./datastore');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

/**
 * REST service datastore that uses the fetch API
 *
 * @class RESTService
 * @constructor
 *
 */
let RESTService = exports.RESTService = (_class = class RESTService extends _datastore.Datastore {

	constructor(baseUrl = 'http://localhost/') {
		super();

		if (typeof fetch === 'undefined') {
			throw new Error('RESTService requires a fetch polyfill');
		}

		if (!baseUrl.endsWith('/')) {
			baseUrl = baseUrl + '/';
		}

		this.baseUrl = baseUrl;
		this.httpClient = { fetch };
	}

	/**
  * Return a copy of the reciving object.
  */
	clone() {
		var newObj = (0, _construct2.default)(this.constructor, [this.baseUrl]);
		newObj.httpClient = this.httpClient;
		return newObj;
	}

	/**
  * Return a clone of the original datastore that uses the {newHttpClient} instead of
  * whatever it was using before.
  */

	forUrl(newBaseUrl) {
		this.baseUrl = newBaseUrl;
	}

	/**
  * Return a clone of the original datastore that uses the {newHttpClient} instead of
  * whatever it was using before.
  */

	using(newHttpClient) {
		this.httpClient = newHttpClient;
	}

	/**
  * Send an request with the specified {verb} via the HTTP client to the given {url},
  * serializing the {body} (if given) as JSON, and de-serializing the result (if it's a
  * JSON response).
  */
	sendJsonRequest(url, method = 'GET', body = null, headers = {}) {
		let info = {
			method,
			body,
			headers
		};

		if (!(url.startsWith('http:') || url.startsWith('https:'))) {
			if (url.startsWith('/')) {
				url = url.slice(1);
			}
			url = `${ this.baseUrl }${ url }`;
		}

		if (info.body && typeof body !== 'string') {
			info.body = (0, _stringify2.default)(body);
			info.headers['Content-type'] = "application/json; charset=UTF-8";
		}

		return this.httpClient.fetch(url, info).then(response => {
			let mediatype = response.headers.get('content-type');
			if (mediatype.startsWith('application/json')) {
				console.debug("Got JSON response; deserializing.");
				return response.json();
			} else {
				console.debug("Got a %s response; using the raw text.", mediatype);
				return response.text();
			}
		});
	}

	/**
  * Fetch a single instance of the specified {type} with the given {id}, and return
  * a Promise that resolves to it.
  */
	getInstance(type, id) {
		var uri = type.uri;
		if (id) {
			uri += '/' + id.toString();
		}
		return this.sendJsonRequest(uri);
	}

	/**
  * Fetch a collection of the specified object {type} that matches the specified
  * {criteria} (a Criteria object), and return a Promise that resolves to the resulting
  * Array.
  */
	getCollection(type, criteria) {
		var uri = criteria.location || type.uri;
		var params = this.makeParamsFromCriteria(criteria);
		var queryString = this.queryStringFromParams(params);

		console.info("GET %s params: %o", uri, params);
		if (queryString !== '') {
			uri += '?' + queryString;
		}

		return this.sendJsonRequest(uri);
	}

	/**
  * Store a new instance of the specified {type} with the given {data} via the REST service,
  * and return a Promise that resolves to the result.
  */
	store(type, data) {
		return this.sendJsonRequest(type.uri, 'POST', data);
	}

	/**
  * Update the instance of the specified {type} with the given {id} via the REST
  * service using the specified {data}, and return a Promise that resolves to the result.
  */
	update(type, id, data) {
		var url = `${ type.uri }/${ id }`;
		return this.sendJsonRequest(uri, 'POST', data);
	}

	/**
  * Replace the data for the instance of the specified {type} with the given {id} via the REST
  * service using the specified {data}, and return a Promise that resolves to the result.
  */
	replace(type, id, data) {
		var uri = `${ type.uri }/${ id }`;
		return this.sendJsonRequest(uri, 'PUT', data);
	}

	/**
  * Delete the instance of the specified {type} with the given {id} via the REST service and
  * return a Promise that resolves to the result.
  */
	remove(type, id) {
		var uri = `${ type.uri }/${ id }`;
		return this.sendJsonRequest(uri, 'DELETE');
	}

	/*
  * Utility functions
  */

	/**
  * Turn the specified {criteria} into a Map of parameters suitable for passing in an Xhr
  * request.
  */
	makeParamsFromCriteria(criteria) {
		if (!criteria) {
			return null;
		}

		var params = new _map2.default();

		for (let [key, val] of criteria.filterClauses) {
			console.debug(`Adding parameter ${ key }=${ val } from criteria's filter clauses.`);
			params.set(key, val);
		}

		if (criteria.maxResultCount) {
			params.set('limit', criteria.maxResultCount);
		}
		if (criteria.resultOffset) {
			params.set('offset', criteria.resultOffset);
		}

		return params;
	}

	/**
  * Turn the specified {params} Object into a URL-encoded query string.
  */
	queryStringFromParams(params) {
		console.debug("Making query string from params: %o", params);

		if (!params) {
			return '';
		}

		let paramMap = (0, _utils.mapify)(params);
		console.debug("Param map is: %o", paramMap);

		let pairs = [];
		for (let [key, val] of paramMap) {
			let encKey = encodeURIComponent(key);
			let encVal = encodeURIComponent(val);
			console.debug("  adding pair: %s=%s", encKey, encVal);
			pairs.push(`${ encKey }=${ encVal }`);
		}

		console.debug("Returning query string of %d param pairs.", pairs.length);
		return pairs.join('&');
	}

}, (_applyDecoratedDescriptor(_class.prototype, 'forUrl', [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'forUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'using', [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'using'), _class.prototype)), _class);
//# sourceMappingURL=data:application/json;base64,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UixDQUFYLENBTDJCO0FBTS9CLFVBQVEsS0FBUixDQUFlLGtCQUFmLEVBQW1DLFFBQW5DLEVBTitCOztBQVEvQixNQUFJLFFBQVEsRUFBUixDQVIyQjtBQVMvQixPQUFNLElBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFKLElBQWtCLFFBQXhCLEVBQW1DO0FBQ2xDLE9BQUksU0FBUyxtQkFBb0IsR0FBcEIsQ0FBVCxDQUQ4QjtBQUVsQyxPQUFJLFNBQVMsbUJBQW9CLEdBQXBCLENBQVQsQ0FGOEI7QUFHbEMsV0FBUSxLQUFSLENBQWUsc0JBQWYsRUFBdUMsTUFBdkMsRUFBK0MsTUFBL0MsRUFIa0M7QUFJbEMsU0FBTSxJQUFOLENBQVksQ0FBQyxHQUFFLE1BQUgsRUFBVSxDQUFWLEdBQWEsTUFBYixFQUFvQixDQUFoQyxFQUprQztHQUFuQzs7QUFPQSxVQUFRLEtBQVIsQ0FBZSwyQ0FBZixFQUE0RCxNQUFNLE1BQU4sQ0FBNUQsQ0FoQitCO0FBaUIvQixTQUFPLE1BQU0sSUFBTixDQUFZLEdBQVosQ0FBUCxDQWpCK0I7RUFBaEM7O0NBckxNIiwiZmlsZSI6InJlc3Qtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0ICdmZXRjaCc7XG5cbmltcG9ydCB7RGF0YXN0b3JlfSBmcm9tICcuL2RhdGFzdG9yZSc7XG5pbXBvcnQge21hcGlmeSwgbW9uYWRpY30gZnJvbSAnLi91dGlscyc7XG5cblxuLyoqXG4gKiBSRVNUIHNlcnZpY2UgZGF0YXN0b3JlIHRoYXQgdXNlcyB0aGUgZmV0Y2ggQVBJXG4gKlxuICogQGNsYXNzIFJFU1RTZXJ2aWNlXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSRVNUU2VydmljZSBleHRlbmRzIERhdGFzdG9yZSB7XG5cblx0Y29uc3RydWN0b3IoIGJhc2VVcmw9J2h0dHA6Ly9sb2NhbGhvc3QvJyApIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignUkVTVFNlcnZpY2UgcmVxdWlyZXMgYSBmZXRjaCBwb2x5ZmlsbCcpO1xuXHRcdH1cblxuXHRcdGlmICggIWJhc2VVcmwuZW5kc1dpdGgoJy8nKSApIHtcblx0XHRcdGJhc2VVcmwgPSBiYXNlVXJsICsgJy8nO1xuXHRcdH1cblxuXHRcdHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG5cdFx0dGhpcy5odHRwQ2xpZW50ID0geyBmZXRjaCB9O1xuXHR9XG5cblxuXHQvKipcblx0ICogUmV0dXJuIGEgY29weSBvZiB0aGUgcmVjaXZpbmcgb2JqZWN0LlxuXHQgKi9cblx0Y2xvbmUoKSB7XG5cdFx0dmFyIG5ld09iaiA9IFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLmNvbnN0cnVjdG9yLCBbdGhpcy5iYXNlVXJsXSApO1xuXHRcdG5ld09iai5odHRwQ2xpZW50ID0gdGhpcy5odHRwQ2xpZW50O1xuXHRcdHJldHVybiBuZXdPYmo7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGRhdGFzdG9yZSB0aGF0IHVzZXMgdGhlIHtuZXdIdHRwQ2xpZW50fSBpbnN0ZWFkIG9mXG5cdCAqIHdoYXRldmVyIGl0IHdhcyB1c2luZyBiZWZvcmUuXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRmb3JVcmwoIG5ld0Jhc2VVcmwgKSB7XG5cdFx0dGhpcy5iYXNlVXJsID0gbmV3QmFzZVVybDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBkYXRhc3RvcmUgdGhhdCB1c2VzIHRoZSB7bmV3SHR0cENsaWVudH0gaW5zdGVhZCBvZlxuXHQgKiB3aGF0ZXZlciBpdCB3YXMgdXNpbmcgYmVmb3JlLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0dXNpbmcoIG5ld0h0dHBDbGllbnQgKSB7XG5cdFx0dGhpcy5odHRwQ2xpZW50ID0gbmV3SHR0cENsaWVudDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFNlbmQgYW4gcmVxdWVzdCB3aXRoIHRoZSBzcGVjaWZpZWQge3ZlcmJ9IHZpYSB0aGUgSFRUUCBjbGllbnQgdG8gdGhlIGdpdmVuIHt1cmx9LFxuXHQgKiBzZXJpYWxpemluZyB0aGUge2JvZHl9IChpZiBnaXZlbikgYXMgSlNPTiwgYW5kIGRlLXNlcmlhbGl6aW5nIHRoZSByZXN1bHQgKGlmIGl0J3MgYVxuXHQgKiBKU09OIHJlc3BvbnNlKS5cblx0ICovXG5cdHNlbmRKc29uUmVxdWVzdCggdXJsLCBtZXRob2Q9J0dFVCcsIGJvZHk9bnVsbCwgaGVhZGVycz17fSApIHtcblx0XHRsZXQgaW5mbyA9IHtcblx0XHRcdG1ldGhvZCxcblx0XHRcdGJvZHksXG5cdFx0XHRoZWFkZXJzXG5cdFx0fTtcblxuXHRcdGlmICggISh1cmwuc3RhcnRzV2l0aCgnaHR0cDonKSB8fCB1cmwuc3RhcnRzV2l0aCgnaHR0cHM6JykpICkge1xuXHRcdFx0aWYgKCB1cmwuc3RhcnRzV2l0aCgnLycpICkgeyB1cmwgPSB1cmwuc2xpY2UoMSk7IH1cblx0XHRcdHVybCA9IGAke3RoaXMuYmFzZVVybH0ke3VybH1gO1xuXHRcdH1cblxuXHRcdGlmICggaW5mby5ib2R5ICYmIHR5cGVvZiBib2R5ICE9PSAnc3RyaW5nJyApIHtcblx0XHRcdGluZm8uYm9keSA9IEpTT04uc3RyaW5naWZ5KCBib2R5ICk7XG5cdFx0XHRpbmZvLmhlYWRlcnNbICdDb250ZW50LXR5cGUnIF0gPSBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5odHRwQ2xpZW50LlxuXHRcdFx0ZmV0Y2goIHVybCwgaW5mbyApLlxuXHRcdFx0dGhlbiggcmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRsZXQgbWVkaWF0eXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoICdjb250ZW50LXR5cGUnICk7XG5cdFx0XHRcdGlmICggbWVkaWF0eXBlLnN0YXJ0c1dpdGgoJ2FwcGxpY2F0aW9uL2pzb24nKSApIHtcblx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKCBcIkdvdCBKU09OIHJlc3BvbnNlOyBkZXNlcmlhbGl6aW5nLlwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKCBcIkdvdCBhICVzIHJlc3BvbnNlOyB1c2luZyB0aGUgcmF3IHRleHQuXCIsIG1lZGlhdHlwZSApO1xuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZS50ZXh0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblxuXHQvKipcblx0ICogRmV0Y2ggYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gd2l0aCB0aGUgZ2l2ZW4ge2lkfSwgYW5kIHJldHVyblxuXHQgKiBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBpdC5cblx0ICovXG5cdGdldEluc3RhbmNlKCB0eXBlLCBpZCApIHtcblx0XHR2YXIgdXJpID0gdHlwZS51cmk7XG5cdFx0aWYgKCBpZCApIHsgdXJpICs9ICcvJyArIGlkLnRvU3RyaW5nKCk7IH1cblx0XHRyZXR1cm4gdGhpcy5zZW5kSnNvblJlcXVlc3QoIHVyaSApO1xuXHR9XG5cblxuXHQvKipcblx0ICogRmV0Y2ggYSBjb2xsZWN0aW9uIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHt0eXBlfSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZFxuXHQgKiB7Y3JpdGVyaWF9IChhIENyaXRlcmlhIG9iamVjdCksIGFuZCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlc3VsdGluZ1xuXHQgKiBBcnJheS5cblx0ICovXG5cdGdldENvbGxlY3Rpb24oIHR5cGUsIGNyaXRlcmlhICkge1xuXHRcdHZhciB1cmkgPSBjcml0ZXJpYS5sb2NhdGlvbiB8fCB0eXBlLnVyaTtcblx0XHR2YXIgcGFyYW1zID0gdGhpcy5tYWtlUGFyYW1zRnJvbUNyaXRlcmlhKCBjcml0ZXJpYSApO1xuXHRcdHZhciBxdWVyeVN0cmluZyA9IHRoaXMucXVlcnlTdHJpbmdGcm9tUGFyYW1zKCBwYXJhbXMgKTtcblxuXHRcdGNvbnNvbGUuaW5mbyggXCJHRVQgJXMgcGFyYW1zOiAlb1wiLCB1cmksIHBhcmFtcyApO1xuXHRcdGlmICggcXVlcnlTdHJpbmcgIT09ICcnICkge1xuXHRcdFx0dXJpICs9ICc/JyArIHF1ZXJ5U3RyaW5nO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdXJpICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTdG9yZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSB3aXRoIHRoZSBnaXZlbiB7ZGF0YX0gdmlhIHRoZSBSRVNUIHNlcnZpY2UsXG5cdCAqIGFuZCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlc3VsdC5cblx0ICovXG5cdHN0b3JlKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdHlwZS51cmksICdQT1NUJywgZGF0YSApO1xuXHR9XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSB3aXRoIHRoZSBnaXZlbiB7aWR9IHZpYSB0aGUgUkVTVFxuXHQgKiBzZXJ2aWNlIHVzaW5nIHRoZSBzcGVjaWZpZWQge2RhdGF9LCBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQuXG5cdCAqL1xuXHR1cGRhdGUoIHR5cGUsIGlkLCBkYXRhICkge1xuXHRcdHZhciB1cmwgPSBgJHt0eXBlLnVyaX0vJHtpZH1gO1xuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdXJpLCAnUE9TVCcsIGRhdGEgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlcGxhY2UgdGhlIGRhdGEgZm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSB3aXRoIHRoZSBnaXZlbiB7aWR9IHZpYSB0aGUgUkVTVFxuXHQgKiBzZXJ2aWNlIHVzaW5nIHRoZSBzcGVjaWZpZWQge2RhdGF9LCBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQuXG5cdCAqL1xuXHRyZXBsYWNlKCB0eXBlLCBpZCwgZGF0YSApIHtcblx0XHR2YXIgdXJpID0gYCR7dHlwZS51cml9LyR7aWR9YDtcblx0XHRyZXR1cm4gdGhpcy5zZW5kSnNvblJlcXVlc3QoIHVyaSwgJ1BVVCcsIGRhdGEgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIERlbGV0ZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gd2l0aCB0aGUgZ2l2ZW4ge2lkfSB2aWEgdGhlIFJFU1Qgc2VydmljZSBhbmRcblx0ICogcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQuXG5cdCAqL1xuXHRyZW1vdmUoIHR5cGUsIGlkICkge1xuXHRcdHZhciB1cmkgPSBgJHt0eXBlLnVyaX0vJHtpZH1gO1xuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdXJpLCAnREVMRVRFJyApO1xuXHR9XG5cblxuXHQvKlxuXHQgKiBVdGlsaXR5IGZ1bmN0aW9uc1xuXHQgKi9cblxuXHQvKipcblx0ICogVHVybiB0aGUgc3BlY2lmaWVkIHtjcml0ZXJpYX0gaW50byBhIE1hcCBvZiBwYXJhbWV0ZXJzIHN1aXRhYmxlIGZvciBwYXNzaW5nIGluIGFuIFhoclxuXHQgKiByZXF1ZXN0LlxuXHQgKi9cblx0bWFrZVBhcmFtc0Zyb21Dcml0ZXJpYSggY3JpdGVyaWEgKSB7XG5cdFx0aWYgKCAhY3JpdGVyaWEgKSB7IHJldHVybiBudWxsOyB9XG5cblx0XHR2YXIgcGFyYW1zID0gbmV3IE1hcCgpO1xuXG5cdFx0Zm9yICggbGV0IFtrZXksIHZhbF0gb2YgY3JpdGVyaWEuZmlsdGVyQ2xhdXNlcyApIHtcblx0XHRcdGNvbnNvbGUuZGVidWcoIGBBZGRpbmcgcGFyYW1ldGVyICR7a2V5fT0ke3ZhbH0gZnJvbSBjcml0ZXJpYSdzIGZpbHRlciBjbGF1c2VzLmAgKTtcblx0XHRcdHBhcmFtcy5zZXQoIGtleSwgdmFsICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjcml0ZXJpYS5tYXhSZXN1bHRDb3VudCApIHsgcGFyYW1zLnNldCggJ2xpbWl0JywgY3JpdGVyaWEubWF4UmVzdWx0Q291bnQgKTsgfVxuXHRcdGlmICggY3JpdGVyaWEucmVzdWx0T2Zmc2V0ICkgeyBwYXJhbXMuc2V0KCAnb2Zmc2V0JywgY3JpdGVyaWEucmVzdWx0T2Zmc2V0ICk7IH1cblxuXHRcdHJldHVybiBwYXJhbXM7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBUdXJuIHRoZSBzcGVjaWZpZWQge3BhcmFtc30gT2JqZWN0IGludG8gYSBVUkwtZW5jb2RlZCBxdWVyeSBzdHJpbmcuXG5cdCAqL1xuXHRxdWVyeVN0cmluZ0Zyb21QYXJhbXMoIHBhcmFtcyApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIk1ha2luZyBxdWVyeSBzdHJpbmcgZnJvbSBwYXJhbXM6ICVvXCIsIHBhcmFtcyApO1xuXG5cdFx0aWYgKCAhcGFyYW1zICkgeyByZXR1cm4gJyc7IH1cblxuXHRcdGxldCBwYXJhbU1hcCA9IG1hcGlmeSggcGFyYW1zICk7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJQYXJhbSBtYXAgaXM6ICVvXCIsIHBhcmFtTWFwICk7XG5cblx0XHRsZXQgcGFpcnMgPSBbXTtcblx0XHRmb3IgKCBsZXQgW2tleSwgdmFsXSBvZiBwYXJhbU1hcCApIHtcblx0XHRcdGxldCBlbmNLZXkgPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApO1xuXHRcdFx0bGV0IGVuY1ZhbCA9IGVuY29kZVVSSUNvbXBvbmVudCggdmFsICk7XG5cdFx0XHRjb25zb2xlLmRlYnVnKCBcIiAgYWRkaW5nIHBhaXI6ICVzPSVzXCIsIGVuY0tleSwgZW5jVmFsICk7XG5cdFx0XHRwYWlycy5wdXNoKCBgJHtlbmNLZXl9PSR7ZW5jVmFsfWAgKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmRlYnVnKCBcIlJldHVybmluZyBxdWVyeSBzdHJpbmcgb2YgJWQgcGFyYW0gcGFpcnMuXCIsIHBhaXJzLmxlbmd0aCApO1xuXHRcdHJldHVybiBwYWlycy5qb2luKCAnJicgKTtcblx0fVxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
