
"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var DATA, ASSOCIATIONS, AssociationFactoryFunctions;
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
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7OztBQUdNLE8sR0FBTyxPQUFPLEdBQVAsQ0FBWSxNQUFaLEM7QUFDUCxlLEdBQWUsT0FBTyxHQUFQLENBQVksY0FBWixDOzswQ0FFUiwyQixHQUE4QixJQUFJLEdBQUosRTs7OztBQUUzQywrQkFBNEIsR0FBNUIsQ0FBaUMsV0FBakMsRUFBOEMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztBQUFBLFFBQWxCLFFBQWtCLHlEQUFULElBQVM7O0FBQ2xGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQixTQUFrQix5REFBUixLQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQ7QUFLQSwrQkFBNEIsR0FBNUIsQ0FBaUMsV0FBakMsRUFBOEMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztBQUFBLFFBQWxCLFFBQWtCLHlEQUFULElBQVM7O0FBQ2xGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQixTQUFrQix5REFBUixLQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQ7QUFLQSwrQkFBNEIsR0FBNUIsQ0FBaUMsVUFBakMsRUFBNkMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztBQUFBLFFBQWxCLFFBQWtCLHlEQUFULElBQVM7O0FBQ2pGLFdBQU8sWUFBNEI7QUFBQSxTQUFsQixTQUFrQix5REFBUixLQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQXZDO0FBQ0EsS0FGRDtBQUdBLElBSkQ7O0FBV08sWUFBUyxXQUFULENBQXNCLE1BQXRCLEVBQStCO0FBQ3JDLFdBQU8sU0FBUyxrQkFBVCxDQUE2QixJQUE3QixFQUFtQyxJQUFuQyxFQUF5QyxVQUF6QyxFQUFxRTtBQUFBLFNBQWhCLFFBQWdCLHlEQUFQLElBQU87O0FBQzNFLFNBQUksa0JBQWtCLDRCQUE0QixHQUE1QixDQUFpQyxJQUFqQyxDQUF0Qjs7QUFFQSxTQUFLLE9BQU8sT0FBUCxLQUFtQixVQUF4QixFQUFxQztBQUNwQywwQ0FBa0MsSUFBbEM7QUFDQTs7QUFFRCxZQUFRLElBQVIsSUFBaUIsZ0JBQWlCLElBQWpCLEVBQXVCLFVBQXZCLEVBQW1DLFFBQW5DLENBQWpCO0FBQ0EsS0FSRDtBQVNBIiwiZmlsZSI6ImFzc29jaWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
