import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// eslint-disable-next-line import/no-unresolved
import genDiff from '../bin/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const flatFileComparisonResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

// eslint-disable-next-line no-undef
test('genDiff', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(
    flatFileComparisonResult,
  );
});
