import _ from 'lodash';

const inJson = (json) => {
  const setValue = (js, k) => {
    const value = !_.isObject(js[k].newValue)
      ? js[k].newValue
      : inJson(js[k].newValue);
    return value;
  };
  const arr = _.sortBy(Object.keys(json));
  const result = arr.reduce((acc, key) => {
    const obj = { ...{}, ...setValue(json, key) };
    return { ...{}, ...acc, [key]: obj };
  }, {});
  return JSON.stringify(result);
};

export default inJson;
