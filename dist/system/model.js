
"use strict";

System.register(['bluebird', 'inflection', './result-set', './validations', './utils'], function (_export, _context) {
	"use strict";

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
