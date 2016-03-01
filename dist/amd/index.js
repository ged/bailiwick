import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
define(['exports', './model', './datastore', './criteria', './associations', './validations', './result-set', './null-datastore', './rest-service', './errors', 'bluebird', 'babel/polyfill'], function (exports, _model, _datastore, _criteria, _associations, _validations, _resultSet, _nullDatastore, _restService, _errors, _bluebird) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VERSION = undefined;

  for (let _key in _model) {
    if (_key === "default") continue;

    _Object$defineProperty(exports, _key, {
      enumerable: true,
      get: function () {
        return _model[_key];
      }
    });
  }

  for (let _key2 in _datastore) {
    if (_key2 === "default") continue;

    _Object$defineProperty(exports, _key2, {
      enumerable: true,
      get: function () {
        return _datastore[_key2];
      }
    });
  }

  for (let _key3 in _criteria) {
    if (_key3 === "default") continue;

    _Object$defineProperty(exports, _key3, {
      enumerable: true,
      get: function () {
        return _criteria[_key3];
      }
    });
  }

  for (let _key4 in _associations) {
    if (_key4 === "default") continue;

    _Object$defineProperty(exports, _key4, {
      enumerable: true,
      get: function () {
        return _associations[_key4];
      }
    });
  }

  for (let _key5 in _validations) {
    if (_key5 === "default") continue;

    _Object$defineProperty(exports, _key5, {
      enumerable: true,
      get: function () {
        return _validations[_key5];
      }
    });
  }

  for (let _key6 in _resultSet) {
    if (_key6 === "default") continue;

    _Object$defineProperty(exports, _key6, {
      enumerable: true,
      get: function () {
        return _resultSet[_key6];
      }
    });
  }

  for (let _key7 in _nullDatastore) {
    if (_key7 === "default") continue;

    _Object$defineProperty(exports, _key7, {
      enumerable: true,
      get: function () {
        return _nullDatastore[_key7];
      }
    });
  }

  for (let _key8 in _restService) {
    if (_key8 === "default") continue;

    _Object$defineProperty(exports, _key8, {
      enumerable: true,
      get: function () {
        return _restService[_key8];
      }
    });
  }

  for (let _key9 in _errors) {
    if (_key9 === "default") continue;

    _Object$defineProperty(exports, _key9, {
      enumerable: true,
      get: function () {
        return _errors[_key9];
      }
    });
  }

  var _bluebird2 = _interopRequireDefault(_bluebird);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The default namespace
   */

  /**
   * Bailiwick -- A more domain-ish model toolkit.
   * $Id$
   *
   * Authors
   * - Michael Granger <ged@FaerieMUD.org>
   */

  var VERSION = exports.VERSION = '0.0.1.dev';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZU8sTUFBSSw0QkFBVSxXQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCYWlsaXdpY2sgLS0gQSBtb3JlIGRvbWFpbi1pc2ggbW9kZWwgdG9vbGtpdC5cbiAqICRJZCRcbiAqXG4gKiBBdXRob3JzXG4gKiAtIE1pY2hhZWwgR3JhbmdlciA8Z2VkQEZhZXJpZU1VRC5vcmc+XG4gKi9cblxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0ICdiYWJlbC9wb2x5ZmlsbCc7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgbmFtZXNwYWNlXG4gKi9cblxuZXhwb3J0IHZhciBWRVJTSU9OID0gJzAuMC4xLmRldic7XG5cbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhc3RvcmUnO1xuZXhwb3J0ICogZnJvbSAnLi9jcml0ZXJpYSc7XG5leHBvcnQgKiBmcm9tICcuL2Fzc29jaWF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL3ZhbGlkYXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vcmVzdWx0LXNldCc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbnVsbC1kYXRhc3RvcmUnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXN0LXNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2Vycm9ycyc7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
