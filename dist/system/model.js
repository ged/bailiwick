
"use strict";

System.register(['bluebird', 'inflection', './result-set', './validations', './utils'], function (_export, _context) {
	"use strict";

	var Promise, inflection, ResultSet, ValidationErrors, debug, _slicedToArray, _typeof, _createClass, NEW_OBJECT, DATA, DIRTY_FIELDS, ASSOCIATIONS_CACHE, DATASTORE, VALIDATORS, ASSOCIATIONS, VALUE_STRING, SCHEMA, Model;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

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
					debug('Already has a ' + name + ' property.');
				}
			};

			for (var name in fields) {
				_loop3(name);
			}
		};
	}

	_export('schema', schema);

	return {
		setters: [function (_bluebird) {
			Promise = _bluebird.default;
		}, function (_inflection) {
			inflection = _inflection.default;
		}, function (_resultSet) {
			ResultSet = _resultSet.ResultSet;
		}, function (_validations) {
			ValidationErrors = _validations.ValidationErrors;
		}, function (_utils) {
			debug = _utils.debug;
		}],
		execute: function () {
			_slicedToArray = function () {
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

			_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			};

			_createClass = function () {
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

			NEW_OBJECT = Symbol.for("newObject");
			DATA = Symbol.for("data");
			DIRTY_FIELDS = Symbol.for("dirtyFields");
			ASSOCIATIONS_CACHE = Symbol.for("associationsCache");
			DATASTORE = Symbol.for("datastore");
			VALIDATORS = Symbol.for("validators");
			ASSOCIATIONS = Symbol.for("associations");
			VALUE_STRING = Symbol.for("valueString");
			SCHEMA = Symbol.for("schema");

			_export('Model', Model = function () {
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
						return inflection.tableize(this.name);
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
						debug('Datastore for ' + this + ' set to ' + datastore);
						this[DATASTORE] = datastore;
					}
				}, {
					key: 'resultset',
					get: function get() {
						return new ResultSet(this);
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
								return Promise.resolve(this);
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
							return Promise.resolve(this[DATA]);
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
								debug('Already has a ' + name + ' property.');
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

						this.errors = new ValidationErrors();
						var promises = [];

						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							var _loop2 = function _loop2() {
								var _step2$value = _slicedToArray(_step2.value, 2),
								    field = _step2$value[0],
								    validationMethod = _step2$value[1];

								debug('Adding validation promise for ' + field);
								var pr = Promise.try(function () {
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

						return Promise.all(promises).then(function () {
							debug("Validation successful!");
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
			}());

			_export('Model', Model);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsLmpzIl0sIm5hbWVzIjpbInNjaGVtYSIsImZpZWxkcyIsImRlY29yYXRvciIsIm1vZGVsQ2xhc3MiLCJTQ0hFTUEiLCJuYW1lIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJnZXRWYWx1ZSIsInNldCIsInNldFZhbHVlIiwibmV3dmFsIiwiZGVidWciLCJQcm9taXNlIiwiaW5mbGVjdGlvbiIsIlJlc3VsdFNldCIsIlZhbGlkYXRpb25FcnJvcnMiLCJORVdfT0JKRUNUIiwiU3ltYm9sIiwiZm9yIiwiREFUQSIsIkRJUlRZX0ZJRUxEUyIsIkFTU09DSUFUSU9OU19DQUNIRSIsIkRBVEFTVE9SRSIsIlZBTElEQVRPUlMiLCJBU1NPQ0lBVElPTlMiLCJWQUxVRV9TVFJJTkciLCJNb2RlbCIsInBhcmFtZXRlcnMiLCJyZXN1bHRzZXQiLCJ3aGVyZSIsImNvdW50IiwibGltaXQiLCJsb2NhdGlvbiIsImZyb20iLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsInJlY29yZCIsImlkT3JDcml0ZXJpYSIsImRhdGFzdG9yZSIsInRoZW4iLCJmcm9tRGF0YSIsImluc3RhbmNlIiwiY3JlYXRlIiwiTWFwIiwidGFibGVpemUiLCJFcnJvciIsImlzTmV3IiwiY29uc3RydWN0b3IiLCJhc3NpZ24iLCJTZXQiLCJkZWZpbmVBdHRyaWJ1dGVzIiwiaXNEaXJ0eSIsInJlc29sdmUiLCJ1cGRhdGUiLCJ2YWxpZGF0ZSIsInN0b3JlIiwicmVzdWx0IiwiY2xlYXIiLCJkaXJ0eURhdGEiLCJmaWVsZCIsImlkIiwibWVyZ2VkRGF0YSIsInJlcGxhY2UiLCJyZW1vdmUiLCJhc3NvY2lhdGlvbnMiLCJoYXMiLCJmbiIsImFwcGx5IiwidmFsdWUiLCJhZGQiLCJhdHRycyIsInNlbGYiLCJzaXplIiwiZXJyb3JzIiwicHJvbWlzZXMiLCJ2YWxpZGF0aW9uTWV0aG9kIiwicHIiLCJ0cnkiLCJjYWxsIiwicHVzaCIsInZhbGlkYXRvcnMiLCJhbGwiLCJ2YWx1ZXMiLCJ2YWwiLCJqb2luIiwidXJpIiwidG9TdHJpbmdUYWciLCJkaXJ0eU1hcmsiLCJ2YWx1ZVN0cmluZyJdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7O0FBaWJPLFVBQVNBLE1BQVQsQ0FBaUJDLE1BQWpCLEVBQTBCOztBQUVoQyxTQUFPLFNBQVNDLFNBQVQsQ0FBb0JDLFVBQXBCLEVBQWlDO0FBQUE7O0FBQ3ZDQSxjQUFZQyxNQUFaLElBQXVCSCxNQUF2Qjs7QUFEdUMsZ0NBRTdCSSxJQUY2QjtBQUd0QyxRQUFLLENBQUNDLE9BQU9DLGNBQVAsQ0FBc0JKLFVBQXRCLEVBQWtDRSxJQUFsQyxDQUFOLEVBQWdEO0FBRS9DQyxZQUFPRSxjQUFQLENBQXVCTCxVQUF2QixFQUFtQ0UsSUFBbkMsRUFBeUM7QUFDeENJLG9CQUFjLElBRDBCO0FBRXhDQyxrQkFBWSxJQUY0QjtBQUd4Q0MsV0FBSyxlQUFNO0FBQUUsY0FBTyxPQUFLQyxRQUFMLENBQWNQLElBQWQsQ0FBUDtBQUE2QixPQUhGO0FBSXhDUSxXQUFLLHFCQUFVO0FBQUUsY0FBS0MsUUFBTCxDQUFjVCxJQUFkLEVBQW9CVSxNQUFwQjtBQUE4QjtBQUpQLE1BQXpDO0FBT0EsS0FURCxNQVNPO0FBQ05DLDhCQUF3QlgsSUFBeEI7QUFDQTtBQWRxQzs7QUFFdkMsUUFBTSxJQUFJQSxJQUFWLElBQWtCSixNQUFsQixFQUEyQjtBQUFBLFdBQWpCSSxJQUFpQjtBQWExQjtBQUNELEdBaEJEO0FBa0JBOzttQkFwQmVMLE07Ozs7QUEvYVRpQixVOztBQUNBQyxhOztBQUVDQyxZLGNBQUFBLFM7O0FBQ0FDLG1CLGdCQUFBQSxnQjs7QUFDQUosUSxVQUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1GSyxhLEdBQXFCQyxPQUFPQyxHQUFQLENB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
