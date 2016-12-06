#
# I give up on grunt/gulp/broccoli/brunch/etc.
#

SRC   = src
LIB   = lib
SPEC  = spec

SOURCES    = $(SRC)/*.js
BUNDLE     = $(LIB)/bailiwick.js

webpack = ./node_modules/webpack/bin/webpack.js


$(BUNDLE): $(SOURCES)
	@echo "Bundling..."
	$(webpack)

.DEFAULT: $(BUNDLE)
	@echo $(ES5_SOURCES)
	@echo $(ES6_SOURCES)

clean:
	rm -rf $(LIB)


