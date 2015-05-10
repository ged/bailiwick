System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.2.10",
    "babel-runtime": "npm:babel-runtime@5.2.9",
    "bluebird": "npm:bluebird@2.9.25",
    "core-js": "npm:core-js@0.9.6",
    "inflection": "npm:inflection@1.7.0",
    "xhr-promise": "npm:xhr-promise@1.1.0",
    "github:jspm/nodelibs-events@0.1.0": {
      "events-browserify": "npm:events-browserify@0.0.1"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:bluebird@2.7.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:bluebird@2.9.25": {
      "events": "github:jspm/nodelibs-events@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:events-browserify@0.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:for-each@0.3.2": {
      "is-function": "npm:is-function@1.0.1"
    },
    "npm:parse-headers@2.0.0": {
      "for-each": "npm:for-each@0.3.2",
      "trim": "npm:trim@0.0.1"
    },
    "npm:xhr-promise@1.1.0": {
      "bluebird": "npm:bluebird@2.7.1",
      "extend": "npm:extend@2.0.1",
      "parse-headers": "npm:parse-headers@2.0.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

