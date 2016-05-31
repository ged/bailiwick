
"use strict";

System.register([], function (_export, _context) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7QUFHTSxVQUFPLE9BQU8sR0FBUCxDQUFZLE1BQVo7QUFDUCxrQkFBZSxPQUFPLEdBQVAsQ0FBWSxjQUFaOzswQ0FFUiw4QkFBOEIsSUFBSSxHQUFKOzs7O0FBRTNDLCtCQUE0QixHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxVQUFDLElBQUQsRUFBTyxVQUFQLEVBQXFDO1FBQWxCLGlFQUFTLG9CQUFTOztBQUNsRixXQUFPLFlBQTRCO1NBQWxCLGtFQUFVLHFCQUFROztBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQWhDLENBRDJCO0tBQTVCLENBRDJFO0lBQXJDLENBQTlDO0FBS0EsK0JBQTRCLEdBQTVCLENBQWlDLFdBQWpDLEVBQThDLFVBQUMsSUFBRCxFQUFPLFVBQVAsRUFBcUM7UUFBbEIsaUVBQVMsb0JBQVM7O0FBQ2xGLFdBQU8sWUFBNEI7U0FBbEIsa0VBQVUscUJBQVE7O0FBQ2xDLFlBQU8sS0FBTSxZQUFOLEVBQXNCLElBQXRCLEtBQWdDLEtBQU0sSUFBTixFQUFjLElBQWQsQ0FBaEMsQ0FEMkI7S0FBNUIsQ0FEMkU7SUFBckMsQ0FBOUM7QUFLQSwrQkFBNEIsR0FBNUIsQ0FBaUMsVUFBakMsRUFBNkMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztRQUFsQixpRUFBUyxvQkFBUzs7QUFDakYsV0FBTyxZQUE0QjtTQUFsQixrRUFBVSxxQkFBUTs7QUFDbEMsWUFBTyxLQUFNLFlBQU4sRUFBc0IsSUFBdEIsS0FBZ0MsS0FBTSxJQUFOLEVBQWMsSUFBZCxDQUFoQyxDQUQyQjtLQUE1QixDQUQwRTtJQUFyQyxDQUE3Qzs7QUFXTyxZQUFTLFdBQVQsQ0FBc0IsTUFBdEIsRUFBK0I7QUFDckMsV0FBTyxTQUFTLGtCQUFULENBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLFVBQXpDLEVBQXFFO1NBQWhCLGlFQUFTLG9CQUFPOztBQUMzRSxTQUFJLGtCQUFrQiw0QkFBNEIsR0FBNUIsQ0FBaUMsSUFBakMsQ0FBbEIsQ0FEdUU7O0FBRzNFLFNBQUssT0FBTyxPQUFQLEtBQW1CLFVBQW5CLEVBQWdDO0FBQ3BDLDBDQUFrQyxJQUFsQyxDQURvQztNQUFyQzs7QUFJQSxZQUFRLElBQVIsSUFBaUIsZ0JBQWlCLElBQWpCLEVBQXVCLFVBQXZCLEVBQW1DLFFBQW5DLENBQWpCLENBUDJFO0tBQXJFLENBRDhCO0lBQS9CIiwiZmlsZSI6ImFzc29jaWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
