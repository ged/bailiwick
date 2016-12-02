define(['exports', 'bluebird', 'inflection', './result-set', './validations', './utils'], function (exports, _bluebird, _inflection, _resultSet, _validations, _utils) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Model = undefined;
	exports.schema = schema;

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _inflection2 = _interopRequireDefault(_inflection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var NEW_OBJECT = Symbol.for("newObject"),
	    DATA = Symbol.for("data"),
	    DIRTY_FIELDS = Symbol.for("dirtyFields"),
	    ASSOCIATIONS_CACHE = Symbol.for("associationsCache"),
	    DATASTORE = Symbol.for("datastore"),
	    VALIDATORS = Symbol.for("validators"),
	    ASSOCIATIONS = Symbol.for("associations"),
	    VALUE_STRING = Symbol.for("valueString"),
	    SCHEMA = Symbol.for("schema");

	var Model = exports.Model = function () {
		_createClass(Model, null, [{
			key: 'where',
			value: function where(parameters) {
				return this.resultset.where(parameters);
			}
		}, {
			key: 'limit',
			value: function limit(count) {
				return this.resultset.limit(count);
			}
		}, {
			key: 'from',
			value: function from(location) {
				return this.resultset.from(location);
			}
		}, {
			key: 'fromData',
			value: function fromData(data) {
				var _this = this;

				if (Array.isArray(data)) {
					return data.map(function (record) {
						return Reflect.construct(_this, [record, false]);
					});
				} else {
					return Reflect.construct(this, [data, false]);
				}
			}
		}, {
			key: 'get',
			value: function get() {
				var _this2 = this;

				var idOrCriteria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				return this.datastore.get(this, idOrCriteria).then(function (data) {
					return _this2.fromData(data);
				});
			}
		}, {
			key: 'create',
			value: function create(fields) {
				var instance = Reflect.construct(this, [fields]);
				return instance.create();
			}
		}, {
			key: 'associations',
			get: function get() {
				if (!this[ASSOCIATIONS]) {
					this[ASSOCIATIONS] = new Map();
				}
				return this[ASSOCIATIONS];
			}
		}, {
			key: 'validators',
			get: function get() {
				if (!this[VALIDATORS]) {
					this[VALIDATORS] = new Map();
				}
				return this[VALIDATORS];
			}
		}, {
			key: 'uri',
			get: function get() {
				return _inflection2.default.tableize(this.name);
			}
		}, {
			key: 'datastore',
			get: function get() {
				if (!this[DATASTORE]) {
					throw Error('No datastore has been set for ' + this);
				}

				return this[DATASTORE];
			},
			set: function set(datastore) {
				(0, _utils.debug)('Datastore for ' + this + ' set to ' + datastore);
				this[DATASTORE] = datastore;
			}
		}, {
			key: 'resultset',
			get: function get() {
				return new _resultSet.ResultSet(this);
			}
		}]);

		function Model() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var isNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			_classCallCheck(this, Model);

			var schema = this.constructor[SCHEMA] || {};
			data = Object.assign({}, schema, data);

			this[NEW_OBJECT] = isNew;
			this[DATA] = data;
			this[DIRTY_FIELDS] = new Set();
			this[ASSOCIATIONS_CACHE] = new Map();

			this[DATASTORE] = this.constructor.datastore;

			this.defineAttributes(data);
		}

		_createClass(Model, [{
			key: 'save',
			value: function save() {
				if (this.isNew()) {
					return this.create();
				} else {
					if (!this.isDirty()) {
						return _bluebird2.default.resolve(this);
					}
					return this.update();
				}
			}
		}, {
			key: 'create',
			value: function create() {
				var _this3 = this;

				return this.validate().then(function () {
					return _this3[DATASTORE].store(_this3.constructor, _this3[DATA]);
				}).then(function (result) {
					if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
						Object.assign(_this3[DATA], result);
					} else {
						_this3[DATA]['id'] = result;
					}

					_this3[NEW_OBJECT] = false;
					_this3[DIRTY_FIELDS].clear();
					_this3.defineAttributes(_this3[DATA]);

					return _this3;
				});
			}
		}, {
			key: 'update',
			value: function update() {
				var _this4 = this;

				var dirtyData = {};
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this[DIRTY_FIELDS][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var field = _step.value;

						dirtyData[field] = this[DATA][field];
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return this.validate().then(function () {
					return _this4[DATASTORE].update(_this4.constructor, _this4.id, dirtyData);
				}).then(function (mergedData) {
					Object.assign(_this4[DATA], mergedData);
					_this4[NEW_OBJECT] = false;
					_this4[DIRTY_FIELDS].clear();
					_this4.defineAttributes(_this4[DATA]);

					return _this4;
				});
			}
		}, {
			key: 'replace',
			value: function replace() {
				var _this5 = this;

				var data = Object.assign({}, this[DATA]);

				return this.validate().then(function () {
					return _this5[DATASTORE].replace(_this5.constructor, _this5.id, data);
				}).then(function (mergedData) {
					Object.assign(_this5[DATA], mergedData);
					_this5[NEW_OBJECT] = false;
					_this5[DIRTY_FIELDS].clear();
					_this5.defineAttributes(_this5[DATA]);

					return _this5;
				});
			}
		}, {
			key: 'delete',
			value: function _delete() {
				var _this6 = this;

				if (this.id) {
					return this[DATASTORE].remove(this.constructor, this.id).then(function () {
						return _this6;
					});
				} else {
					return _bluebird2.default.resolve(this[DATA]);
				}
			}
		}, {
			key: 'getValue',
			value: function getValue(name) {
				if (this.constructor.associations.has(name)) {
					var fn = this.constructor.associations.get(name);
					return Reflect.apply(this, fn);
				} else {
					return this[DATA][name];
				}
			}
		}, {
			key: 'setValue',
			value: function setValue(name, value) {
				if (this[DATA][name] !== value) {
					this[DIRTY_FIELDS].add(name);
				}
				this[DATA][name] = value;
			}
		}, {
			key: 'defineAttributes',
			value: function defineAttributes(attrs) {
				var self = this;

				var _loop = function _loop(name) {
					if (!Object.hasOwnProperty(self, name)) {
						Object.defineProperty(self, name, {
							configurable: true,
							enumerable: true,
							get: function get() {
								return self.getValue(name);
							},
							set: function set(newval) {
								self.setValue(name, newval);
							}
						});
					} else {
						(0, _utils.debug)('Already has a ' + name + ' property.');
					}
				};

				for (var name in attrs) {
					_loop(name);
				}
			}
		}, {
			key: 'isDirty',
			value: function isDirty() {
				return this.isNew() || this[DIRTY_FIELDS].size !== 0;
			}
		}, {
			key: 'isNew',
			value: function isNew() {
				return this[NEW_OBJECT];
			}
		}, {
			key: 'markClean',
			value: function markClean() {
				this[NEW_OBJECT] = false;
				this[DIRTY_FIELDS].clear();
			}
		}, {
			key: 'validate',
			value: function validate() {
				var _this7 = this;

				this.errors = new _validations.ValidationErrors();
				var promises = [];

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					var _loop2 = function _loop2() {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    field = _step2$value[0],
						    validationMethod = _step2$value[1];

						(0, _utils.debug)('Adding validation promise for ' + field);
						var pr = _bluebird2.default.try(function () {
							return validationMethod.call(_this7);
						});
						promises.push(pr);
					};

					for (var _iterator2 = this.constructor.validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						_loop2();
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				return _bluebird2.default.all(promises).then(function () {
					(0, _utils.debug)("Validation successful!");
				});
			}
		}, {
			key: VALUE_STRING,
			value: function value() {
				var values = [];
				for (var field in this[DATA]) {
					var val = this[DATA][field];
					values.push(field + ': ' + val);
				}
				return values.join(', ');
			}
		}, {
			key: 'uri',
			get: function get() {
				return this.constructor.uri + '/' + this.id;
			}
		}, {
			key: 'modelType',
			get: function get() {
				return this.constructor.name;
			}
		}, {
			key: Symbol.toStringTag,
			get: function get() {
				var dirtyMark = this.isDirty() ? ' ~' : '';
				var valueString = this[VALUE_STRING]();
				return this.constructor.name + ' values={' + valueString + '}' + dirtyMark;
			}
		}]);

		return Model;
	}();

	function schema(fields) {

		return function decorator(modelClass) {
			var _this8 = this;

			modelClass[SCHEMA] = fields;

			var _loop3 = function _loop3(name) {
				if (!Object.hasOwnProperty(modelClass, name)) {
					Object.defineProperty(modelClass, name, {
						configurable: true,
						enumerable: true,
						get: function get() {
							return _this8.getValue(name);
						},
						set: function set(newval) {
							_this8.setValue(name, newval);
						}
					});
				} else {
					(0, _utils.debug)('Already has a ' + name + ' property.');
				}
			};

			for (var name in fields) {
				_loop3(name);
			}
		};
	}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsLmpzIl0sIm5hbWVzIjpbInNjaGVtYSIsIk5FV19PQkpFQ1QiLCJTeW1ib2wiLCJmb3IiLCJEQVRBIiwiRElSVFlfRklFTERTIiwiQVNTT0NJQVRJT05TX0NBQ0hFIiwiREFUQVNUT1JFIiwiVkFMSURBVE9SUyIsIkFTU09DSUFUSU9OUyIsIlZBTFVFX1NUUklORyIsIlNDSEVNQSIsIk1vZGVsIiwicGFyYW1ldGVycyIsInJlc3VsdHNldCIsIndoZXJlIiwiY291bnQiLCJsaW1pdCIsImxvY2F0aW9uIiwiZnJvbSIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJSZWZsZWN0IiwiY29uc3RydWN0IiwicmVjb3JkIiwiaWRPckNyaXRlcmlhIiwiZGF0YXN0b3JlIiwiZ2V0IiwidGhlbiIsImZyb21EYXRhIiwiZmllbGRzIiwiaW5zdGFuY2UiLCJjcmVhdGUiLCJNYXAiLCJ0YWJsZWl6ZSIsIm5hbWUiLCJFcnJvciIsImlzTmV3IiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJhc3NpZ24iLCJTZXQiLCJkZWZpbmVBdHRyaWJ1dGVzIiwiaXNEaXJ0eSIsInJlc29sdmUiLCJ1cGRhdGUiLCJ2YWxpZGF0ZSIsInN0b3JlIiwicmVzdWx0IiwiY2xlYXIiLCJkaXJ0eURhdGEiLCJmaWVsZCIsImlkIiwibWVyZ2VkRGF0YSIsInJlcGxhY2UiLCJyZW1vdmUiLCJhc3NvY2lhdGlvbnMiLCJoYXMiLCJmbiIsImFwcGx5IiwidmFsdWUiLCJhZGQiLCJhdHRycyIsInNlbGYiLCJoYXNPd25Qcm9wZXJ0eSIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldFZhbHVlIiwic2V0Iiwic2V0VmFsdWUiLCJuZXd2YWwiLCJzaXplIiwiZXJyb3JzIiwicHJvbWlzZXMiLCJ2YWxpZGF0aW9uTWV0aG9kIiwicHIiLCJ0cnkiLCJjYWxsIiwicHVzaCIsInZhbGlkYXRvcnMiLCJhbGwiLCJ2YWx1ZXMiLCJ2YWwiLCJqb2luIiwidXJpIiwidG9TdHJpbmdUYWciLCJkaXJ0eU1hcmsiLCJ2YWx1ZVN0cmluZyIsImRlY29yYXRvciIsIm1vZGVsQ2xhc3MiXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7O1NBaWJnQkEsTSxHQUFBQSxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXBhaEIsS0FBTUMsYUFBcUJDLE9BQU9DLEdBQVAsQ0FBVyxXQUFYLENBQTNCO0FBQUEsS0FDTUMsT0FBcUJGLE9BQU9DLEdBQVAsQ0FBVyxNQUFYLENBRDNCO0FBQUEsS0FFTUUsZUFBcUJILE9BQU9DLEdBQVAsQ0FBVyxhQUFYLENBRjNCO0FBQUEsS0FHTUcscUJBQXFCSixPQUFPQyxHQUFQLENBQVcsbUJBQVgsQ0FIM0I7QUFBQSxLQUlNSSxZQUFxQkwsT0FBT0MsR0FBUCxDQUFXLFdBQVgsQ0FKM0I7QUFBQSxLQUtNSyxhQUFxQk4sT0FBT0MsR0FBUCxDQUFXLFlBQVgsQ0FMM0I7QUFBQSxLQU1NTSxlQUFxQlAsT0FBT0MsR0FBUCxDQUFXLGNBQVgsQ0FOM0I7QUFBQSxLQU9NTyxlQUFxQlIsT0FBT0MsR0FBUCxDQUFXLGFBQVgsQ0FQM0I7QUFBQSxLQVFNUSxTQUFxQlQsT0FBT0MsR0FBUCxDQUFXLFFBQVgsQ0FSM0I7O0tBaUJhUyxLLFdBQUFBLEs7Ozt5QkFtRUVDLFUsRUFBYTtBQUMxQixXQUFPLEtBQUtDLFNBQUwsQ0FBZUMsS0FBZixDQUFzQkYsVUFBdEIsQ0FBUDtBQUNBOzs7eUJBTWFHLEssRUFBUTtBQUNyQixXQUFPLEtBQUtGLFNBQUwsQ0FBZUcsS0FBZixDQUFzQkQsS0FBdEIsQ0FBUDtBQUNBOzs7d0JBT1lFLFEsRUFBVztBQUN2QixXQUFPLEtBQUtKLFNBQUwsQ0FBZUssSUFBZixDQUFxQkQsUUFBckIsQ0FBUDtBQUNBOzs7NEJBTWdCRSxJLEVBQU87QUFBQTs7QUFFdkIsUUFBS0MsTUFBTUMsT0FBTixDQUFjRixJQUFkLENBQUwsRUFB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
