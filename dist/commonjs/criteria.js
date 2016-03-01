/* -*- javascript -*- */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Criteria = undefined;

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _construct = require("babel-runtime/core-js/reflect/construct");

var _construct2 = _interopRequireDefault(_construct);

var _desc, _value, _class;

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
let Criteria = exports.Criteria = (_class = class Criteria {

	static all() {
		return (0, _construct2.default)(this);
	}

	constructor(pairs = {}) {
		this.filterClauses = new _map2.default();
		this.maxResultCount = null;
		this.resultOffset = null;
		this.location = null;

		for (let key in pairs) {
			this.filterClauses.set(key, pairs[key]);
		}
	}

	clone() {
		var newObj = (0, _construct2.default)(this.constructor, [{}]);
		newObj.filterClauses = new _map2.default(this.filterClauses);
		newObj.maxResultCount = this.maxResultCount;
		newObj.resultOffset = this.resultOffset;
		return newObj;
	}

	hasFilter() {
		return this.filterClauses.size > 0;
	}

	/**
  * Create clone of the current criteria with the additional filter
  * {pairs}.
  * 
  */

	filter(pairs) {
		for (let key in pairs) {
			this.filterClauses.set(key, pairs[key]);
		}
	}

	/**
  * Create a clone of the current criteria with its limit set to {newLimit}.
  * @param {Integer} newLimit The new limit on how many objects to return.
  */

	limit(newLimit) {
		this.maxResultCount = newLimit;
	}

	/**
  * Create a clone of the current criteria with its offset set to {newOffset}.
  * @param {Integer} newOffset The new index into the filtered set to use as the first
  *                  result.
  */

	offset(newOffset) {
		this.resultOffset = newOffset;
	}

	/**
  * Create a clone of the current criteria with its location set to {newLocation}.
  * @param {Object} location  The location the resource should be fetched from; the
  *                           value of this parameter is datastore-dependent, and
  *                           may not make sense for all of them.
  */

	from(newLocation) {
		this.location = newLocation;
	}

}, (_applyDecoratedDescriptor(_class.prototype, "filter", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "filter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "limit", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "limit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "offset", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "offset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "from", [_utils.monadic], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "from"), _class.prototype)), _class);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyaXRlcmlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlhLHdDQUFOLE1BQU0sUUFBTixDQUFlOztBQUVyQixRQUFPLEdBQVAsR0FBYTtBQUNaLFNBQU8seUJBQW1CLElBQW5CLENBQVAsQ0FEWTtFQUFiOztBQUlBLGFBQWEsUUFBTSxFQUFOLEVBQVc7QUFDdkIsT0FBSyxhQUFMLEdBQXFCLG1CQUFyQixDQUR1QjtBQUV2QixPQUFLLGNBQUwsR0FBc0IsSUFBdEIsQ0FGdUI7QUFHdkIsT0FBSyxZQUFMLEdBQW9CLElBQXBCLENBSHVCO0FBSXZCLE9BQUssUUFBTCxHQUFnQixJQUFoQixDQUp1Qjs7QUFNdkIsT0FBTSxJQUFJLEdBQUosSUFBVyxLQUFqQixFQUF5QjtBQUN4QixRQUFLLGFBQUwsQ0FBbUIsR0FBbkIsQ0FBd0IsR0FBeEIsRUFBNkIsTUFBTSxHQUFOLENBQTdCLEVBRHdCO0dBQXpCO0VBTkQ7O0FBWUEsU0FBUTtBQUNQLE1BQUksU0FBUyx5QkFBbUIsS0FBSyxXQUFMLEVBQWtCLENBQUMsRUFBRCxDQUFyQyxDQUFULENBREc7QUFFUCxTQUFPLGFBQVAsR0FBdUIsa0JBQVMsS0FBSyxhQUFMLENBQWhDLENBRk87QUFHUCxTQUFPLGNBQVAsR0FBd0IsS0FBSyxjQUFMLENBSGpCO0FBSVAsU0FBTyxZQUFQLEdBQXNCLEtBQUssWUFBTCxDQUpmO0FBS1AsU0FBTyxNQUFQLENBTE87RUFBUjs7QUFTQSxhQUFZO0FBQ1gsU0FBUyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsR0FBMEIsQ0FBMUIsQ0FERTtFQUFaOzs7Ozs7O0FBM0JxQjtBQXNDckIsUUFBUSxLQUFSLEVBQWdCO0FBQ2YsT0FBTSxJQUFJLEdBQUosSUFBVyxLQUFqQixFQUF5QjtBQUN4QixRQUFLLGFBQUwsQ0FBbUIsR0FBbkIsQ0FBd0IsR0FBeEIsRUFBNkIsTUFBTSxHQUFOLENBQTdCLEVBRHdCO0dBQXpCO0VBREQ7Ozs7OztBQXRDcUI7QUFrRHJCLE9BQU8sUUFBUCxFQUFrQjtBQUNqQixPQUFLLGNBQUwsR0FBc0IsUUFBdEIsQ0FEaUI7RUFBbEI7Ozs7Ozs7QUFsRHFCO0FBNkRyQixRQUFRLFNBQVIsRUFBb0I7QUFDbkIsT0FBSyxZQUFMLEdBQW9CLFNBQXBCLENBRG1CO0VBQXBCOzs7Ozs7OztBQTdEcUI7QUF5RXJCLE1BQU0sV0FBTixFQUFvQjtBQUNuQixPQUFLLFFBQUwsR0FBZ0IsV0FBaEIsQ0FEbUI7RUFBcEI7O0NBekVNIiwiZmlsZSI6ImNyaXRlcmlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLSotIGphdmFzY3JpcHQgLSotICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHttb25hZGljfSBmcm9tICcuL3V0aWxzJztcblxuXG4vKipcbiAqIEZsdWVudCBjcml0ZXJpYSBmb3IgQmFpbGl3aWNrIHF1ZXJ5aW5nXG4gKlxuICogQGNsYXNzIENyaXRlcmlhXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDcml0ZXJpYSB7XG5cblx0c3RhdGljIGFsbCgpIHtcblx0XHRyZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QoIHRoaXMgKTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCBwYWlycz17fSApIHtcblx0XHR0aGlzLmZpbHRlckNsYXVzZXMgPSBuZXcgTWFwKCk7XG5cdFx0dGhpcy5tYXhSZXN1bHRDb3VudCA9IG51bGw7XG5cdFx0dGhpcy5yZXN1bHRPZmZzZXQgPSBudWxsO1xuXHRcdHRoaXMubG9jYXRpb24gPSBudWxsO1xuXG5cdFx0Zm9yICggbGV0IGtleSBpbiBwYWlycyApIHtcblx0XHRcdHRoaXMuZmlsdGVyQ2xhdXNlcy5zZXQoIGtleSwgcGFpcnNba2V5XSApO1xuXHRcdH1cblx0fVxuXG5cblx0Y2xvbmUoKSB7XG5cdFx0dmFyIG5ld09iaiA9IFJlZmxlY3QuY29uc3RydWN0KCB0aGlzLmNvbnN0cnVjdG9yLCBbe31dICk7XG5cdFx0bmV3T2JqLmZpbHRlckNsYXVzZXMgPSBuZXcgTWFwKCB0aGlzLmZpbHRlckNsYXVzZXMgKTtcblx0XHRuZXdPYmoubWF4UmVzdWx0Q291bnQgPSB0aGlzLm1heFJlc3VsdENvdW50O1xuXHRcdG5ld09iai5yZXN1bHRPZmZzZXQgPSB0aGlzLnJlc3VsdE9mZnNldDtcblx0XHRyZXR1cm4gbmV3T2JqO1xuXHR9XG5cblxuXHRoYXNGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuICggdGhpcy5maWx0ZXJDbGF1c2VzLnNpemUgPiAwICk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgY2xvbmUgb2YgdGhlIGN1cnJlbnQgY3JpdGVyaWEgd2l0aCB0aGUgYWRkaXRpb25hbCBmaWx0ZXJcblx0ICoge3BhaXJzfS5cblx0ICogXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRmaWx0ZXIoIHBhaXJzICkge1xuXHRcdGZvciAoIGxldCBrZXkgaW4gcGFpcnMgKSB7XG5cdFx0XHR0aGlzLmZpbHRlckNsYXVzZXMuc2V0KCBrZXksIHBhaXJzW2tleV0gKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBjbG9uZSBvZiB0aGUgY3VycmVudCBjcml0ZXJpYSB3aXRoIGl0cyBsaW1pdCBzZXQgdG8ge25ld0xpbWl0fS5cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSBuZXdMaW1pdCBUaGUgbmV3IGxpbWl0IG9uIGhvdyBtYW55IG9iamVjdHMgdG8gcmV0dXJuLlxuXHQgKi9cblx0QG1vbmFkaWNcblx0bGltaXQoIG5ld0xpbWl0ICkge1xuXHRcdHRoaXMubWF4UmVzdWx0Q291bnQgPSBuZXdMaW1pdDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGNsb25lIG9mIHRoZSBjdXJyZW50IGNyaXRlcmlhIHdpdGggaXRzIG9mZnNldCBzZXQgdG8ge25ld09mZnNldH0uXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gbmV3T2Zmc2V0IFRoZSBuZXcgaW5kZXggaW50byB0aGUgZmlsdGVyZWQgc2V0IHRvIHVzZSBhcyB0aGUgZmlyc3Rcblx0ICogICAgICAgICAgICAgICAgICByZXN1bHQuXG5cdCAqL1xuXHRAbW9uYWRpY1xuXHRvZmZzZXQoIG5ld09mZnNldCApIHtcblx0XHR0aGlzLnJlc3VsdE9mZnNldCA9IG5ld09mZnNldDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGNsb25lIG9mIHRoZSBjdXJyZW50IGNyaXRlcmlhIHdpdGggaXRzIGxvY2F0aW9uIHNldCB0byB7bmV3TG9jYXRpb259LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gbG9jYXRpb24gIFRoZSBsb2NhdGlvbiB0aGUgcmVzb3VyY2Ugc2hvdWxkIGJlIGZldGNoZWQgZnJvbTsgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgb2YgdGhpcyBwYXJhbWV0ZXIgaXMgZGF0YXN0b3JlLWRlcGVuZGVudCwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5IG5vdCBtYWtlIHNlbnNlIGZvciBhbGwgb2YgdGhlbS5cblx0ICovXG5cdEBtb25hZGljXG5cdGZyb20oIG5ld0xvY2F0aW9uICkge1xuXHRcdHRoaXMubG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblx0fVxuXG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
