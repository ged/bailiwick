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

.PHONY: all clean test
.DEFAULT: $(BUNDLE)

all: clean $(BUNDLE) test

clean:
	rm -rf $(LIB)

test:
	yarn run test
