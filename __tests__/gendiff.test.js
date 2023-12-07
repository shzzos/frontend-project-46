import { expect, test } from '@jest/globals';
import * as fs from 'fs';
import gendiff from '../formatters/index.js';

const fileJson1 = new URL('../__fixtures__/file1.json', import.meta.url);
const fileJson2 = new URL('../__fixtures__/file2.json', import.meta.url);

const fileJson3 = new URL('../__fixtures__/file3.json', import.meta.url);
const fileJson4 = new URL('../__fixtures__/file4.json', import.meta.url);

const fileYaml1 = new URL('../__fixtures__/file1.yml', import.meta.url);
const fileYaml2 = new URL('../__fixtures__/file2.yml', import.meta.url);

const fileResult = new URL('../__fixtures__/result.txt', import.meta.url);
const result = fs.readFileSync(fileResult, 'utf-8');

const fileResult2 = new URL('../__fixtures__/result2.txt', import.meta.url);
const result2 = fs.readFileSync(fileResult2, 'utf-8');

const fileResult3 = new URL('../__fixtures__/result3.txt', import.meta.url);
const result3 = fs.readFileSync(fileResult3, 'utf-8');

test('getdiff', () => {
  expect(gendiff(fileJson1.pathname, fileJson2.pathname)).toEqual(result);
  expect(gendiff(fileYaml1.pathname, fileYaml2.pathname)).toEqual(result);
  expect(gendiff(fileJson3.pathname, fileJson4.pathname)).toEqual(result2);
  expect(gendiff(fileJson3.pathname, fileJson4.pathname, 'plain')).toEqual(
    result3,
  );
});
