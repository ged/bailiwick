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
