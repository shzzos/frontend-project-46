install:
		npm ci && sudo npm link

gendiff:
		node bin/gendiff.js

# Run scan eslint on all folders in a directory
lint:
		npx eslint .

# eslint error correction
lint-fix:
		npx eslint --fix .

test:
		npx -n --experimental-vm-modules jest

test-coverage:
		npm test -- --coverage --coverageProvider=v8