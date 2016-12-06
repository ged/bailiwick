(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), require("inflection"), require("es6-error"));
	else if(typeof define === 'function' && define.amd)
		define("bailiwick", ["bluebird", "inflection", "es6-error"], factory);
	else if(typeof exports === 'object')
		exports["bailiwick"] = factory(require("bluebird"), require("inflection"), require("es6-error"));
	else
		root["bailiwick"] = factory(root["Promise"], root["inflection"], root["es6-error"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VERSION = undefined;
	
	var _model = __webpack_require__(1);
	
	Object.keys(_model).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _model[key];
	    }
	  });
	});
	
	var _datastore = __webpack_require__(9);
	
	Object.keys(_datastore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _datastore[key];
	    }
	  });
	});
	
	var _criteria = __webpack_require__(5);
	
	Object.keys(_criteria).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _criteria[key];
	    }
	  });
	});
	
	var _associations = __webpack_require__(11);
	
	Object.keys(_associations).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _associations[key];
	    }
	  });
	});
	
	var _validations = __webpack_require__(7);
	
	Object.keys(_validations).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _validations[key];
	    }
	  });
	});
	
	var _resultSet = __webpack_require__(4);
	
	Object.keys(_resultSet).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resultSet[key];
	    }
	  });
	});
	
	var _nullDatastore = __webpack_require__(12);
	
	Object.keys(_nullDatastore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _nullDatastore[key];
	    }
	  });
	});
	
	var _restService = __webpack_require__(13);
	
	Object.keys(_restService).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _restService[key];
	    }
	  });
	});
	
	var _errors = __webpack_require__(10);
	
	Object.keys(_errors).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _errors[key];
	    }
	  });
	});
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The default namespace
	 */
	
	var VERSION = exports.VERSION = '0.0.1-alpha.6'; /**
	                                                  * Bailiwick -- A more domain-ish model toolkit.
	                                                  * $Id$
	                                                  *
	                                                  * Authors
	                                                  * - Michael Granger <ged@FaerieMUD.org>
	                                                  */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Model = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.schema = schema;
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _inflection = __webpack_require__(3);
	
	var _inflection2 = _interopRequireDefault(_inflection);
	
	var _resultSet = __webpack_require__(4);
	
	var _validations = __webpack_require__(7);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * Use symbols for model object properties so they don't collide with
	 * data properties.
	 */
	var NEW_OBJECT = Symbol.for("newObject"),
	    DATA = Symbol.for("data"),
	    DIRTY_FIELDS = Symbol.for("dirtyFields"),
	    ASSOCIATIONS_CACHE = Symbol.for("associationsCache"),
	    DATASTORE = Symbol.for("datastore"),
	    VALIDATORS = Symbol.for("validators"),
	    ASSOCIATIONS = Symbol.for("associations"),
	    VALUE_STRING = Symbol.for("valueString"),
	    SCHEMA = Symbol.for("schema");
	
	/**
	* Bailiwick.Model
	*
	* The base model class.
	*
	*/
	
	var Model = exports.Model = function () {
		_createClass(Model, null, [{
			key: 'where',
	
	
			/**
	   * Request a ResultSet that will use the specified {parameters} in its criteria.
	   */
			value: function where(parameters) {
				return this.resultset.where(parameters);
			}
	
			/**
	   * Request a ResultSet that will use the specified {count} in its limit.
	   */
	
		}, {
			key: 'limit',
			value: function limit(count) {
				return this.resultset.limit(count);
			}
	
			/**
	   * Request a ResultSet that will use the specified {location} when fetching from
	   * the datastore.
	   */
	
		}, {
			key: 'from',
			value: function from(location) {
				return this.resultset.from(location);
			}
	
			/**
	   * Create one or more instances of the model from the specified {data}.
	   */
	
		}, {
			key: 'fromData',
			value: function fromData(data) {
				var _this = this;
	
				// debug( "Constructing %s objects from datastore data %o", this.name, data );
				if (Array.isArray(data)) {
					return data.map(function (record) {
						return Reflect.construct(_this, [record, false]);
					});
				} else {
					return Reflect.construct(this, [data, false]);
				}
			}
	
			/**
	   * Get instances of the model.
	   */
	
		}, {
			key: 'get',
			value: function get() {
				var _this2 = this;
	
				var idOrCriteria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
				return this.datastore.get(this, idOrCriteria).then(function (data) {
					return _this2.fromData(data);
				});
			}
	
			/**
	   * Create a new instance of the model and attempt to save it, returning a Promise
	   * that will be resolved with the new model instance if successful.
	   *
	   * @param {Object} fields  the model data
	   *
	   */
	
		}, {
			key: 'create',
			value: function create(fields) {
				var instance = Reflect.construct(this, [fields]);
				return instance.create();
			}
	
			/**
	   * Construct a new model object around the given {data}, marking it as new
	   * if {isNew} is true.
	   */
	
		}, {
			key: 'associations',
	
	
			/**
	   * Get the Map of associations defined for the class.
	   */
			get: function get() {
				if (!this[ASSOCIATIONS]) {
					this[ASSOCIATIONS] = new Map();
				}
				return this[ASSOCIATIONS];
			}
	
			/**
	   * Get the Map of validators defined for the class.
	   */
	
		}, {
			key: 'validators',
			get: function get() {
				if (!this[VALIDATORS]) {
					this[VALIDATORS] = new Map();
				}
				return this[VALIDATORS];
			}
	
			/**
	   * Get the relative URI for the service endpoint for the receiving class.
	   */
	
		}, {
			key: 'uri',
			get: function get() {
				return _inflection2.default.tableize(this.name);
			}
	
			/**
	   * Request the datastore associated with this model.
	   *
	   * @throws {Error}  if the datastore hasn't been set.
	   *
	   */
	
		}, {
			key: 'datastore',
			get: function get() {
				if (!this[DATASTORE]) {
					throw Error('No datastore has been set for ' + this);
				}
	
				return this[DATASTORE];
			}
	
			/**
	   * Set the datastore associated with this model.
	   */
			,
			set: function set(datastore) {
				(0, _utils.debug)('Datastore for ' + this + ' set to ' + datastore);
				this[DATASTORE] = datastore;
			}
	
			/**
	   * Get a clone of the ResultSet for this model class.
	   */
	
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
	
			// debug( `Created a new %s: %o`, this.constructor.name, data );
			this.defineAttributes(data);
		}
	
		/**
	  * Fetch the URI of the object.
	  */
	
	
		_createClass(Model, [{
			key: 'save',
	
	
			/**
	   * Store the model object in the object's store, calling #store() if the
	   * object is new, or #merge() with any modified fields if it's an existing
	   * object.
	   */
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
	
			/**
	   * Create the model object in the object's store and return a Promise that
	      * will resolve to the result.
	   */
	
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
						_this3[DATA]['id'] = result; // eslint-disable-line dot-notation
					}
	
					_this3[NEW_OBJECT] = false;
					_this3[DIRTY_FIELDS].clear();
					_this3.defineAttributes(_this3[DATA]);
	
					return _this3;
				});
			}
	
			/**
	   * Update any dirty fields in the model object in the object's store with values from the object
	      * and return a Promise that will resolve to the result.
	   */
	
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
	
			/**
	   * Replace the data in the object's store with all values from the object
	      * and return a Promise that will resolve to the result.
	   */
	
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
	
			/**
	   * Delete the object from the object's store and return a Promise that will resolve to the
	      * result.
	   */
	
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
	
			/*
	   * Attribute accessor API
	   */
	
			/**
	   * Data property reader
	   */
	
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
	
			/**
	   * Data property writer
	   */
	
		}, {
			key: 'setValue',
			value: function setValue(name, value) {
				// debug(`Setting ${name} to ${value}`);
				if (this[DATA][name] !== value) {
					this[DIRTY_FIELDS].add(name);
				}
				this[DATA][name] = value;
			}
	
			/**
	   * Define attribute accessors for the specified {attrs}.
	   */
	
		}, {
			key: 'defineAttributes',
			value: function defineAttributes(attrs) {
				var self = this;
	
				var _loop = function _loop(name) {
					if (!Object.hasOwnProperty(self, name)) {
						/* eslint-disable no-loop-func */
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
						/* eslint-enable no-loop-func */
					} else {
						(0, _utils.debug)('Already has a ' + name + ' property.');
					}
				};
	
				for (var name in attrs) {
					_loop(name);
				}
			}
	
			/**
	   * Returns {true} if the object has dirty (unsaved) attributes.
	   *
	   * @return {Boolean}
	   */
	
		}, {
			key: 'isDirty',
			value: function isDirty() {
				return this.isNew() || this[DIRTY_FIELDS].size !== 0;
			}
	
			/**
	   * Returns `true` if the object was created as opposed to fetched from a datastore.
	   *
	   * @return {Boolean}
	   */
	
		}, {
			key: 'isNew',
			value: function isNew() {
				return this[NEW_OBJECT];
			}
	
			/**
	   * Mark the object as clean (i.e., not requiring saving).
	   */
	
		}, {
			key: 'markClean',
			value: function markClean() {
				this[NEW_OBJECT] = false;
				this[DIRTY_FIELDS].clear();
			}
	
			/**
	   * Validate the model object by calling its validation methods.
	   *
	   * @returns {Promise}  resolves if the object is valid, rejects with an Array of
	   *   validation failures if not.
	   */
	
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
	
					// Wait for all validation promises to settle
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
	
			/**
	   * toString() API -- return a human-readable representation of the object.
	   */
	
		}, {
			key: VALUE_STRING,
	
	
			/**
	   * Return the object's data as a String containing fields and values suitable
	   * for debugging.
	   */
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
	
			/**
	   * Fetch the name of the model class of the object.
	   */
	
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
	
	/**
	 * Bailiwick.schema
	 *
	 * A decorator for declaring fields for a Model.
	 */
	
	
	function schema(fields) {
	
		return function decorator(modelClass) {
			var _this8 = this;
	
			modelClass[SCHEMA] = fields;
	
			var _loop3 = function _loop3(name) {
				if (!Object.hasOwnProperty(modelClass, name)) {
					/* eslint-disable no-loop-func */
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
					/* eslint-enable no-loop-func */
				} else {
					(0, _utils.debug)('Already has a ' + name + ' property.');
				}
			};
	
			for (var name in fields) {
				_loop3(name);
			}
		};
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResultSet = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _desc, _value, _class;
	
	var _criteria = __webpack_require__(5);
	
	var _utils = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	 * A monadic/fluid interface to an unreified set of Model objects made up of
	 * a Model class and a Criteria for selecting a subset of them.
	 *
	 * @class ResultSet
	 * @constructor
	 */
	var ResultSet = exports.ResultSet = (_class = function () {
		function ResultSet(model) {
			var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
			_classCallCheck(this, ResultSet);
	
			if (criteria === null) {
				criteria = new _criteria.Criteria();
			} else if (!(criteria instanceof _criteria.Criteria)) {
				criteria = new _criteria.Criteria(criteria);
			}
	
			this.model = model;
			this.criteria = criteria;
		}
	
		/**
	  * Return a Promise that will resolve as the reified results described by
	  * the ResultSet.
	  * @method get
	  */
	
	
		_createClass(ResultSet, [{
			key: 'get',
			value: function get() {
				var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
				var cr = this.criteria;
				if (limit) {
					cr = cr.limit(limit);
				}
				if (offset) {
					cr = cr.offset(offset);
				}
	
				(0, _utils.debug)('Fetching ' + this.model.name + ' results matching criteria: ', cr);
				return this.model.get(cr);
			}
	
			/*
	   * Monadic API
	   */
	
			/**
	   * Monadic API -- duplicate the ResultSet.
	   * @return {ResultSet} the cloned result set
	   */
	
		}, {
			key: 'clone',
			value: function clone() {
				return Reflect.construct(this.constructor, [this.model, this.criteria]);
			}
	
			/**
	   * Add selection criteria to the set.
	   * @method where
	   * @param {Object} params  key/value pairs that will be mapped to selection criteria.
	   * @return {ResultSet}  the cloned result set with the additional criteria.
	   */
	
		}, {
			key: 'where',
			value: function where(params) {
				(0, _utils.debug)("Cloning resultset to add params: ", params);
				this.criteria = this.criteria.filter(params);
			}
	
			/**
	   * Add a limit to the maximum size of the set.
	   * @method limit
	   * @param {Number} count  the maximum number of results in the set
	   * @return {ResultSet}  the cloned result set with the new limit.
	   */
	
		}, {
			key: 'limit',
			value: function limit(count) {
				(0, _utils.debug)("Cloned resultset to add limit: ", count);
				this.criteria = this.criteria.limit(count);
			}
	
			/**
	   * Add an offset into the set that should be the first element.
	   * @method index
	   * @param {Number} index  the index of the first element of the set of all
	   *                        matching model objects.
	   * @return {ResultSet}  the cloned result set with the new offset.
	   */
	
		}, {
			key: 'offset',
			value: function offset(index) {
				(0, _utils.debug)("Cloned resultset to add offset: ", index);
				this.criteria = this.criteria.offset(index);
			}
	
			/**
	   * Specify a different location to fetch results from.
	   * @method from
	   * @param {Object} location   the location to specify when using the datastore.
	   * @return {ResultSet}  the cloned result set with the new location.
	   */
	
		}, {
			key: 'from',
			value: function from(location) {
				(0, _utils.debug)("Clone resultset to change location: ", location);
				this.criteria = this.criteria.from(location);
			}
		}]);

		return ResultSet;
	}(), (_applyDecoratedDescriptor(_class.prototype, 'where', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'from'), _class.prototype)), _class);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Criteria = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _desc, _value, _class;
	
	var _utils = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	 * Fluent criteria for Bailiwick querying
	 *
	 * @class Criteria
	 * @constructor
	 *
	 */
	var Criteria = exports.Criteria = (_class = function () {
		_createClass(Criteria, null, [{
			key: "all",
			value: function all() {
				return Reflect.construct(this, []);
			}
		}]);
	
		function Criteria() {
			var pairs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
			_classCallCheck(this, Criteria);
	
			this.filterClauses = new Map();
			this.maxResultCount = null;
			this.resultOffset = null;
			this.location = null;
	
			for (var key in pairs) {
				this.filterClauses.set(key, pairs[key]);
			}
		}
	
		_createClass(Criteria, [{
			key: "clone",
			value: function clone() {
				var newObj = Reflect.construct(this.constructor, [{}]);
				newObj.filterClauses = new Map(this.filterClauses);
				newObj.maxResultCount = this.maxResultCount;
				newObj.resultOffset = this.resultOffset;
				return newObj;
			}
		}, {
			key: "hasFilter",
			value: function hasFilter() {
				return this.filterClauses.size > 0;
			}
	
			/**
	   * Create clone of the current criteria with the additional filter
	   * {pairs}.
	   */
	
		}, {
			key: "filter",
			value: function filter(pairs) {
				for (var key in pairs) {
					this.filterClauses.set(key, pairs[key]);
				}
			}
	
			/**
	   * Create a clone of the current criteria with its limit set to {newLimit}.
	   * @param {Integer} newLimit The new limit on how many objects to return.
	   */
	
		}, {
			key: "limit",
			value: function limit(newLimit) {
				this.maxResultCount = newLimit;
			}
	
			/**
	   * Create a clone of the current criteria with its offset set to {newOffset}.
	   * @param {Integer} newOffset The new index into the filtered set to use as the first
	   *                  result.
	   */
	
		}, {
			key: "offset",
			value: function offset(newOffset) {
				this.resultOffset = newOffset;
			}
	
			/**
	   * Create a clone of the current criteria with its location set to {newLocation}.
	   * @param {Object} location  The location the resource should be fetched from; the
	   *                           value of this parameter is datastore-dependent, and
	   *                           may not make sense for all of them.
	   */
	
		}, {
			key: "from",
			value: function from(newLocation) {
				this.location = newLocation;
			}
		}]);

		return Criteria;
	}(), (_applyDecoratedDescriptor(_class.prototype, "filter", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, "from"), _class.prototype)), _class);

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* -*- javascript -*- */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.monadic = monadic;
	exports.mapify = mapify;
	exports.demapify = demapify;
	var DEBUGGING_ENABLED = false;
	
	/**
	 * Enable/disable console debugging en masse if DEBUGGING_ENABLED is set.
	 */
	var debug = exports.debug = DEBUGGING_ENABLED ? console.debug : function () {};
	
	/**
	 * Decorator: @monadic
	 *
	 * Declare a method that acts as a monadic mutator -- calling it will operate on (and return)
	 * a clone of the receiving object instead of the receiver.
	 */
	function monadic(target, name, descriptor) {
		var realfunc = descriptor.value;
		descriptor.value = function () {
			var dup = this.clone();
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			realfunc.apply(dup, args);
			return dup;
		};
	
		return descriptor;
	}
	
	/*
	 * Originall extracted from es6-mapify by Jonathan Lipps <jlipps (at) gmail.com> to avoid
	 * the dependency on Traceur.
	 *
	 * Used under the terms of the Apache-2.0 license.
	 */
	
	/**
	 * Return a Map containing the properties of the specified {object}.
	 *
	 * @method mapify
	 * @param {Object,Array} object   the object to convert to a Map, or an Array of
	 *     objects to convert.
	 *
	 * @returns {Map}  the newly-created Map object, or an Array of converted Map
	 *     objects
	 */
	function mapify(obj) {
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || obj === null || obj instanceof Map) {
			return obj;
		}
	
		if (obj instanceof Array) {
			return obj.map(function (x) {
				return mapify(x);
			});
		} else {
			var _ret = function () {
				var m = new Map();
				Object.keys(obj).forEach(function (k) {
					m.set(k, mapify(obj[k]));
				});
				return {
					v: m
				};
			}();
	
			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
		}
	}
	
	/**
	 * Return an Object containing the key-value pairs of the specified {map} as
	 * properties.
	 *
	 * @method demapify
	 * @param {Map,Array} object   the Map to convert to an Objet, or an Array of
	 *     Maps to convert.
	 *
	 * @returns {Object}  the newly-created Object, or an Array of converted Object
	 */
	function demapify(obj) {
		if (obj instanceof Array) {
			debug("Demapifying an Array of Maps.");
			return obj.map(function (x) {
				return demapify(x);
			});
		} else if (!(obj instanceof Map)) {
			debug("Not a Map, returning it as-is.");
			return obj;
		}
	
		debug("Turning a Map into an Object.");
		var rval = {};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2),
				    k = _step$value[0],
				    v = _step$value[1];
	
				rval[k] = demapify(v);
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
	
		return rval;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ValidationErrors = exports.ValidationError = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.validator = validator;
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _es6Error = __webpack_require__(8);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VALIDATORS = Symbol.for("validators");
	
	/**
	 * Decorator: @validator
	 * Marks the decorated method as a validator
	 */
	function validator(field) {
		return function decorator(target, name, descriptor) {
			var methodBody = descriptor.value;
	
			// Promisify the method and add it to the list of validators
			descriptor.value = _bluebird2.default.method(methodBody);
			target.constructor.validators.set(field, descriptor.value);
	
			return descriptor;
		};
	}
	
	// Model validation failures
	
	var ValidationError = exports.ValidationError = function (_ExtendableError) {
		_inherits(ValidationError, _ExtendableError);
	
		function ValidationError(message) {
			var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
			_classCallCheck(this, ValidationError);
	
			var _this = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, message));
	
			_this.field = null;
	
			_this.field = field;
			return _this;
		}
	
		return ValidationError;
	}(_es6Error2.default);
	
	/**
	 * Validation error container
	 */
	
	
	var ValidationErrors = exports.ValidationErrors = function () {
		function ValidationErrors() {
			_classCallCheck(this, ValidationErrors);
	
			this.failures = new Map();
		}
	
		_createClass(ValidationErrors, [{
			key: 'add',
			value: function add(field, reason) {
				debug("Added a failued: ", field, reason);
				this.failures.set(field, reason);
			}
		}, {
			key: 'isEmpty',
			value: function isEmpty() {
				return this.size === 0;
			}
		}, {
			key: 'fields',
			get: function get() {
				var fields = [];
				// :FIXME: Use an Array comprehension once those are stable
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.failures.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var field = _step.value;
						fields.push(field);
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
	
				return fields;
			}
		}, {
			key: 'fullMessages',
			get: function get() {
				var messages = [];
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.failures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    field = _step2$value[0],
						    reason = _step2$value[1];
	
						messages.push(field + ' ' + reason);
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
	
				return messages;
			}
		}, {
			key: 'size',
			get: function get() {
				return this.failures.size;
			}
		}]);

		return ValidationErrors;
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	
	/* eslint-disable no-unused-vars */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Datastore = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.datastore = datastore;
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _errors = __webpack_require__(10);
	
	var _criteria = __webpack_require__(5);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Datastore decorator -- syntactic sugar for setting the `datastore`
	 * member of the decorated class's prototype.
	 */
	function datastore(type) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}
	
		return function decorator(target) {
			var ds = Reflect.construct(type, args);
			(0, _utils.debug)("Setting datastore of ", target, " to ", ds);
			target.datastore = ds;
		};
	}
	
	/**
	 * The base class for Bailiwick datastore classes.
	 *
	 * A datastore is the object responsible for fetching, storing, updating, and deleting
	 * data for one or more domain Model objects, as well as caching and some other
	 * utility functions.
	 *
	 * A Model class should create an instance of (a derivative of) this class as its
	 * `datastore` attribute.
	 *
	 * @class Datastore
	 * @constructor
	 */
	
	var Datastore = exports.Datastore = function () {
		function Datastore() {
			_classCallCheck(this, Datastore);
		}
	
		_createClass(Datastore, [{
			key: 'get',
	
	
			/**
	   * Create a new Datastore -- not used directly, as this is an abstract class.
	   */
			// constructor() {}
	
			/**
	   * Get the data associated with the model class of the specified {type} and
	   * {criteria}.
	   *
	   * @method get
	   * @param {Class} type  the type of data to fetch
	   * @param {Criteria, Integer} criteria  the criteria that determines what
	   *    specific data is fetched. If it's a Integer, it's assumed to be an ID,
	   *    and a single object is fetched. If it's either `null` or a `Criteria`
	   *    object, an Array of all matching objects are fetched.
	   *
	   * @returns {Promise} the promise that resolves to the results, or rejects
	   *    if fetching by ID and no data for that object is available.
	   */
			value: function get(type) {
				var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
				// Collection API if the criteria is a Criteria
				if (criteria instanceof _criteria.Criteria) {
					(0, _utils.debug)("Fetch with criteria!");
					return this.getCollection(type, criteria);
				} else {
					(0, _utils.debug)("Fetch by ID!");
					return this.getInstance(type, criteria);
				}
			}
	
			/**
	   * The "collection" getter -- derivatives of this class should implement this
	   * for fetching collections matching the given {criteria}.
	   *
	   * @params {Class}    type      the type of data to fetch.
	   * @params {Criteria} criteria  the matching criteria to use to filter the
	   *    returned collection. If this is `null`, the entire collection should be
	   *    returned.
	   *
	   * @returns {Promise}  a promise that should resolve to the Array of results.
	   *
	   * @protected
	   */
	
		}, {
			key: 'getCollection',
			value: function getCollection(type, criteria) {
				// eslint-disable-line no-unused-vars
				return _bluebird2.default.reject(new _errors.NotImplementedError("getCollection"));
			}
	
			/**
	   * The "instance" getter -- derivatives of this class should implement this
	   * for fetching data for a single object by its ID.
	   *
	   * @params {Class}    type   the type of data to fetch.
	   * @params {Integer}  id     the ID of the object to fetch.
	   *
	   * @returns {Promise}  a promise that should resolve to the data for the requested
	   *    object. If the object doesn't exist, the promise should reject with an
	   *    appropriate Error.
	   *
	   * @protected
	   */
	
		}, {
			key: 'getInstance',
			value: function getInstance(type, id) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("getInstance"));
			}
	
			/**
	   * Derivatives of this class should provide an implementation of this for storing
	   * new data in the store.
	   *
	   * @params {Class}    type   the type of data to fetch
	   * @params {Object}   data   the data to store for the new object
	   *
	   * @returns {Promise}  a promise that should resolve to the ID of the newly-stored
	   *    object on success, or reject with an appropriate `Error` if the object
	   *    could not be stored for some reason.
	   *
	   */
	
		}, {
			key: 'store',
			value: function store(type, data) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("store"));
			}
	
			/**
	   * Derivatives of this class should provide an implementation of this for updating
	   * the data in the store for an IDed object.
	   *
	   * @params {Class}    type   the type of data to fetch
	   * @params {Integer}  id     the ID of the object to update
	   * @params {Object}   data   the data to merge with the current data for the new object
	   *
	   * @returns {Promise}  a promise that should resolve to the merged data for the object
	   */
	
		}, {
			key: 'update',
			value: function update(type, id, data) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("update"));
			}
	
			/**
	   * Derivatives of this class should provide an implementation of this for replacing
	   * the data in the store for an IDed object.
	   *
	   * @params {Class}    type   the type of data to fetch
	   * @params {Integer}  id     the ID of the object to replace
	   * @params {Object}   data   the replacement data
	   *
	   * @returns {Promise}  a promise that should resolve to the data being replaced.
	   */
	
		}, {
			key: 'replace',
			value: function replace(type, id, data) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("replace"));
			}
	
			/**
	   * Derivatives of this class should provide an implementation of this for removing
	   * data from the store.
	   *
	   * @params {Class}    type   the type of data to fetch
	   * @params {Integer}  id     the ID of the object to remove
	   *
	   * @returns {Promise}  a promise that should resolve to `true` if the object
	   *    was in the store prior to the removal, or `false` if it was not.
	   */
	
		}, {
			key: 'remove',
			value: function remove(type, id) {
				return _bluebird2.default.reject(new _errors.NotImplementedError("remove"));
			}
		}]);

		return Datastore;
	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ServerError = exports.RequestError = exports.HTTPError = exports.NotImplementedError = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(["Expected an error response, but got: ", ""], ["Expected an error response, but got: ", ""]);
	
	var _es6Error = __webpack_require__(8);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotImplementedError = exports.NotImplementedError = function (_ExtendableError) {
		_inherits(NotImplementedError, _ExtendableError);
	
		function NotImplementedError(methodname) {
			_classCallCheck(this, NotImplementedError);
	
			return _possibleConstructorReturn(this, (NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call(this, "No implementation provided for " + methodname + "(...)"));
		}
	
		return NotImplementedError;
	}(_es6Error2.default);
	
	var HTTPError = exports.HTTPError = function (_ExtendableError2) {
		_inherits(HTTPError, _ExtendableError2);
	
		_createClass(HTTPError, null, [{
			key: "fromResponse",
			value: function fromResponse(response) {
				if (response.ok) {
					raise(_templateObject, response);
				}
	
				switch (Math.floor(response.status / 100)) {
					case 4:
						return new RequestError(response);
						break;
					case 5:
						return new ServerError(response);
						break;
					default:
						return new HTTPError(response);
				}
			}
		}]);
	
		function HTTPError(response) {
			_classCallCheck(this, HTTPError);
	
			var _this2 = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, "[" + response.status + "] " + response.statusText));
	
			_this2.status = 500;
			_this2.statusText = "Unknown error";
			_this2.response = null;
	
			_this2.status = response.status;
			_this2.statusText = response.statusText;
			_this2.response = response;
			return _this2;
		}
	
		/**
	  * toString() API -- return a human-readable representation of the object.
	  */
	
	
		_createClass(HTTPError, [{
			key: Symbol.toStringTag,
			get: function get() {
				return "<" + this.constructor.name + " [" + this.status + "]: " + this.statusText + ">";
			}
		}]);
	
		return HTTPError;
	}(_es6Error2.default);
	
	// 4xx responses
	
	
	var RequestError = exports.RequestError = function (_HTTPError) {
		_inherits(RequestError, _HTTPError);
	
		function RequestError() {
			_classCallCheck(this, RequestError);
	
			return _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).apply(this, arguments));
		}
	
		return RequestError;
	}(HTTPError);
	
	// 5xx responses
	
	
	var ServerError = exports.ServerError = function (_HTTPError2) {
		_inherits(ServerError, _HTTPError2);
	
		function ServerError() {
			_classCallCheck(this, ServerError);
	
			return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).apply(this, arguments));
		}
	
		return ServerError;
	}(HTTPError);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	"use strict";
	/* eslint-disable */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.oneToMany = oneToMany;
	exports.oneToOne = oneToOne;
	exports.manyToOne = manyToOne;
	
	var _inflection = __webpack_require__(3);
	
	var _inflection2 = _interopRequireDefault(_inflection);
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NullDatastore = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _datastore = __webpack_require__(9);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * An in-memory datastore (for testing)
	 *
	 * @class NullDatastore
	 * @constructor
	 *
	 */
	var NullDatastore = exports.NullDatastore = function (_Datastore) {
		_inherits(NullDatastore, _Datastore);
	
		/**
	  * Create a new NullDatastore
	  */
		function NullDatastore() {
			_classCallCheck(this, NullDatastore);
	
			var _this = _possibleConstructorReturn(this, (NullDatastore.__proto__ || Object.getPrototypeOf(NullDatastore)).call(this));
	
			_this.objects = new Map();
			_this.ids = new Map();
			return _this;
		}
	
		/**
	  * Fetch the internal collection for the given object {type}.
	  * @method getCollectionForType
	  * @protected
	  */
	
	
		_createClass(NullDatastore, [{
			key: 'getCollectionForType',
			value: function getCollectionForType(type) {
				if (!this.objects.has(type)) {
					(0, _utils.debug)("ObjectStore doesn't have a %s collection; creating one.", type);
					this.objects.set(type, new Map());
					this.ids.set(type, 0);
				}
	
				return this.objects.get(type);
			}
	
			/**
	   * Get API -- get an instance of the specified object {type} that corresponds to the
	   * given {id}.
	   *
	   * @method getInstance
	   * @param {Class} type  the class of object to fetch data for
	   * @param {Integer} id  the ID of the object whose data should be fetched.
	   *
	   * @returns {Promise} the promise that resolves to the object data.
	   */
	
		}, {
			key: 'getInstance',
			value: function getInstance(type, id) {
				(0, _utils.debug)('Getting instance ' + id + ' of ' + type.name);
				var collection = this.getCollectionForType(type);
	
				if (collection.has(id)) {
					return _bluebird2.default.resolve(collection.get(id));
				} else {
					return _bluebird2.default.reject(new Error('No such ' + type.name + ' ID=' + id));
				}
			}
	
			/**
	   * Get API -- get the collection of data for the objects of the specified {type}
	   * that match the given {criteria}.
	   *
	   * @method getCollection
	   * @param {Class} type  the class of object to fetch data for
	   * @param {Criteria} criteria  the Criteria object that describes the collection of
	   *                             objects to fetch.
	   *
	   * @returns {Promise} the promise that resolves to an Array of matching object data.
	   */
	
		}, {
			key: 'getCollection',
			value: function getCollection(type, criteria) {
				(0, _utils.debug)('Getting %s collection matching: %o', type.name, criteria);
				var collection = this.getCollectionForType(type);
				var results = void 0;
	
				if (criteria) {
					(0, _utils.debug)("Filtered fetch over collection of %d objects!", collection.size);
					var matches = this.findMatchingObjects(collection, criteria);
					(0, _utils.debug)("Found %d matches: %o", matches.length, matches);
					results = Array.from(matches);
				} else {
					(0, _utils.debug)("Unfiltered fetch!");
					results = Array.from(collection.values());
				}
	
				(0, _utils.debug)('result is a ' + (typeof results === 'undefined' ? 'undefined' : _typeof(results)));
				return _bluebird2.default.resolve(results);
			}
	
			/**
	   * Build an Array of matches for the specified {criteria} from the given {collection}.
	   *
	   * @method findMatchingObjects
	   * @param {Iterable} collection  the collection of object data.
	   * @param {Criteria} criteria    the criteria object used to filter the {collection}.
	   *
	   * @returns {Array} the matching data.
	   * @protected
	   */
	
		}, {
			key: 'findMatchingObjects',
			value: function findMatchingObjects(collection, criteria) {
				// This should filter, limit, offset, etc.
				var filterFunc = this.makeFilterFunction(criteria);
				var matches = [];
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = collection.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var obj = _step.value;
	
						if (filterFunc(obj)) {
							matches.push(obj);
						}
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
	
				return matches;
			}
	
			/**
	   * Build a function that can be used to filter a data collection using the specified
	   * {criteria}.
	   *
	   * @method makeFilterFunction
	   * @param {Criteria} criteria    the criteria object used to filter the {collection}.
	   *
	   * @returns {Function} the filter function
	   * @protected
	   */
	
		}, {
			key: 'makeFilterFunction',
			value: function makeFilterFunction(criteria) {
				var clauses = [];
	
				if (criteria.filterClauses) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = criteria.filterClauses.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var key = _step2.value;
	
							clauses.push([key, criteria.filterClauses.get(key)]);
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
				}
	
				return function (obj) {
					return clauses.every(function (pair) {
						var _pair = _slicedToArray(pair, 2),
						    key = _pair[0],
						    val = _pair[1];
	
						return obj[key] === val;
					});
				};
			}
	
			/**
	   * Store the specified {data} in the collection of the specified {type}.
	   *
	   * @method store
	   * @param {Class} type  the collection to store the data in
	   * @param {Object} data    the object data to store
	   *
	   * @returns {Promise} the promise that resolves to the ID assigned to the new object
	   */
	
		}, {
			key: 'store',
			value: function store(type, data) {
				var collection = this.getCollectionForType(type);
				var id = this.ids.get(type) + 1;
				this.ids.set(type, id);
	
				(0, _utils.debug)('Storing ' + type.name + ' ID=' + id);
				collection.set(id, data);
				return _bluebird2.default.resolve(id);
			}
	
			/**
	   * Update the data for the object of the specified {type} and {id} with {data}.
	   *
	   * @method update
	   * @param {Class}   type   the collection to store the data in
	   * @param {Integer} id     the ID of the object to update
	   * @param {Object}  data   the object data to store
	   *
	   * @returns {Promise} the promise that resolves to the updated object data
	   */
	
		}, {
			key: 'update',
			value: function update(type, id, data) {
				var collection = this.getCollectionForType(type);
				var current = collection.get(id);
	
				if (!current) {
					return _bluebird2.default.reject(new Error('No such ' + type.name + ' ID=' + id));
				}
	
				(0, _utils.debug)('Merging ' + type.name + ' ID=' + id);
				Object.assign(current, data);
	
				return _bluebird2.default.resolve(current);
			}
	
			/**
	   * Replace the data for the object of the specified {type} and {id} with {data}.
	   *
	   * @method replace
	   * @param {Class}   type   the collection to store the data in
	   * @param {Integer} id     the ID of the object to replace
	   * @param {Object}  data   the object data to store
	   *
	   * @returns {Promise} the promise that resolves to the new object data
	   */
	
		}, {
			key: 'replace',
			value: function replace(type, id, data) {
				var collection = this.getCollectionForType(type);
				var current = collection.get(id);
				collection.set(id, data);
				return _bluebird2.default.resolve(current);
			}
	
			/**
	   * Delete the data for the object of the specified {type} and {id}.
	   *
	   * @method remove
	   * @param {Class}   type   the collection to remove the object from
	   * @param {Integer} id     the ID of the object to remove
	   *
	   * @returns {Promise} the promise that resolves to `true` if the object existed
	   *                    or `false` if it did not.
	   */
	
		}, {
			key: 'remove',
			value: function remove(type, id) {
				var collection = this.getCollectionForType(type);
				var result = collection.delete(id);
				return _bluebird2.default.resolve(result);
			}
	
			/**
	   * Clear all saved data and ID generators from the store.
	   *
	   * @method _clear
	   * @protected
	   */
	
		}, {
			key: '_clear',
			value: function _clear() {
				this.objects.clear();
			}
		}]);

		return NullDatastore;
	}(_datastore.Datastore);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- javascript -*- */
	/* eslint-disable no-unused-vars */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RESTService = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _desc, _value, _class;
	
	var _bluebird = __webpack_require__(2);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _datastore = __webpack_require__(9);
	
	var _errors = __webpack_require__(10);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	var RESTService = exports.RESTService = (_class = function (_Datastore) {
		_inherits(RESTService, _Datastore);
	
		function RESTService() {
			var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://localhost/';
	
			_classCallCheck(this, RESTService);
	
			var _this = _possibleConstructorReturn(this, (RESTService.__proto__ || Object.getPrototypeOf(RESTService)).call(this));
	
			if (typeof fetch === 'undefined') {
				throw new Error('RESTService requires a fetch polyfill');
			}
	
			if (!baseUrl.endsWith('/')) {
				baseUrl = baseUrl + '/';
			}
	
			_this.baseUrl = baseUrl;
			_this.httpClient = { fetch: fetch };
			return _this;
		}
	
		/**
	  * Return a copy of the reciving object.
	  */
	
	
		_createClass(RESTService, [{
			key: 'clone',
			value: function clone() {
				var newObj = Reflect.construct(this.constructor, [this.baseUrl]);
				newObj.httpClient = this.httpClient;
				return newObj;
			}
	
			/**
	   * Return a clone of the original datastore that uses the {newHttpClient} instead of
	   * whatever it was using before.
	   */
	
		}, {
			key: 'forUrl',
			value: function forUrl(newBaseUrl) {
				this.baseUrl = newBaseUrl;
			}
	
			/**
	   * Return a clone of the original datastore that uses the {newHttpClient} instead of
	   * whatever it was using before.
	   */
	
		}, {
			key: 'using',
			value: function using(newHttpClient) {
				this.httpClient = newHttpClient;
			}
	
			/**
	   * Send an request with the specified {verb} via the HTTP client to the given {url},
	   * serializing the {body} (if given) as JSON, and de-serializing the result (if it's a
	   * JSON response).
	   */
	
		}, {
			key: 'sendJsonRequest',
			value: function sendJsonRequest(url) {
				var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
				var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
				var info = {
					method: method,
					body: body,
					headers: headers
				};
	
				if (!(url.startsWith('http:') || url.startsWith('https:'))) {
					if (url.startsWith('/')) {
						url = url.slice(1);
					}
					url = '' + this.baseUrl + url;
				}
	
				if (info.body && typeof body !== 'string') {
					info.body = JSON.stringify(body);
					info.headers['Content-type'] = "application/json; charset=UTF-8";
				}
	
				return this.httpClient.fetch(url, info).then(function (response) {
					if (!response.ok) {
						var err = _errors.HTTPError.fromResponse(response);
						return _bluebird2.default.reject(err);
					}
	
					var mediatype = response.headers.get('content-type');
					if (mediatype && mediatype.startsWith('application/json')) {
						(0, _utils.debug)("Got JSON response; deserializing.");
						return response.json();
					} else {
						(0, _utils.debug)("Got a %s response; using the raw text.", mediatype);
						return response.text();
					}
				});
			}
	
			/**
	   * Fetch a single instance of the specified {type} with the given {id}, and return
	   * a Promise that resolves to it.
	   */
	
		}, {
			key: 'getInstance',
			value: function getInstance(type, id) {
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
	
		}, {
			key: 'getCollection',
			value: function getCollection(type, criteria) {
				var uri = criteria.location || type.uri;
				var params = this.makeParamsFromCriteria(criteria);
				var queryString = this.queryStringFromParams(params);
	
				(0, _utils.debug)("GET %s params: %o", uri, params);
				if (queryString !== '') {
					uri += '?' + queryString;
				}
	
				return this.sendJsonRequest(uri);
			}
	
			/**
	   * Store a new instance of the specified {type} with the given {data} via the REST service,
	   * and return a Promise that resolves to the result.
	   */
	
		}, {
			key: 'store',
			value: function store(type, data) {
				return this.sendJsonRequest(type.uri, 'POST', data);
			}
	
			/**
	   * Update the instance of the specified {type} with the given {id} via the REST
	   * service using the specified {data}, and return a Promise that resolves to the result.
	   */
	
		}, {
			key: 'update',
			value: function update(type, id, data) {
				var uri = type.uri + '/' + id;
				return this.sendJsonRequest(uri, 'POST', data);
			}
	
			/**
	   * Replace the data for the instance of the specified {type} with the given {id} via the REST
	   * service using the specified {data}, and return a Promise that resolves to the result.
	   */
	
		}, {
			key: 'replace',
			value: function replace(type, id, data) {
				var uri = type.uri + '/' + id;
				return this.sendJsonRequest(uri, 'PUT', data);
			}
	
			/**
	   * Delete the instance of the specified {type} with the given {id} via the REST service and
	   * return a Promise that resolves to the result.
	   */
	
		}, {
			key: 'remove',
			value: function remove(type, id) {
				var uri = type.uri + '/' + id;
				return this.sendJsonRequest(uri, 'DELETE');
			}
	
			/*
	   * Utility functions
	   */
	
			/**
	   * Turn the specified {criteria} into a Map of parameters suitable for passing in an Xhr
	   * request.
	   */
	
		}, {
			key: 'makeParamsFromCriteria',
			value: function makeParamsFromCriteria(criteria) {
				if (!criteria) {
					return null;
				}
	
				var params = new Map();
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = criteria.filterClauses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2),
						    key = _step$value[0],
						    val = _step$value[1];
	
						(0, _utils.debug)('Adding parameter ' + key + '=' + val + ' from criteria\'s filter clauses.');
						params.set(key, val);
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
	
				if (criteria.maxResultCount) {
					params.set('limit', criteria.maxResultCount);
				}
				if (criteria.resultOffset) {
					params.set('offset', criteria.resultOffset);
				}
	
				(0, _utils.debug)('Returning Map with ' + params.size + ' params');
				return params;
			}
	
			/**
	   * Turn the specified {params} Object into a URL-encoded query string.
	   */
	
		}, {
			key: 'queryStringFromParams',
			value: function queryStringFromParams(params) {
				(0, _utils.debug)('Making query string from ' + params.size + ' params: ', Array.from(params.entries()));
	
				if (!params) {
					return '';
				}
	
				var pairs = [];
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = params.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    key = _step2$value[0],
						    val = _step2$value[1];
	
						var encKey = encodeURIComponent(key);
						var encVal = encodeURIComponent(val);
						(0, _utils.debug)("  adding pair: %s=%s", encKey, encVal);
						pairs.push(encKey + '=' + encVal);
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
	
				(0, _utils.debug)("Returning query string of %d param pairs.", pairs.length);
				return pairs.join('&');
			}
		}]);

		return RESTService;
	}(_datastore.Datastore), (_applyDecoratedDescriptor(_class.prototype, 'forUrl', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'forUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'using', [_utils.monadic], Object.getOwnPropertyDescriptor(_class.prototype, 'using'), _class.prototype)), _class);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bailiwick.js.map