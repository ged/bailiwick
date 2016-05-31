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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7O1NBNkJnQjs7O0FBMUJoQixLQUFNLE9BQU8sT0FBTyxHQUFQLENBQVksTUFBWixDQUFQO0tBQ0EsZUFBZSxPQUFPLEdBQVAsQ0FBWSxjQUFaLENBQWY7O0FBRUMsS0FBTSxvRUFBOEIsSUFBSSxHQUFKLEVBQTlCOztBQUViLDZCQUE0QixHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxVQUFDLElBQUQsRUFBTyxVQUFQLEVBQXFDO01BQWxCLGlFQUFTLG9CQUFTOztBQUNsRixTQUFPLFlBQTRCO09BQWxCLGtFQUFVLHFCQUFROztBQUNsQyxVQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQWhDLENBRDJCO0dBQTVCLENBRDJFO0VBQXJDLENBQTlDO0FBS0EsNkJBQTRCLEdBQTVCLENBQWlDLFdBQWpDLEVBQThDLFVBQUMsSUFBRCxFQUFPLFVBQVAsRUFBcUM7TUFBbEIsaUVBQVMsb0JBQVM7O0FBQ2xGLFNBQU8sWUFBNEI7T0FBbEIsa0VBQVUscUJBQVE7O0FBQ2xDLFVBQU8sS0FBTSxZQUFOLEVBQXNCLElBQXRCLEtBQWdDLEtBQU0sSUFBTixFQUFjLElBQWQsQ0FBaEMsQ0FEMkI7R0FBNUIsQ0FEMkU7RUFBckMsQ0FBOUM7QUFLQSw2QkFBNEIsR0FBNUIsQ0FBaUMsVUFBakMsRUFBNkMsVUFBQyxJQUFELEVBQU8sVUFBUCxFQUFxQztNQUFsQixpRUFBUyxvQkFBUzs7QUFDakYsU0FBTyxZQUE0QjtPQUFsQixrRUFBVSxxQkFBUTs7QUFDbEMsVUFBTyxLQUFNLFlBQU4sRUFBc0IsSUFBdEIsS0FBZ0MsS0FBTSxJQUFOLEVBQWMsSUFBZCxDQUFoQyxDQUQyQjtHQUE1QixDQUQwRTtFQUFyQyxDQUE3Qzs7QUFXTyxVQUFTLFdBQVQsQ0FBc0IsTUFBdEIsRUFBK0I7QUFDckMsU0FBTyxTQUFTLGtCQUFULENBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLFVBQXpDLEVBQXFFO09BQWhCLGlFQUFTLG9CQUFPOztBQUMzRSxPQUFJLGtCQUFrQiw0QkFBNEIsR0FBNUIsQ0FBaUMsSUFBakMsQ0FBbEIsQ0FEdUU7O0FBRzNFLE9BQUssT0FBTyxPQUFQLEtBQW1CLFVBQW5CLEVBQWdDO0FBQ3BDLHdDQUFrQyxJQUFsQyxDQURvQztJQUFyQzs7QUFJQSxVQUFRLElBQVIsSUFBaUIsZ0JBQWlCLElBQWpCLEVBQXVCLFVBQXZCLEVBQW1DLFFBQW5DLENBQWpCLENBUDJFO0dBQXJFLENBRDhCO0VBQS9CIiwiZmlsZSI6ImFzc29jaWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvbGliIn0=
