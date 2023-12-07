install: install-deps

install-deps:
	npm ci

test:
	node --experimental-vm-modules node_modules/.bin/jest

testj:
	npx jest

coverage:
	node --experimental-vm-modules node_modules/.bin/jest --coverage

edit:
	npx prettier -w .

lint:
	npx eslint .

publish:
	npm publish

run:
	node bin/gendiff.js --format plain __fixtures__/file3.json __fixtures__/file4.json