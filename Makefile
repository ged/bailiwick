#
# I give up on grunt/gulp/broccoli/brunch/etc.
#

DIST  = dist
BUILD = build
SRC   = src
SPEC  = spec

SOURCES    = $(SRC)/*.js
TRANSPILED = $(BUILD)/bailiwick.es5.js
BUNDLE     = $(DIST)/bailiwick.js

webpack = ./node_modules/webpack/bin/webpack.js


$(TRANSPILED): $(SOURCES)
	@echo "Transpiling..."
	mkdir -p $(BUILD)
	babel -o $@ $^

$(BUNDLE): $(TRANSPILED)
	@echo "Bundling..."
	mkdir -p $(DIST)
	$(webpack) $^ $@

.DEFAULT: $(BUNDLE)
	@echo $(ES5_SOURCES)
	@echo $(ES6_SOURCES)

clean:
	rm -rf $(DIST)
	rm -rf $(BUILD)

