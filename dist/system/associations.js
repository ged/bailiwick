
"use strict";

System.register(['inflection', 'bluebird', './utils'], function (_export, _context) {
	"use strict";

	var inflection, Promise, debug, DATA, ASSOCIATIONS, ASSOCIATIONS_CACHE, DATASTORE;

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	function capitalize(string) {
		string = string.toString();

		if (string.length === 0) return '';

		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function oneToMany(associationName, modelClass) {
		var subResourceUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		debug('Defining oneToMany association: ' + associationName);
		var capitalized = capitalize(associationName);

		return function (target, name, descriptor) {
			var _Object$assign;

			Object.assign(target, (_Object$assign = {}, _defineProperty(_Object$assign, 'get' + capitalized, function undefined() {
				var _this = this;

				var avoidCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!subResourceUri) {
					subResourceUri = modelClass.uri;
				}

				if (!this[ASSOCIATIONS_CACHE].has(associationName)) {
					var url = this.uri + '/' + subResourceUri;
					debug('Fetching ' + associationName + ' for ' + this + ' from ' + url);
					return modelClass.from(url).get().then(function (results) {
						_this[ASSOCIATIONS_CACHE].set(associationName, results);
						return Promise.resolve(results);
					});
				}

				return Promise.resolve(this[ASSOCIATIONS_CACHE].get(associationName));
			}), _defineProperty(_Object$assign, 'add' + capitalized, function undefined() {
				return Promise.resolve(true);
			}), _defineProperty(_Object$assign, 'remove' + capitalized, function undefined() {
				return Promise.resolve(true);
			}), _Object$assign));
			debug("property descriptors are: ", Object.getOwnPropertyDescriptors(target));

			return descriptor;
		};
	}

	_export('oneToMany', oneToMany);

	function oneToOne(associationName, modelClass) {
		var subResourceUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		debug('Defining oneToOne association: ' + associationName);
		var capitalized = capitalize(associationName);

		return function (target, name, descriptor) {
			var _Object$assign2;

			Object.assign(target, (_Object$assign2 = {}, _defineProperty(_Object$assign2, 'get' + capitalized, function undefined() {
				var _this2 = this;

				var avoidCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!subResourceUri) {
					subResourceUri = modelClass.uri;
				}

				if (!this[ASSOCIATIONS_CACHE].has(associationName)) {
					var url = this.uri + '/' + subResourceUri;
					debug('Fetching ' + associationName + ' for ' + this + ' from ' + url);
					return modelClass.from(url).get().then(function (result) {
						_this2[ASSOCIATIONS_CACHE].set(associationName, result);
						return Promise.resolve(result);
					});
				}

				return Promise.resolve(this[ASSOCIATIONS_CACHE].get(associationName));
			}), _defineProperty(_Object$assign2, 'set' + capitalized, function undefined() {
				return Promise.resolve(true);
			}), _defineProperty(_Object$assign2, 'remove' + capitalized, function undefined() {
				return Promise.resolve(true);
			}), _Object$assign2));
			debug("property descriptors are: ", Object.getOwnPropertyDescriptors(target));

			return descriptor;
		};
	}

	_export('oneToOne', oneToOne);

	function manyToOne(associationName, modelClass) {
		var keyField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		debug('Defining oneToMany association: ' + associationName);
		var capitalized = capitalize(associationName);
		if (!keyField) {
			keyField = inflection.underscore(associationName) + '_id';
		}

		return function (target, name, descriptor) {
			var _Object$assign3;

			Object.assign(target, (_Object$assign3 = {}, _defineProperty(_Object$assign3, 'get' + capitalized, function undefined() {
				var _this3 = this;

				var avoidCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!this[ASSOCIATIONS_CACHE].has(associationName)) {
					var id = this[keyField];

					debug('Fetching ' + associationName + ' (' + modelClass.name + ' id=' + id + ') for ' + this);
					return modelClass.get(id).then(function (result) {
						_this3[ASSOCIATIONS_CACHE].set(associationName, result);
						return Promise.resolve(result);
					});
				}

				return Promise.resolve(this[ASSOCIATIONS_CACHE].get(associationName));
			}), _defineProperty(_Object$assign3, 'set' + capitalized, function undefined() {
				return Promise.resolve(true);
			}), _defineProperty(_Object$assign3, 'remove' + capitalized, function undefined() {
				return Promise.resolve(true);
			}), _Object$assign3));
			debug("property descriptors are: ", Object.getOwnPropertyDescriptors(target));

			return descriptor;
		};
	}

	_export('manyToOne', manyToOne);

	return {
		setters: [function (_inflection) {
			inflection = _inflection.default;
		}, function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_utils) {
			debug = _utils.debug;
		}],
		execute: function () {
			DATA = Symbol.for("data");
			ASSOCIATIONS = Symbol.for("associations");
			ASSOCIATIONS_CACHE = Symbol.for("associationsCache");
			DATASTORE = Symbol.for("datastore");
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6WyJjYXBpdGFsaXplIiwic3RyaW5nIiwidG9TdHJpbmciLCJsZW5ndGgiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwib25lVG9NYW55IiwiYXNzb2NpYXRpb25OYW1lIiwibW9kZWxDbGFzcyIsInN1YlJlc291cmNlVXJpIiwiZGVidWciLCJjYXBpdGFsaXplZCIsInRhcmdldCIsIm5hbWUiLCJkZXNjcmlwdG9yIiwiT2JqZWN0IiwiYXNzaWduIiwiYXZvaWRDYWNoZSIsInVyaSIsIkFTU09DSUFUSU9OU19DQUNIRSIsImhhcyIsInVybCIsImZyb20iLCJnZXQiLCJ0aGVuIiwic2V0IiwicmVzdWx0cyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsIm9uZVRvT25lIiwicmVzdWx0IiwibWFueVRvT25lIiwia2V5RmllbGQiLCJpbmZsZWN0aW9uIiwidW5kZXJzY29yZSIsImlkIiwiREFUQSIsIlN5bWJvbCIsImZvciIsIkFTU09DSUFUSU9OUyIsIkRBVEFTVE9SRSJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsVUFBU0EsVUFBVCxDQUFxQkMsTUFBckIsRUFBOEI7QUFDN0JBLFdBQVNBLE9BQU9DLFFBQVAsRUFBVDs7QUFFQSxNQUFLRCxPQUFPRSxNQUFQLEtBQWtCLENBQXZCLEVBQTJCLE9BQU8sRUFBUDs7QUFFM0IsU0FBT0YsT0FBT0csTUFBUCxDQUFlLENBQWYsRUFBbUJDLFdBQW5CLEtBQW1DSixPQUFPSyxLQUFQLENBQWMsQ0FBZCxDQUExQztBQUNBOztBQUdNLFVBQVNDLFNBQVQsQ0FBb0JDLGVBQXBCLEVBQXFDQyxVQUFyQyxFQUF1RTtBQUFBLE1BQXRCQyxjQUFzQix1RUFBUCxJQUFPOztBQUM3RUMsNkNBQTBDSCxlQUExQztBQUNBLE1BQUlJLGNBQWNaLFdBQVlRLGVBQVosQ0FBbEI7O0FBRUEsU0FBTyxV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LEdBQTNCLENBQStCaEIsZUFBL0IsQ0FBakIsQ0FBUDtBQUNBLElBYkYsNENBY1FJLFdBZFIsRUFjd0IscUJBQXVCO0FBQzdDLFdBQU9nQixRQUFRQyxPQUFSLENBQWlCLElBQWpCLENBQVA7QUFDQSxJQWhCRiwrQ0FpQldqQixXQWpCWCxFQWlCMkIscUJBQXVCO0FBQ2hELFdBQU9nQixRQUFRQyxPQUFSLENBQWlCLElBQWpCLENBQVA7QUFDQSxJQW5CRjtBQXFCQWxCLFNBQU8sNEJBQVAsRUFDQ0ssT0FBT2MseUJBQVAsQ0FBaUNqQixNQUFqQyxDQUREOztBQUdBLFVBQU9FLFVBQVA7QUFDQSxHQTNCRDtBQTRCQTs7c0JBbkNla0IsUzs7OztBQWxHVEUsYTs7QUFDQVAsVTs7QUFFQ2pCLFEsVUFBQUEsSzs7O0FBR0YyQixPLEdBQU9DLE9BQU9DLEdBQVAsQ0FBWSxNQUFaLEM7QUFDUEMsZSxHQUFlRixPQUFPQyxHQUFQLENBQVksY0FBWixDO0FBQ2ZwQixxQixHQUFxQm1CLE9BQU9DLEdBQVAsQ0FBVyxtQkFBWCxDO0FBQ3JCRSxZLEdBQVlILE9BQU9DLEdBQVAsQ0FBVyxXQUFYLEMiLCJmaWxlIjoiYXNzb2NpYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
