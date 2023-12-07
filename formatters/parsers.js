import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

const parser = (filepath) => {
  const fpath = path.resolve(filepath);
  const format = path.extname(fpath);
  const file = fs.readFileSync(fpath, 'utf8');
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(file);
  }

  return {};
};

export default parser;
