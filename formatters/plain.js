import _ from 'lodash';

const afterAndBefore = (json, key) => {
  const keys = ['preValue', 'newValue'];
  return keys.map((k) => {
    const isObjectBefore = _.isObject(json[key][k]) ? '[complex value]' : json[key][k];
    return !_.isString(isObjectBefore) || isObjectBefore === '[complex value]'
      ? isObjectBefore
      : `'${isObjectBefore}'`;
  });
};

const conditon = (json, key, path, fn) => {
  const [before, after] = afterAndBefore(json, key);
  switch (json[key].state) {
    case 'add':
      return `Property '${path}${key}' was added with value: ${after}`;
    case 'remove':
      return `Property '${path}${key}' was removed`;
    case 'update':
      return `Property '${path}${key}' was updated. From ${before} to ${after}`;
    case 'equal':
      if (_.isObject(json[key].newValue)) {
        return `${fn(json[key].newValue, `${path}${key}.`)}`;
      }
      break;
    default:
  }
  return null;
};

const plain = (json, path = '') => {
  const arr = _.sortBy(Object.keys(json));
  const result = arr.reduce((acc, key) => [...acc, conditon(json, key, path, plain)], []);
  const cleanResult = _.compact(result).join('\n');
  return cleanResult;
};

export default plain;
