define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.association = association;


	var DATA = Symbol.for("data"),
	    ASSOCIATIONS = Symbol.for("associations");

	var AssociationFactoryFunctions = exports.AssociationFactoryFunctions = new Map();

	AssociationFactoryFunctions.set("oneToMany", function (name, modelClass) {
		var endpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		return function () {
			var skipCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			return this[ASSOCIATIONS][name] || this[DATA][name];
		};
	});
	AssociationFactoryFunctions.set("manyToOne", function (name, modelClass) {
		var endpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		return function () {
			var skipCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			return this[ASSOCIATIONS][name] || this[DATA][name];
		};
	});
	AssociationFactoryFunctions.set("oneToOne", function (name, modelClass) {
		var endpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		return function () {
			var skipCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			return this[ASSOCIATIONS][name] || this[DATA][name];
		};
	});

	function association(target) {
		return function declareAssociation(type, name, modelClass) {
			var endpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

			var factoryFunction = AssociationFactoryFunctions.get(type);

			if (typeof factory !== "function") {
				throw "Unknown association type " + type;
			}

			target[name] = factoryFunction(name, modelClass, endpoint);
		};
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6WyJhc3NvY2lhdGlvbiIsIkRBVEEiLCJTeW1ib2wiLCJmb3IiLCJBU1NPQ0lBVElPTlMiLCJBc3NvY2lhdGlvbkZhY3RvcnlGdW5jdGlvbnMiLCJNYXAiLCJzZXQiLCJuYW1lIiwibW9kZWxDbGFzcyIsImVuZHBvaW50Iiwic2tpcENhY2hlIiwidGFyZ2V0IiwiZGVjbGFyZUFzc29jaWF0aW9uIiwidHlwZSIsImZhY3RvcnlGdW5jdGlvbiIsImdldCIsImZhY3RvcnkiXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7U0E2QmdCQSxXLEdBQUFBLFc7OztBQTFCaEIsS0FBTUMsT0FBT0MsT0FBT0MsR0FBUCxDQUFZLE1BQVosQ0FBYjtBQUFBLEtBQ01DLGVBQWVGLE9BQU9DLEdBQVAsQ0FBWSxjQUFaLENBRHJCOztBQUdPLEtBQU1FLG9FQUE4QixJQUFJQyxHQUFKLEVBQXBDOztBQUVQRCw2QkFBNEJFLEdBQTVCLENBQWlDLFdBQWpDLEVBQThDLFVBQUNDLElBQUQsRUFBT0MsVUFBUCxFQUFxQztBQUFBLE1BQWxCQyxRQUFrQix1RUFBVCxJQUFTOztBQUNsRixTQUFPLFlBQTRCO0FBQUEsT0FBbEJDLFNBQWtCLHVFQUFSLEtBQVE7O0FBQ2xDLFVBQU8sS0FBTVAsWUFBTixFQUFzQkksSUFBdEIsS0FBZ0MsS0FBTVAsSUFBTixFQUFjTyxJQUFkLENBQXZDO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7QUFLQUgsNkJBQTRCRSxHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxVQUFDQyxJQUFELEVBQU9DLFVBQVAsRUFBcUM7QUFBQSxNQUFsQkMsUUFBa0IsdUVBQVQsSUFBUzs7QUFDbEYsU0FBTyxZQUE0QjtBQUFBLE9BQWxCQyxTQUFrQix1RUFBUixLQUFROztBQUNsQyxVQUFPLEtBQU1QLFlBQU4sRUFBc0JJLElBQXRCLEtBQWdDLEtBQU1QLElBQU4sRUFBY08sSUFBZCxDQUF2QztBQUNBLEdBRkQ7QUFHQSxFQUpEO0FBS0FILDZCQUE0QkUsR0FBNUIsQ0FBaUMsVUFBakMsRUFBNkMsVUFBQ0MsSUFBRCxFQUFPQyxVQUFQLEVBQXFDO0FBQUEsTUFBbEJDLFFBQWtCLHVFQUFULElBQVM7O0FBQ2pGLFNBQU8sWUFBNEI7QUFBQSxPQUFsQkMsU0FBa0IsdUVBQVIsS0FBUTs7QUFDbEMsVUFBTyxLQUFNUCxZQUFOLEVBQXNCSSxJQUF0QixLQUFnQyxLQUFNUCxJQUFOLEVBQWNPLElBQWQsQ0FBdkM7QUFDQSxHQUZEO0FBR0EsRUFKRDs7QUFXTyxVQUFTUixXQUFULENBQXNCWSxNQUF0QixFQUErQjtBQUNyQyxTQUFPLFNBQVNDLGtCQUFULENBQTZCQyxJQUE3QixFQUFtQ04sSUFBbkMsRUFBeUNDLFVBQXpDLEVBQXFFO0FBQUEsT0FBaEJDLFFBQWdCLHVFQUFQLElBQU87O0FBQzNFLE9BQUlLLGtCQUFrQlYsNEJBQTRCVyxHQUE1QixDQUFpQ0YsSUFBakMsQ0FBdEI7O0FBRUEsT0FBSyxPQUFPRyxPQUFQLEtBQW1CLFVBQXhCLEVBQXFDO0FBQ3BDLHdDQUFrQ0gsSUFBbEM7QUFDQTs7QUFFREYsVUFBUUosSUFBUixJQUFpQk8sZ0JBQWlCUCxJQUFqQixFQUF1QkMsVUFBdkIsRUFBbUNDLFFBQW5DLENBQWpCO0FBQ0EsR0FSRDtBQVNBIiwiZmlsZSI6ImFzc29jaWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
