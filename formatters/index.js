import parser from './parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import createJson from './createjson.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = parser(filepath1);
  const dataFile2 = parser(filepath2);
  const baseJson = createJson(dataFile1, dataFile2);
  switch (format) {
    case 'stylish':
      return stylish(baseJson);
    case 'plain':
      return plain(baseJson);
    case 'json':
      return json(baseJson);
    default:
      return stylish(baseJson);
  }
};

export default gendiff;
