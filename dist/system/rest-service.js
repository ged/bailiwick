/* -*- javascript -*- */
/* eslint-disable no-unused-vars */
'use strict';

System.register(['babel-runtime/core-js/object/get-own-property-descriptor', 'babel-runtime/core-js/map', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/reflect/construct', 'bluebird', 'fetch', './datastore', './utils'], function (_export, _context) {
	var _Object$getOwnPropertyDescriptor, _Map, _JSON$stringify, _Reflect$construct, Promise, Datastore, mapify, monadic;

	return {
		setters: [function (_babelRuntimeCoreJsObjectGetOwnPropertyDescriptor) {
			_Object$getOwnPropertyDescriptor = _babelRuntimeCoreJsObjectGetOwnPropertyDescriptor.default;
		}, function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}, function (_babelRuntimeCoreJsJsonStringify) {
			_JSON$stringify = _babelRuntimeCoreJsJsonStringify.default;
		}, function (_babelRuntimeCoreJsReflectConstruct) {
			_Reflect$construct = _babelRuntimeCoreJsReflectConstruct.default;
		}, function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_fetch) {}, function (_datastore) {
			Datastore = _datastore.Datastore;
		}, function (_utils) {
			mapify = _utils.mapify;
			monadic = _utils.monadic;
		}],
		execute: function () {
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

			var _desc, _value, _class;

			let RESTService = (_class = class RESTService extends Datastore {

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
					var newObj = _Reflect$construct(this.constructor, [this.baseUrl]);
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
						info.body = _JSON$stringify(body);
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

					var params = new _Map();

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

					let paramMap = mapify(params);
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

			}, (_applyDecoratedDescriptor(_class.prototype, 'forUrl', [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, 'forUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'using', [monadic], _Object$getOwnPropertyDescriptor(_class.prototype, 'using'), _class.prototype)), _class);

			_export('RESTService', RESTService);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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T0FBUSxNQUFSLENBQVgsQ0FMMkI7QUFNL0IsYUFBUSxLQUFSLENBQWUsa0JBQWYsRUFBbUMsUUFBbkMsRUFOK0I7O0FBUS9CLFNBQUksUUFBUSxFQUFSLENBUjJCO0FBUy9CLFVBQU0sSUFBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQUosSUFBa0IsUUFBeEIsRUFBbUM7QUFDbEMsVUFBSSxTQUFTLG1CQUFvQixHQUFwQixDQUFULENBRDhCO0FBRWxDLFVBQUksU0FBUyxtQkFBb0IsR0FBcEIsQ0FBVCxDQUY4QjtBQUdsQyxjQUFRLEtBQVIsQ0FBZSxzQkFBZixFQUF1QyxNQUF2QyxFQUErQyxNQUEvQyxFQUhrQztBQUlsQyxZQUFNLElBQU4sQ0FBWSxDQUFDLEdBQUUsTUFBSCxFQUFVLENBQVYsR0FBYSxNQUFiLEVBQW9CLENBQWhDLEVBSmtDO01BQW5DOztBQU9BLGFBQVEsS0FBUixDQUFlLDJDQUFmLEVBQTRELE1BQU0sTUFBTixDQUE1RCxDQWhCK0I7QUFpQi9CLFlBQU8sTUFBTSxJQUFOLENBQVksR0FBWixDQUFQLENBakIrQjtLQUFoQzs7SUFyTE0sMERBK0JMLGlKQVVBIiwiZmlsZSI6InJlc3Qtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0ICdmZXRjaCc7XG5cbmltcG9ydCB7RGF0YXN0b3JlfSBmcm9tICcuL2RhdGFzdG9yZSc7XG5pbXBvcnQge21hcGlmeSwgbW9uYWRpY30gZnJvbSAnLi91dGlscyc7XG5cblxuLyoqXG4gKiBSRVNUIHNlcnZpY2UgZGF0YXN0b3JlIHRoYXQgdXNlcyB0aGUgZmV0Y2ggQVBJXG4gKlxuICogQGNsYXNzIFJFU1RTZXJ2aWNlXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSRVNUU2VydmljZSBleHRlbmRzIERhdGFzdG9yZSB7XG5cblx0Y29uc3RydWN0b3IoIGJhc2VVcmw9J2h0dHA6Ly9sb2NhbGhvc3QvJyApIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignUkVTVFNlcnZpY2UgcmVxdWlyZXMgYSBmZXRjaCBwb2x5ZmlsbCcpO1xuXHRcdH1cblxuXHRcdGlmICggIWJhc2VVcmwuZW5kc1dpdGgoJy8nKSApIHtcblx0XHRcdGJhc2VVcmwgPSBiYXNlVXJsICsgJy8nO1xuXHRcdH1cblxuXHRcdHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG5cdFx0dGhpcy5odHRwQ2xpZW50ID0geyBmZXRjaCB9O1xuXHR9XG5cblxuXHQvKipcblx0ICogUmV0dXJuIGEgY29weSBvZiB0aGUgcmVjaXZpbmcgb2JqZWN0LlxuXHQgKi9cblx0Y2xvbmUoKSB7XG5cdFx0dmFyIG5ld09iaiA9IFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLmNvbnN0cnVjdG9yLCBbdGhpcy5iYXNlVXJsXSApO1xuXHRcdG5ld09iai5odHRwQ2xpZW50ID0gdGhpcy5odHRwQ2xpZW50O1xuXHRcdHJldHVybiBuZXdPYmo7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGRhdGFzdG9yZSB0aGF0IHVzZXMgdGhlIHtuZXdIdHRwQ2xpZW50fSBpbnN0ZWFkIG9mXG5cdCAqIHdoYXRldmVyIGl0IHdhcyB1c2luZyBiZWZvcmUuXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRmb3JVcmwoIG5ld0Jhc2VVcmwgKSB7XG5cdFx0dGhpcy5iYXNlVXJsID0gbmV3QmFzZVVybDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBkYXRhc3RvcmUgdGhhdCB1c2VzIHRoZSB7bmV3SHR0cENsaWVudH0gaW5zdGVhZCBvZlxuXHQgKiB3aGF0ZXZlciBpdCB3YXMgdXNpbmcgYmVmb3JlLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0dXNpbmcoIG5ld0h0dHBDbGllbnQgKSB7XG5cdFx0dGhpcy5odHRwQ2xpZW50ID0gbmV3SHR0cENsaWVudDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFNlbmQgYW4gcmVxdWVzdCB3aXRoIHRoZSBzcGVjaWZpZWQge3ZlcmJ9IHZpYSB0aGUgSFRUUCBjbGllbnQgdG8gdGhlIGdpdmVuIHt1cmx9LFxuXHQgKiBzZXJpYWxpemluZyB0aGUge2JvZHl9IChpZiBnaXZlbikgYXMgSlNPTiwgYW5kIGRlLXNlcmlhbGl6aW5nIHRoZSByZXN1bHQgKGlmIGl0J3MgYVxuXHQgKiBKU09OIHJlc3BvbnNlKS5cblx0ICovXG5cdHNlbmRKc29uUmVxdWVzdCggdXJsLCBtZXRob2Q9J0dFVCcsIGJvZHk9bnVsbCwgaGVhZGVycz17fSApIHtcblx0XHRsZXQgaW5mbyA9IHtcblx0XHRcdG1ldGhvZCxcblx0XHRcdGJvZHksXG5cdFx0XHRoZWFkZXJzXG5cdFx0fTtcblxuXHRcdGlmICggISh1cmwuc3RhcnRzV2l0aCgnaHR0cDonKSB8fCB1cmwuc3RhcnRzV2l0aCgnaHR0cHM6JykpICkge1xuXHRcdFx0aWYgKCB1cmwuc3RhcnRzV2l0aCgnLycpICkgeyB1cmwgPSB1cmwuc2xpY2UoMSk7IH1cblx0XHRcdHVybCA9IGAke3RoaXMuYmFzZVVybH0ke3VybH1gO1xuXHRcdH1cblxuXHRcdGlmICggaW5mby5ib2R5ICYmIHR5cGVvZiBib2R5ICE9PSAnc3RyaW5nJyApIHtcblx0XHRcdGluZm8uYm9keSA9IEpTT04uc3RyaW5naWZ5KCBib2R5ICk7XG5cdFx0XHRpbmZvLmhlYWRlcnNbICdDb250ZW50LXR5cGUnIF0gPSBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5odHRwQ2xpZW50LlxuXHRcdFx0ZmV0Y2goIHVybCwgaW5mbyApLlxuXHRcdFx0dGhlbiggcmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRsZXQgbWVkaWF0eXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoICdjb250ZW50LXR5cGUnICk7XG5cdFx0XHRcdGlmICggbWVkaWF0eXBlLnN0YXJ0c1dpdGgoJ2FwcGxpY2F0aW9uL2pzb24nKSApIHtcblx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKCBcIkdvdCBKU09OIHJlc3BvbnNlOyBkZXNlcmlhbGl6aW5nLlwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKCBcIkdvdCBhICVzIHJlc3BvbnNlOyB1c2luZyB0aGUgcmF3IHRleHQuXCIsIG1lZGlhdHlwZSApO1xuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZS50ZXh0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblxuXHQvKipcblx0ICogRmV0Y2ggYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gd2l0aCB0aGUgZ2l2ZW4ge2lkfSwgYW5kIHJldHVyblxuXHQgKiBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBpdC5cblx0ICovXG5cdGdldEluc3RhbmNlKCB0eXBlLCBpZCApIHtcblx0XHR2YXIgdXJpID0gdHlwZS51cmk7XG5cdFx0aWYgKCBpZCApIHsgdXJpICs9ICcvJyArIGlkLnRvU3RyaW5nKCk7IH1cblx0XHRyZXR1cm4gdGhpcy5zZW5kSnNvblJlcXVlc3QoIHVyaSApO1xuXHR9XG5cblxuXHQvKipcblx0ICogRmV0Y2ggYSBjb2xsZWN0aW9uIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHt0eXBlfSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZFxuXHQgKiB7Y3JpdGVyaWF9IChhIENyaXRlcmlhIG9iamVjdCksIGFuZCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlc3VsdGluZ1xuXHQgKiBBcnJheS5cblx0ICovXG5cdGdldENvbGxlY3Rpb24oIHR5cGUsIGNyaXRlcmlhICkge1xuXHRcdHZhciB1cmkgPSBjcml0ZXJpYS5sb2NhdGlvbiB8fCB0eXBlLnVyaTtcblx0XHR2YXIgcGFyYW1zID0gdGhpcy5tYWtlUGFyYW1zRnJvbUNyaXRlcmlhKCBjcml0ZXJpYSApO1xuXHRcdHZhciBxdWVyeVN0cmluZyA9IHRoaXMucXVlcnlTdHJpbmdGcm9tUGFyYW1zKCBwYXJhbXMgKTtcblxuXHRcdGNvbnNvbGUuaW5mbyggXCJHRVQgJXMgcGFyYW1zOiAlb1wiLCB1cmksIHBhcmFtcyApO1xuXHRcdGlmICggcXVlcnlTdHJpbmcgIT09ICcnICkge1xuXHRcdFx0dXJpICs9ICc/JyArIHF1ZXJ5U3RyaW5nO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdXJpICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTdG9yZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSB3aXRoIHRoZSBnaXZlbiB7ZGF0YX0gdmlhIHRoZSBSRVNUIHNlcnZpY2UsXG5cdCAqIGFuZCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlc3VsdC5cblx0ICovXG5cdHN0b3JlKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdHlwZS51cmksICdQT1NUJywgZGF0YSApO1xuXHR9XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSB3aXRoIHRoZSBnaXZlbiB7aWR9IHZpYSB0aGUgUkVTVFxuXHQgKiBzZXJ2aWNlIHVzaW5nIHRoZSBzcGVjaWZpZWQge2RhdGF9LCBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQuXG5cdCAqL1xuXHR1cGRhdGUoIHR5cGUsIGlkLCBkYXRhICkge1xuXHRcdHZhciB1cmwgPSBgJHt0eXBlLnVyaX0vJHtpZH1gO1xuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdXJpLCAnUE9TVCcsIGRhdGEgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlcGxhY2UgdGhlIGRhdGEgZm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHt0eXBlfSB3aXRoIHRoZSBnaXZlbiB7aWR9IHZpYSB0aGUgUkVTVFxuXHQgKiBzZXJ2aWNlIHVzaW5nIHRoZSBzcGVjaWZpZWQge2RhdGF9LCBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQuXG5cdCAqL1xuXHRyZXBsYWNlKCB0eXBlLCBpZCwgZGF0YSApIHtcblx0XHR2YXIgdXJpID0gYCR7dHlwZS51cml9LyR7aWR9YDtcblx0XHRyZXR1cm4gdGhpcy5zZW5kSnNvblJlcXVlc3QoIHVyaSwgJ1BVVCcsIGRhdGEgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIERlbGV0ZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCB7dHlwZX0gd2l0aCB0aGUgZ2l2ZW4ge2lkfSB2aWEgdGhlIFJFU1Qgc2VydmljZSBhbmRcblx0ICogcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQuXG5cdCAqL1xuXHRyZW1vdmUoIHR5cGUsIGlkICkge1xuXHRcdHZhciB1cmkgPSBgJHt0eXBlLnVyaX0vJHtpZH1gO1xuXHRcdHJldHVybiB0aGlzLnNlbmRKc29uUmVxdWVzdCggdXJpLCAnREVMRVRFJyApO1xuXHR9XG5cblxuXHQvKlxuXHQgKiBVdGlsaXR5IGZ1bmN0aW9uc1xuXHQgKi9cblxuXHQvKipcblx0ICogVHVybiB0aGUgc3BlY2lmaWVkIHtjcml0ZXJpYX0gaW50byBhIE1hcCBvZiBwYXJhbWV0ZXJzIHN1aXRhYmxlIGZvciBwYXNzaW5nIGluIGFuIFhoclxuXHQgKiByZXF1ZXN0LlxuXHQgKi9cblx0bWFrZVBhcmFtc0Zyb21Dcml0ZXJpYSggY3JpdGVyaWEgKSB7XG5cdFx0aWYgKCAhY3JpdGVyaWEgKSB7IHJldHVybiBudWxsOyB9XG5cblx0XHR2YXIgcGFyYW1zID0gbmV3IE1hcCgpO1xuXG5cdFx0Zm9yICggbGV0IFtrZXksIHZhbF0gb2YgY3JpdGVyaWEuZmlsdGVyQ2xhdXNlcyApIHtcblx0XHRcdGNvbnNvbGUuZGVidWcoIGBBZGRpbmcgcGFyYW1ldGVyICR7a2V5fT0ke3ZhbH0gZnJvbSBjcml0ZXJpYSdzIGZpbHRlciBjbGF1c2VzLmAgKTtcblx0XHRcdHBhcmFtcy5zZXQoIGtleSwgdmFsICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjcml0ZXJpYS5tYXhSZXN1bHRDb3VudCApIHsgcGFyYW1zLnNldCggJ2xpbWl0JywgY3JpdGVyaWEubWF4UmVzdWx0Q291bnQgKTsgfVxuXHRcdGlmICggY3JpdGVyaWEucmVzdWx0T2Zmc2V0ICkgeyBwYXJhbXMuc2V0KCAnb2Zmc2V0JywgY3JpdGVyaWEucmVzdWx0T2Zmc2V0ICk7IH1cblxuXHRcdHJldHVybiBwYXJhbXM7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBUdXJuIHRoZSBzcGVjaWZpZWQge3BhcmFtc30gT2JqZWN0IGludG8gYSBVUkwtZW5jb2RlZCBxdWVyeSBzdHJpbmcuXG5cdCAqL1xuXHRxdWVyeVN0cmluZ0Zyb21QYXJhbXMoIHBhcmFtcyApIHtcblx0XHRjb25zb2xlLmRlYnVnKCBcIk1ha2luZyBxdWVyeSBzdHJpbmcgZnJvbSBwYXJhbXM6ICVvXCIsIHBhcmFtcyApO1xuXG5cdFx0aWYgKCAhcGFyYW1zICkgeyByZXR1cm4gJyc7IH1cblxuXHRcdGxldCBwYXJhbU1hcCA9IG1hcGlmeSggcGFyYW1zICk7XG5cdFx0Y29uc29sZS5kZWJ1ZyggXCJQYXJhbSBtYXAgaXM6ICVvXCIsIHBhcmFtTWFwICk7XG5cblx0XHRsZXQgcGFpcnMgPSBbXTtcblx0XHRmb3IgKCBsZXQgW2tleSwgdmFsXSBvZiBwYXJhbU1hcCApIHtcblx0XHRcdGxldCBlbmNLZXkgPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApO1xuXHRcdFx0bGV0IGVuY1ZhbCA9IGVuY29kZVVSSUNvbXBvbmVudCggdmFsICk7XG5cdFx0XHRjb25zb2xlLmRlYnVnKCBcIiAgYWRkaW5nIHBhaXI6ICVzPSVzXCIsIGVuY0tleSwgZW5jVmFsICk7XG5cdFx0XHRwYWlycy5wdXNoKCBgJHtlbmNLZXl9PSR7ZW5jVmFsfWAgKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmRlYnVnKCBcIlJldHVybmluZyBxdWVyeSBzdHJpbmcgb2YgJWQgcGFyYW0gcGFpcnMuXCIsIHBhaXJzLmxlbmd0aCApO1xuXHRcdHJldHVybiBwYWlycy5qb2luKCAnJicgKTtcblx0fVxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
