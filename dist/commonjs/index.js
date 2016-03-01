'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = undefined;

var _model = require('./model');

for (let _key in _model) {
  if (_key === "default") continue;

  _Object$defineProperty(exports, _key, {
    enumerable: true,
    get: function () {
      return _model[_key];
    }
  });
}

var _datastore = require('./datastore');

for (let _key2 in _datastore) {
  if (_key2 === "default") continue;

  _Object$defineProperty(exports, _key2, {
    enumerable: true,
    get: function () {
      return _datastore[_key2];
    }
  });
}

var _criteria = require('./criteria');

for (let _key3 in _criteria) {
  if (_key3 === "default") continue;

  _Object$defineProperty(exports, _key3, {
    enumerable: true,
    get: function () {
      return _criteria[_key3];
    }
  });
}

var _associations = require('./associations');

for (let _key4 in _associations) {
  if (_key4 === "default") continue;

  _Object$defineProperty(exports, _key4, {
    enumerable: true,
    get: function () {
      return _associations[_key4];
    }
  });
}

var _validations = require('./validations');

for (let _key5 in _validations) {
  if (_key5 === "default") continue;

  _Object$defineProperty(exports, _key5, {
    enumerable: true,
    get: function () {
      return _validations[_key5];
    }
  });
}

var _resultSet = require('./result-set');

for (let _key6 in _resultSet) {
  if (_key6 === "default") continue;

  _Object$defineProperty(exports, _key6, {
    enumerable: true,
    get: function () {
      return _resultSet[_key6];
    }
  });
}

var _nullDatastore = require('./null-datastore');

for (let _key7 in _nullDatastore) {
  if (_key7 === "default") continue;

  _Object$defineProperty(exports, _key7, {
    enumerable: true,
    get: function () {
      return _nullDatastore[_key7];
    }
  });
}

var _restService = require('./rest-service');

for (let _key8 in _restService) {
  if (_key8 === "default") continue;

  _Object$defineProperty(exports, _key8, {
    enumerable: true,
    get: function () {
      return _restService[_key8];
    }
  });
}

var _errors = require('./errors');

for (let _key9 in _errors) {
  if (_key9 === "default") continue;

  _Object$defineProperty(exports, _key9, {
    enumerable: true,
    get: function () {
      return _errors[_key9];
    }
  });
}

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

require('babel/polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlTyxJQUFJLDRCQUFVLFdBQVYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJhaWxpd2ljayAtLSBBIG1vcmUgZG9tYWluLWlzaCBtb2RlbCB0b29sa2l0LlxuICogJElkJFxuICpcbiAqIEF1dGhvcnNcbiAqIC0gTWljaGFlbCBHcmFuZ2VyIDxnZWRARmFlcmllTVVELm9yZz5cbiAqL1xuXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJztcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBuYW1lc3BhY2VcbiAqL1xuXG5leHBvcnQgdmFyIFZFUlNJT04gPSAnMC4wLjEuZGV2JztcblxuZXhwb3J0ICogZnJvbSAnLi9tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGFzdG9yZSc7XG5leHBvcnQgKiBmcm9tICcuL2NyaXRlcmlhJztcbmV4cG9ydCAqIGZyb20gJy4vYXNzb2NpYXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vdmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXN1bHQtc2V0JztcblxuZXhwb3J0ICogZnJvbSAnLi9udWxsLWRhdGFzdG9yZSc7XG5leHBvcnQgKiBmcm9tICcuL3Jlc3Qtc2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vZXJyb3JzJztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
