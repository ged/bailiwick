
"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var DATA, ASSOCIATIONS, AssociationFactoryFunctions;
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

	_export("association", association);

	return {
		setters: [],
		execute: function () {
			DATA = Symbol.for("data");
			ASSOCIATIONS = Symbol.for("associations");

			_export("AssociationFactoryFunctions", AssociationFactoryFunctions = new Map());

			_export("AssociationFactoryFunctions", AssociationFactoryFunctions);

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
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7OztBQTZCTyxVQUFTLFdBQVQsQ0FBc0IsTUFBdEIsRUFBK0I7QUFDckMsU0FBTyxTQUFTLGtCQUFULENBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLFVBQXpDLEVBQXFFO0FBQUEsT0FBaEIsUUFBZ0IseURBQVAsSUFBTzs7QUFDM0UsT0FBSSxrQkFBa0IsNEJBQTRCLEdBQTVCLENBQWlDLElBQWpDLENBQXRCOztBQUVBLE9BQUssT0FBTyxPQUFQLEtBQW1CLFVBQXhCLEVBQXFDO0FBQ3BDLHdDQUFrQyxJQUFsQztBQUNBOztBQUVELFVBQVEsSUFBUixJQUFpQixnQkFBaUIsSUFBakIsRUFBdUIsVUFBdkIsRUFBbUMsUUFBbkMsQ0FBakI7QUFDQSxHQVJEO0FBU0E7O3dCQVZlLFc7Ozs7O0FBMUJWLE8sR0FBTyxPQUFPLEdBQVAsQ0FBWSxNQUFaLEM7QUFDUCxlLEdBQWUsT0FBTyxHQUFQLENBQVksY0FBWixDOzswQ0FFUiwyQixHQUE4QixJQUFJLEdBQUosRTs7OztBQUUzQywrQkFBNEIsR0FBNUIsQ0FBaUMsV0FBakMsRUFBOEMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztBQUFBLFFBQWxCLFFBQWtCLHlEQUFULElBQVM7O0FBQ2xGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQixTQUFrQix5REFBUixLQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQ7QUFLQSwrQkFBNEIsR0FBNUIsQ0FBaUMsV0FBakMsRUFBOEMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztBQUFBLFFBQWxCLFFBQWtCLHlEQUFULElBQVM7O0FBQ2xGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQixTQUFrQix5REFBUixLQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQ7QUFLQSwrQkFBNEIsR0FBNUIsQ0FBaUMsVUFBakMsRUFBNkMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztBQUFBLFFBQWxCLFFBQWtCLHlEQUFULElBQVM7O0FBQ2pGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQixTQUFrQix5REFBUixLQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQiLCJmaWxlIjoiYXNzb2NpYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
