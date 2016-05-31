
"use strict";

System.register(['bluebird', 'inflection', './result-set', './validations', './utils'], function (_export, _context) {
	var Promise, inflection, ResultSet, ValidationErrors, debug, _slicedToArray, _typeof, _createClass, NEW_OBJECT, DATA, DIRTY_FIELDS, ASSOCIATIONS_CACHE, DATASTORE, VALIDATORS, ASSOCIATIONS, VALUE_STRING, SCHEMA, Model;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

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
				return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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

						var idOrCriteria = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
					var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var isNew = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

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
					key: 'delete',
					value: function _delete() {
						var _this5 = this;

						if (this.id) {
							return this[DATASTORE].remove(this.constructor, this.id).then(function () {
								return _this5;
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
							return fn(this[DATA][name]);
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
						var _this6 = this;

						this.errors = new ValidationErrors();
						var promises = [];

						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							var _loop2 = function _loop2() {
								var _step2$value = _slicedToArray(_step2.value, 2);

								var field = _step2$value[0];
								var validationMethod = _step2$value[1];

								debug('Adding validation promise for ' + field);
								var pr = Promise.try(function () {
									return validationMethod.call(_this6);
								});
								promises.push(pr);
							};

							for (var _iterator2 = this[VALIDATORS][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

			function schema(fields) {

				return function decorator(modelClass) {
					var _this7 = this;

					modelClass[SCHEMA] = fields;

					var _loop3 = function _loop3(name) {
						if (!Object.hasOwnProperty(modelClass, name)) {
							Object.defineProperty(modelClass, name, {
								configurable: true,
								enumerable: true,
								get: function get() {
									return _this7.getValue(name);
								},
								set: function set(newval) {
									_this7.setValue(name, newval);
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
		}
	};
});
//# sourceMappingURL=data:application/json;base64,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
