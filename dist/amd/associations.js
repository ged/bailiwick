define(['exports', 'inflection', 'bluebird', './utils'], function (exports, _inflection, _bluebird, _utils) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.oneToMany = oneToMany;
	exports.oneToOne = oneToOne;
	exports.manyToOne = manyToOne;

	var _inflection2 = _interopRequireDefault(_inflection);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	var DATA = Symbol.for("data"),
	    ASSOCIATIONS = Symbol.for("associations"),
	    ASSOCIATIONS_CACHE = Symbol.for("associationsCache"),
	    DATASTORE = Symbol.for("datastore");

	function capitalize(string) {
		string = string.toString();

		if (string.length === 0) return '';

		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function oneToMany(associationName, modelClass) {
		var subResourceUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		(0, _utils.debug)('Defining oneToMany association: ' + associationName);
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
					(0, _utils.debug)('Fetching ' + associationName + ' for ' + this + ' from ' + url);
					return modelClass.from(url).get().then(function (results) {
						_this[ASSOCIATIONS_CACHE].set(associationName, results);
						return _bluebird2.default.resolve(results);
					});
				}

				return _bluebird2.default.resolve(this[ASSOCIATIONS_CACHE].get(associationName));
			}), _defineProperty(_Object$assign, 'add' + capitalized, function undefined() {
				return _bluebird2.default.resolve(true);
			}), _defineProperty(_Object$assign, 'remove' + capitalized, function undefined() {
				return _bluebird2.default.resolve(true);
			}), _Object$assign));
			(0, _utils.debug)("property descriptors are: ", Object.getOwnPropertyDescriptors(target));

			return descriptor;
		};
	}

	function oneToOne(associationName, modelClass) {
		var subResourceUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		(0, _utils.debug)('Defining oneToOne association: ' + associationName);
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
					(0, _utils.debug)('Fetching ' + associationName + ' for ' + this + ' from ' + url);
					return modelClass.from(url).get().then(function (result) {
						_this2[ASSOCIATIONS_CACHE].set(associationName, result);
						return _bluebird2.default.resolve(result);
					});
				}

				return _bluebird2.default.resolve(this[ASSOCIATIONS_CACHE].get(associationName));
			}), _defineProperty(_Object$assign2, 'set' + capitalized, function undefined() {
				return _bluebird2.default.resolve(true);
			}), _defineProperty(_Object$assign2, 'remove' + capitalized, function undefined() {
				return _bluebird2.default.resolve(true);
			}), _Object$assign2));
			(0, _utils.debug)("property descriptors are: ", Object.getOwnPropertyDescriptors(target));

			return descriptor;
		};
	}

	function manyToOne(associationName, modelClass) {
		var keyField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		(0, _utils.debug)('Defining oneToMany association: ' + associationName);
		var capitalized = capitalize(associationName);
		if (!keyField) {
			keyField = _inflection2.default.underscore(associationName) + '_id';
		}

		return function (target, name, descriptor) {
			var _Object$assign3;

			Object.assign(target, (_Object$assign3 = {}, _defineProperty(_Object$assign3, 'get' + capitalized, function undefined() {
				var _this3 = this;

				var avoidCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!this[ASSOCIATIONS_CACHE].has(associationName)) {
					var id = this[keyField];

					(0, _utils.debug)('Fetching ' + associationName + ' (' + modelClass.name + ' id=' + id + ') for ' + this);
					return modelClass.get(id).then(function (result) {
						_this3[ASSOCIATIONS_CACHE].set(associationName, result);
						return _bluebird2.default.resolve(result);
					});
				}

				return _bluebird2.default.resolve(this[ASSOCIATIONS_CACHE].get(associationName));
			}), _defineProperty(_Object$assign3, 'set' + capitalized, function undefined() {
				return _bluebird2.default.resolve(true);
			}), _defineProperty(_Object$assign3, 'remove' + capitalized, function undefined() {
				return _bluebird2.default.resolve(true);
			}), _Object$assign3));
			(0, _utils.debug)("property descriptors are: ", Object.getOwnPropertyDescriptors(target));

			return descriptor;
		};
	}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6WyJvbmVUb01hbnkiLCJvbmVUb09uZSIsIm1hbnlUb09uZSIsIkRBVEEiLCJTeW1ib2wiLCJmb3IiLCJBU1NPQ0lBVElPTlMiLCJBU1NPQ0lBVElPTlNfQ0FDSEUiLCJEQVRBU1RPUkUiLCJjYXBpdGFsaXplIiwic3RyaW5nIiwidG9TdHJpbmciLCJsZW5ndGgiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiYXNzb2NpYXRpb25OYW1lIiwibW9kZWxDbGFzcyIsInN1YlJlc291cmNlVXJpIiwiY2FwaXRhbGl6ZWQiLCJ0YXJnZXQiLCJuYW1lIiwiZGVzY3JpcHRvciIsIk9iamVjdCIsImFzc2lnbiIsImF2b2lkQ2FjaGUiLCJ1cmkiLCJoYXMiLCJ1cmwiLCJmcm9tIiwiZ2V0IiwidGhlbiIsInNldCIsInJlc3VsdHMiLCJyZXNvbHZlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInJlc3VsdCIsImtleUZpZWxkIiwidW5kZXJzY29yZSIsImlkIl0sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7O1NBd0JnQkEsUyxHQUFBQSxTO1NBc0NBQyxRLEdBQUFBLFE7U0F1Q0FDLFMsR0FBQUEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNUZoQixLQUFNQyxPQUFPQyxPQUFPQyxHQUFQLENBQVksTUFBWixDQUFiO0FBQUEsS0FDTUMsZUFBZUYsT0FBT0MsR0FBUCxDQUFZLGNBQVosQ0FEckI7QUFBQSxLQUVNRSxxQkFBcUJILE9BQU9DLEdBQVAsQ0FBVyxtQkFBWCxDQUYzQjtBQUFBLEtBR01HLFlBQVlKLE9BQU9DLEdBQVAsQ0FBVyxXQUFYLENBSGxCOztBQU1BLFVBQVNJLFVBQVQsQ0FBcUJDLE1BQXJCLEVBQThCO0FBQzdCQSxXQUFTQSxPQUFPQyxRQUFQLEVBQVQ7O0FBRUEsTUFBS0QsT0FBT0UsTUFBUCxLQUFrQixDQUF2QixFQUEyQixPQUFPLEVBQVA7O0FBRTNCLFNBQU9GLE9BQU9HLE1B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QXJCLENBQTJCLGtCQUFVO0FBQzNDLGFBQU14QixrQkFBTixFQUEyQnlCLEdBQTNCLENBQWdDaEIsZUFBaEMsRUFBaURvQixNQUFqRDtBQUNBLGFBQU8sbUJBQVFGLE9BQVIsQ0FBaUJFLE1BQWpCLENBQVA7QUFDQSxNQUhNLENBQVA7QUFJQTs7QUFFRCxXQUFPLG1CQUFRRixPQUFSLENBQWlCLEtBQU0zQixrQkFBTixFQUEyQnVCLEdBQTNCLENBQStCZCxlQUEvQixDQUFqQixDQUFQO0FBQ0EsSUFiRiw0Q0FjUUcsV0FkUixFQWN3QixxQkFBdUI7QUFDN0MsV0FBTyxtQkFBUWUsT0FBUixDQUFpQixJQUFqQixDQUFQO0FBQ0EsSUFoQkYsK0NBaUJXZixXQWpCWCxFQWlCMkIscUJBQXVCO0FBQ2hELFdBQU8sbUJBQVFlLE9BQVIsQ0FBaUIsSUFBakIsQ0FBUDtBQUNBLElBbkJGO0FBcUJBLHFCQUFPLDRCQUFQLEVBQ0NYLE9BQU9ZLHlCQUFQLENBQWlDZixNQUFqQyxDQUREOztBQUdBLFVBQU9FLFVBQVA7QUFDQSxHQTNCRDtBQTRCQSIsImZpbGUiOiJhc3NvY2lhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiL2xpYiJ9
