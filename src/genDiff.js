import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import dataParse from './parseData.js';

const fileReader = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf8');
};

const fileExtReader = (filePath) => _.trimStart(_.last(filePath.split('.')), '.');

const genDiff = (filePath1, filePath2) => {
  const readFile1Result = fileReader(filePath1);
  const readFile2Result = fileReader(filePath2);

  const file1Ext = fileExtReader(filePath1);
  const file2Ext = fileExtReader(filePath2);

  console.log(file1Ext);

  const parsedData1 = dataParse(readFile1Result, file1Ext);
  const parsedData2 = dataParse(readFile2Result, file2Ext);

  const keysArray = _.union(_.keys(parsedData1), _.keys(parsedData2)).sort();
  const resultObject = keysArray.reduce((acc, key) => {
    if (parsedData1[key] === parsedData2[key]) {
      acc.push(`    ${key}: ${parsedData1[key]}`);
    } else {
      if (Object.hasOwn(parsedData1, key)) {
        acc.push(`  - ${key}: ${parsedData1[key]}`);
      }
      if (Object.hasOwn(parsedData2, key)) {
        acc.push(`  + ${key}: ${parsedData2[key]}`);
      }
    }
    return acc;
  }, []);

  const resultString = resultObject.join('\n');
  return `{\n${resultString}\n}`;
};

export default genDiff;
