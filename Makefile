test: install
	@rm -rf test/c
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 300 \
		--require should \
		--growl \
		--compilers js:babel-register \
		test/test.js
	@rm -rf test/c

install:
	npm install

.PHONY: test
