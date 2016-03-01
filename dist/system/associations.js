/* -*- javascript -*- */
"use strict";
/* eslint-disable */

System.register(["babel-runtime/core-js/map", "babel-runtime/core-js/symbol/for"], function (_export, _context) {
	var _Map, _Symbol$for;

	return {
		setters: [function (_babelRuntimeCoreJsMap) {
			_Map = _babelRuntimeCoreJsMap.default;
		}, function (_babelRuntimeCoreJsSymbolFor) {
			_Symbol$for = _babelRuntimeCoreJsSymbolFor.default;
		}],
		execute: function () {
			const DATA = _Symbol$for("data"),
			      ASSOCIATIONS = _Symbol$for("associations");

			const AssociationFactoryFunctions = new _Map();

			_export("AssociationFactoryFunctions", AssociationFactoryFunctions);

			AssociationFactoryFunctions.set("oneToMany", (name, modelClass, endpoint = null) => {
				return function (skipCache = false) {
					return this[ASSOCIATIONS][name] || this[DATA][name];
				};
			});
			AssociationFactoryFunctions.set("manyToOne", (name, modelClass, endpoint = null) => {
				return function (skipCache = false) {
					return this[ASSOCIATIONS][name] || this[DATA][name];
				};
			});
			AssociationFactoryFunctions.set("oneToOne", (name, modelClass, endpoint = null) => {
				return function (skipCache = false) {
					return this[ASSOCIATIONS][name] || this[DATA][name];
				};
			});

			/**
    * Decorator: @association
    * Adds an association to the model
    */
			function association(target) {
				return function declareAssociation(type, name, modelClass, endpoint = null) {
					let factoryFunction = AssociationFactoryFunctions.get(type);

					if (typeof factory !== "function") {
						throw `Unknown association type ${ type }`;
					}

					target[name] = factoryFunction(name, modelClass, endpoint);
				};
			}

			_export("association", association);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc29jaWF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFHQSxTQUFNLE9BQU8sWUFBWSxNQUFaLENBQVA7U0FDQSxlQUFlLFlBQVksY0FBWixDQUFmOztBQUVDLFNBQU0sOEJBQThCLFVBQTlCOzs7O0FBRWIsK0JBQTRCLEdBQTVCLENBQWlDLFdBQWpDLEVBQThDLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsV0FBUyxJQUFULEtBQWtCO0FBQ2xGLFdBQU8sVUFBVSxZQUFVLEtBQVYsRUFBa0I7QUFDbEMsWUFBTyxLQUFNLFlBQU4sRUFBc0IsSUFBdEIsS0FBZ0MsS0FBTSxJQUFOLEVBQWMsSUFBZCxDQUFoQyxDQUQyQjtLQUE1QixDQUQyRTtJQUFyQyxDQUE5QztBQUtBLCtCQUE0QixHQUE1QixDQUFpQyxXQUFqQyxFQUE4QyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLFdBQVMsSUFBVCxLQUFrQjtBQUNsRixXQUFPLFVBQVUsWUFBVSxLQUFWLEVBQWtCO0FBQ2xDLFlBQU8sS0FBTSxZQUFOLEVBQXNCLElBQXRCLEtBQWdDLEtBQU0sSUFBTixFQUFjLElBQWQsQ0FBaEMsQ0FEMkI7S0FBNUIsQ0FEMkU7SUFBckMsQ0FBOUM7QUFLQSwrQkFBNEIsR0FBNUIsQ0FBaUMsVUFBakMsRUFBNkMsQ0FBQyxJQUFELEVBQU8sVUFBUCxFQUFtQixXQUFTLElBQVQsS0FBa0I7QUFDakYsV0FBTyxVQUFVLFlBQVUsS0FBVixFQUFrQjtBQUNsQyxZQUFPLEtBQU0sWUFBTixFQUFzQixJQUF0QixLQUFnQyxLQUFNLElBQU4sRUFBYyxJQUFkLENBQWhDLENBRDJCO0tBQTVCLENBRDBFO0lBQXJDLENBQTdDOzs7Ozs7QUFXTyxZQUFTLFdBQVQsQ0FBc0IsTUFBdEIsRUFBK0I7QUFDckMsV0FBTyxTQUFTLGtCQUFULENBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLFVBQXpDLEVBQXFELFdBQVMsSUFBVCxFQUFnQjtBQUMzRSxTQUFJLGtCQUFrQiw0QkFBNEIsR0FBNUIsQ0FBaUMsSUFBakMsQ0FBbEIsQ0FEdUU7O0FBRzNFLFNBQUssT0FBTyxPQUFQLEtBQW1CLFVBQW5CLEVBQWdDO0FBQ3BDLFlBQU0sQ0FBQyx5QkFBRCxHQUE0QixJQUE1QixFQUFpQyxDQUF2QyxDQURvQztNQUFyQzs7QUFJQSxZQUFRLElBQVIsSUFBaUIsZ0JBQWlCLElBQWpCLEVBQXVCLFVBQXZCLEVBQW1DLFFBQW5DLENBQWpCLENBUDJFO0tBQXJFLENBRDhCO0lBQS9CIiwiZmlsZSI6ImFzc29jaWF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0qLSBqYXZhc2NyaXB0IC0qLSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5jb25zdCBEQVRBID0gU3ltYm9sLmZvciggXCJkYXRhXCIgKSxcbiAgICAgIEFTU09DSUFUSU9OUyA9IFN5bWJvbC5mb3IoIFwiYXNzb2NpYXRpb25zXCIgKTtcblxuZXhwb3J0IGNvbnN0IEFzc29jaWF0aW9uRmFjdG9yeUZ1bmN0aW9ucyA9IG5ldyBNYXAoKTtcblxuQXNzb2NpYXRpb25GYWN0b3J5RnVuY3Rpb25zLnNldCggXCJvbmVUb01hbnlcIiwgKG5hbWUsIG1vZGVsQ2xhc3MsIGVuZHBvaW50PW51bGwpID0+IHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBza2lwQ2FjaGU9ZmFsc2UgKSB7XG5cdFx0cmV0dXJuIHRoaXNbIEFTU09DSUFUSU9OUyBdWyBuYW1lIF0gfHwgdGhpc1sgREFUQSBdWyBuYW1lIF07XG5cdH07XG59KTtcbkFzc29jaWF0aW9uRmFjdG9yeUZ1bmN0aW9ucy5zZXQoIFwibWFueVRvT25lXCIsIChuYW1lLCBtb2RlbENsYXNzLCBlbmRwb2ludD1udWxsKSA9PiB7XG5cdHJldHVybiBmdW5jdGlvbiggc2tpcENhY2hlPWZhbHNlICkge1xuXHRcdHJldHVybiB0aGlzWyBBU1NPQ0lBVElPTlMgXVsgbmFtZSBdIHx8IHRoaXNbIERBVEEgXVsgbmFtZSBdO1xuXHR9O1xufSk7XG5Bc3NvY2lhdGlvbkZhY3RvcnlGdW5jdGlvbnMuc2V0KCBcIm9uZVRvT25lXCIsIChuYW1lLCBtb2RlbENsYXNzLCBlbmRwb2ludD1udWxsKSA9PiB7XG5cdHJldHVybiBmdW5jdGlvbiggc2tpcENhY2hlPWZhbHNlICkge1xuXHRcdHJldHVybiB0aGlzWyBBU1NPQ0lBVElPTlMgXVsgbmFtZSBdIHx8IHRoaXNbIERBVEEgXVsgbmFtZSBdO1xuXHR9O1xufSk7XG5cblxuLyoqXG4gKiBEZWNvcmF0b3I6IEBhc3NvY2lhdGlvblxuICogQWRkcyBhbiBhc3NvY2lhdGlvbiB0byB0aGUgbW9kZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc29jaWF0aW9uKCB0YXJnZXQgKSB7XG5cdHJldHVybiBmdW5jdGlvbiBkZWNsYXJlQXNzb2NpYXRpb24oIHR5cGUsIG5hbWUsIG1vZGVsQ2xhc3MsIGVuZHBvaW50PW51bGwgKSB7XG5cdFx0bGV0IGZhY3RvcnlGdW5jdGlvbiA9IEFzc29jaWF0aW9uRmFjdG9yeUZ1bmN0aW9ucy5nZXQoIHR5cGUgKTtcblxuXHRcdGlmICggdHlwZW9mIGZhY3RvcnkgIT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdHRocm93IGBVbmtub3duIGFzc29jaWF0aW9uIHR5cGUgJHt0eXBlfWA7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0WyBuYW1lIF0gPSBmYWN0b3J5RnVuY3Rpb24oIG5hbWUsIG1vZGVsQ2xhc3MsIGVuZHBvaW50ICk7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
