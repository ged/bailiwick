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
		var endpoint = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

		return function () {
			var skipCache = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			return this[ASSOCIATIONS][name] || this[DATA][name];
		};
	});
	AssociationFactoryFunctions.set("manyToOne", function (name, modelClass) {
		var endpoint = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

		return function () {
			var skipCache = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			return this[ASSOCIATIONS][name] || this[DATA][name];
		};
	});
	AssociationFactoryFunctions.set("oneToOne", function (name, modelClass) {
		var endpoint = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

		return function () {
			var skipCache = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			return this[ASSOCIATIONS][name] || this[DATA][name];
		};
	});

	function association(target) {
		return function declareAssociation(type, name, modelClass) {
			var endpoint = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

			var factoryFunction = AssociationFactoryFunctions.get(type);

			if (typeof factory !== "function") {
				throw "Unknown association type " + type;
			}

			target[name] = factoryFunction(name, modelClass, endpoint);
		};
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7O1NBNkJnQixXLEdBQUEsVzs7O0FBMUJoQixLQUFNLE9BQU8sT0FBTyxHQUFQLENBQVksTUFBWixDQUFiO0FBQUEsS0FDTSxlQUFlLE9BQU8sR0FBUCxDQUFZLGNBQVosQ0FEckI7O0FBR08sS0FBTSxvRUFBOEIsSUFBSSxHQUFKLEVBQXBDOztBQUVQLDZCQUE0QixHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxVQUFDLElBQUQsRUFBTyxVQUFQLEVBQXFDO0FBQUEsTUFBbEIsUUFBa0IseURBQVQsSUFBUzs7QUFDbEYsU0FBTyxZQUE0QjtBQUFBLE9BQWxCLFNBQWtCLHlEQUFSLEtBQVE7O0FBQ2xDLFVBQU8sS0FBTSxZQUFOLEVBQXNCLElBQXRCLEtBQWdDLEtBQU0sSUFBTixFQUFjLElBQWQsQ0FBdkM7QUFDQSxHQUZEO0FBR0EsRUFKRDtBQUtBLDZCQUE0QixHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxVQUFDLElBQUQsRUFBTyxVQUFQLEVBQXFDO0FBQUEsTUFBbEIsUUFBa0IseURBQVQsSUFBUzs7QUFDbEYsU0FBTyxZQUE0QjtBQUFBLE9BQWxCLFNBQWtCLHlEQUFSLEtBQVE7O0FBQ2xDLFVBQU8sS0FBTSxZQUFOLEVBQXNCLElBQXRCLEtBQWdDLEtBQU0sSUFBTixFQUFjLElBQWQsQ0FBdkM7QUFDQSxHQUZEO0FBR0EsRUFKRDtBQUtBLDZCQUE0QixHQUE1QixDQUFpQyxVQUFqQyxFQUE2QyxVQUFDLElBQUQsRUFBTyxVQUFQLEVBQXFDO0FBQUEsTUFBbEIsUUFBa0IseURBQVQsSUFBUzs7QUFDakYsU0FBTyxZQUE0QjtBQUFBLE9BQWxCLFNBQWtCLHlEQUFSLEtBQVE7O0FBQ2xDLFVBQU8sS0FBTSxZQUFOLEVBQXNCLElBQXRCLEtBQWdDLEtBQU0sSUFBTixFQUFjLElBQWQsQ0FBdkM7QUFDQSxHQUZEO0FBR0EsRUFKRDs7QUFXTyxVQUFTLFdBQVQsQ0FBc0IsTUFBdEIsRUFBK0I7QUFDckMsU0FBTyxTQUFTLGtCQUFULENBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLFVBQXpDLEVBQXFFO0FBQUEsT0FBaEIsUUFBZ0IseURBQVAsSUFBTzs7QUFDM0UsT0FBSSxrQkFBa0IsNEJBQTRCLEdBQTVCLENBQWlDLElBQWpDLENBQXRCOztBQUVBLE9BQUssT0FBTyxPQUFQLEtBQW1CLFVBQXhCLEVBQXFDO0FBQ3BDLHdDQUFrQyxJQUFsQztBQUNBOztBQUVELFVBQVEsSUFBUixJQUFpQixnQkFBaUIsSUFBakIsRUFBdUIsVUFBdkIsRUFBbUMsUUFBbkMsQ0FBakI7QUFDQSxHQVJEO0FBU0EiLCJmaWxlIjoiYXNzb2NpYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
