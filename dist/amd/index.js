define(['exports', './model', './datastore', './criteria', './associations', './validations', './result-set', './null-datastore', './rest-service', './errors', 'bluebird'], function (exports, _model, _datastore, _criteria, _associations, _validations, _resultSet, _nullDatastore, _restService, _errors, _bluebird) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VERSION = undefined;
  Object.keys(_model).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _model[key];
      }
    });
  });
  Object.keys(_datastore).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _datastore[key];
      }
    });
  });
  Object.keys(_criteria).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _criteria[key];
      }
    });
  });
  Object.keys(_associations).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _associations[key];
      }
    });
  });
  Object.keys(_validations).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _validations[key];
      }
    });
  });
  Object.keys(_resultSet).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _resultSet[key];
      }
    });
  });
  Object.keys(_nullDatastore).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _nullDatastore[key];
      }
    });
  });
  Object.keys(_restService).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _restService[key];
      }
    });
  });
  Object.keys(_errors).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _errors[key];
      }
    });
  });

  var _bluebird2 = _interopRequireDefault(_bluebird);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var VERSION = exports.VERSION = '0.0.1-alpha.4';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlZFUlNJT04iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFnQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7O0FBWk8sTUFBSUEsNEJBQVUsZUFBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
