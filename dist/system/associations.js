
"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var DATA, ASSOCIATIONS, AssociationFactoryFunctions;
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

	_export("association", association);

	return {
		setters: [],
		execute: function () {
			DATA = Symbol.for("data");
			ASSOCIATIONS = Symbol.for("associations");

			_export("AssociationFactoryFunctions", AssociationFactoryFunctions = new Map());

			_export("AssociationFactoryFunctions", AssociationFactoryFunctions);

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
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6WyJhc3NvY2lhdGlvbiIsInRhcmdldCIsImRlY2xhcmVBc3NvY2lhdGlvbiIsInR5cGUiLCJuYW1lIiwibW9kZWxDbGFzcyIsImVuZHBvaW50IiwiZmFjdG9yeUZ1bmN0aW9uIiwiQXNzb2NpYXRpb25GYWN0b3J5RnVuY3Rpb25zIiwiZ2V0IiwiZmFjdG9yeSIsIkRBVEEiLCJTeW1ib2wiLCJmb3IiLCJBU1NPQ0lBVElPTlMiLCJNYXAiLCJzZXQiLCJza2lwQ2FjaGUiXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7O0FBNkJPLFVBQVNBLFdBQVQsQ0FBc0JDLE1BQXRCLEVBQStCO0FBQ3JDLFNBQU8sU0FBU0Msa0JBQVQsQ0FBNkJDLElBQTdCLEVBQW1DQyxJQUFuQyxFQUF5Q0MsVUFBekMsRUFBcUU7QUFBQSxPQUFoQkMsUUFBZ0IsdUVBQVAsSUFBTzs7QUFDM0UsT0FBSUMsa0JBQWtCQyw0QkFBNEJDLEdBQTVCLENBQWlDTixJQUFqQyxDQUF0Qjs7QUFFQSxPQUFLLE9BQU9PLE9BQVAsS0FBbUIsVUFBeEIsRUFBcUM7QUFDcEMsd0NBQWtDUCxJQUFsQztBQUNBOztBQUVERixVQUFRRyxJQUFSLElBQWlCRyxnQkFBaUJILElBQWpCLEVBQXVCQyxVQUF2QixFQUFtQ0MsUUFBbkMsQ0FBakI7QUFDQSxHQVJEO0FBU0E7O3dCQVZlTixXOzs7OztBQTFCVlcsTyxHQUFPQyxPQUFPQyxHQUFQLENBQVksTUFBWixDO0FBQ1BDLGUsR0FBZUYsT0FBT0MsR0FBUCxDQUFZLGNBQVosQzs7MENBRVJMLDJCLEdBQThCLElBQUlPLEdBQUosRTs7OztBQUUzQ1AsK0JBQTRCUSxHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxVQUFDWixJQUFELEVBQU9DLFVBQVAsRUFBcUM7QUFBQSxRQUFsQkMsUUFBa0IsdUVBQVQsSUFBUzs7QUFDbEYsV0FBTyxZQUE0QjtBQUFBLFNBQWxCVyxTQUFrQix1RUFBUixLQUFROztBQUNsQyxZQUFPLEtBQU1ILFlBQU4sRUFBc0JWLElBQXRCLEtBQWdDLEtBQU1PLElBQU4sRUFBY1AsSUFBZCxDQUF2QztBQUNBLEtBRkQ7QUFHQSxJQUpEO0FBS0FJLCtCQUE0QlEsR0FBNUIsQ0FBaUMsV0FBakMsRUFBOEMsVUFBQ1osSUFBRCxFQUFPQyxVQUFQLEVBQXFDO0FBQUEsUUFBbEJDLFFBQWtCLHVFQUFULElBQVM7O0FBQ2xGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQlcsU0FBa0IsdUVBQVIsS0FBUTs7QUFDbEMsWUFBTyxLQUFNSCxZQUFOLEVBQXNCVixJQUF0QixLQUFnQyxLQUFNTyxJQUFOLEVBQWNQLElBQWQsQ0FBdkM7QUFDQSxLQUZEO0FBR0EsSUFKRDtBQUtBSSwrQkFBNEJRLEdBQTVCLENBQWlDLFVBQWpDLEVBQTZDLFVBQUNaLElBQUQsRUFBT0MsVUFBUCxFQUFxQztBQUFBLFFBQWxCQyxRQUFrQix1RUFBVCxJQUFTOztBQUNqRixXQUFPLFlBQTRCO0FBQUEsU0FBbEJXLFNBQWtCLHVFQUFSLEtBQVE7O0FBQ2xDLFlBQU8sS0FBTUgsWUFBTixFQUFzQlYsSUFBdEIsS0FBZ0MsS0FBTU8sSUFBTixFQUFjUCxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQiLCJmaWxlIjoiYXNzb2NpYXRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9saWIifQ==
