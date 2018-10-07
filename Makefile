
##
##
##	aah - async-await helpers lib
##


NPM=pnpm

default: help

##		make help - display the help
##
help:
	@grep "^##.*" ./Makefile

##		make setup - setup the package for development
##
setup:
	$(NPM) install

##		make build-docs - generate the docs
##
build-docs:
	$(NPM) run build-docs

##		make build - build the package
##
build: build-docs
	rm -rf ./dist/*
	mkdir -p ./dist
	cp ./src/* ./dist
	cp ./README.md ./dist
	cp ./package.json ./dist

##		make publish - publish the package
##
publish:
	cd ./dist && $(NPM) publish

##		make test-eslint - run a linter check against the source code
##
test-eslint:
	$(NPM) run test-eslint


test-mocha:
	$(NPM) run test-mocha

##		make test-cases - run the test cases
##
test-cases: test-mocha

##		make test - run all tests
##
test: test-cases test-eslint

##
##
