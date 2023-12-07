import _ from 'lodash';

const str = '    ';

const values = {
  add: ['newValue'],
  remove: ['preValue'],
  update: ['preValue', 'newValue'],
  equal: ['newValue'],
};

const states = ['add', 'remove', 'update', 'equal'];

const simbolsOfState = {
  add: ['+'],
  remove: ['-'],
  equal: [' '],
  update: ['-', '+'],
};

const conditon = (json, key, indent, fn) => {
  const res = states
    .filter((state) => state === json[key].state)
    .map((state) => {
      const result = values[state]
        .map((st, index) => {
          const string = `${str.repeat(indent)}  ${
            simbolsOfState[state][index]
          } ${key}: ${fn(json[key][st], indent + 1)}`;
          return string;
        })
        .join('\n');
      return result;
    })[0];
  return res;
};

const stylish = (json, indent = 0) => {
  if (!_.isObject(json)) {
    return json;
  }
  const arr = _.sortBy(Object.keys(json));
  const resultArr = arr.reduce(
    (acc, key) => [...acc, conditon(json, key, indent, stylish)],
    [],
  );
  const result = `{\n${resultArr.join('\n')}\n${str.repeat(indent)}}`;
  return result;
};

export default stylish;
