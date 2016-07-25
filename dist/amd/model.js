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
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
			key: 'delete',
			value: function _delete() {
				var _this5 = this;

				if (this.id) {
					return this[DATASTORE].remove(this.constructor, this.id).then(function () {
						return _this5;
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
				var _this6 = this;

				this.errors = new _validations.ValidationErrors();
				var promises = [];

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					var _loop2 = function _loop2() {
						var _step2$value = _slicedToArray(_step2.value, 2);

						var field = _step2$value[0];
						var validationMethod = _step2$value[1];

						(0, _utils.debug)('Adding validation promise for ' + field);
						var pr = _bluebird2.default.try(function () {
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
					(0, _utils.debug)('Already has a ' + name + ' property.');
				}
			};

			for (var name in fields) {
				_loop3(name);
			}
		};
	}
});
//# sourceMappingURL=data:application/json;base64,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
