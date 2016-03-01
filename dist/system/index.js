'use strict';

System.register(['bluebird', 'babel/polyfill', './model', './datastore', './criteria', './associations', './validations', './result-set', './null-datastore', './rest-service', './errors'], function (_export, _context) {
  var Promise, VERSION;
  return {
    setters: [function (_bluebird) {
      Promise = _bluebird.default;
    }, function (_babelPolyfill) {}, function (_model) {
      var _exportObj = {};

      for (var _key in _model) {
        if (_key !== "default") _exportObj[_key] = _model[_key];
      }

      _export(_exportObj);
    }, function (_datastore) {
      var _exportObj2 = {};

      for (var _key2 in _datastore) {
        if (_key2 !== "default") _exportObj2[_key2] = _datastore[_key2];
      }

      _export(_exportObj2);
    }, function (_criteria) {
      var _exportObj3 = {};

      for (var _key3 in _criteria) {
        if (_key3 !== "default") _exportObj3[_key3] = _criteria[_key3];
      }

      _export(_exportObj3);
    }, function (_associations) {
      var _exportObj4 = {};

      for (var _key4 in _associations) {
        if (_key4 !== "default") _exportObj4[_key4] = _associations[_key4];
      }

      _export(_exportObj4);
    }, function (_validations) {
      var _exportObj5 = {};

      for (var _key5 in _validations) {
        if (_key5 !== "default") _exportObj5[_key5] = _validations[_key5];
      }

      _export(_exportObj5);
    }, function (_resultSet) {
      var _exportObj6 = {};

      for (var _key6 in _resultSet) {
        if (_key6 !== "default") _exportObj6[_key6] = _resultSet[_key6];
      }

      _export(_exportObj6);
    }, function (_nullDatastore) {
      var _exportObj7 = {};

      for (var _key7 in _nullDatastore) {
        if (_key7 !== "default") _exportObj7[_key7] = _nullDatastore[_key7];
      }

      _export(_exportObj7);
    }, function (_restService) {
      var _exportObj8 = {};

      for (var _key8 in _restService) {
        if (_key8 !== "default") _exportObj8[_key8] = _restService[_key8];
      }

      _export(_exportObj8);
    }, function (_errors) {
      var _exportObj9 = {};

      for (var _key9 in _errors) {
        if (_key9 !== "default") _exportObj9[_key9] = _errors[_key9];
      }

      _export(_exportObj9);
    }],
    execute: function () {
      _export('VERSION', VERSION = '0.0.1.dev');

      _export('VERSION', VERSION);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBT0ksVUFBVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQmFpbGl3aWNrIC0tIEEgbW9yZSBkb21haW4taXNoIG1vZGVsIHRvb2xraXQuXG4gKiAkSWQkXG4gKlxuICogQXV0aG9yc1xuICogLSBNaWNoYWVsIEdyYW5nZXIgPGdlZEBGYWVyaWVNVUQub3JnPlxuICovXG5cbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCAnYmFiZWwvcG9seWZpbGwnO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IG5hbWVzcGFjZVxuICovXG5cbmV4cG9ydCB2YXIgVkVSU0lPTiA9ICcwLjAuMS5kZXYnO1xuXG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YXN0b3JlJztcbmV4cG9ydCAqIGZyb20gJy4vY3JpdGVyaWEnO1xuZXhwb3J0ICogZnJvbSAnLi9hc3NvY2lhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi92YWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL3Jlc3VsdC1zZXQnO1xuXG5leHBvcnQgKiBmcm9tICcuL251bGwtZGF0YXN0b3JlJztcbmV4cG9ydCAqIGZyb20gJy4vcmVzdC1zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9lcnJvcnMnO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
