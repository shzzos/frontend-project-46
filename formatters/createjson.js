import _ from 'lodash';

const gerState = (json1, json2, key) => {
  if (!_.has(json1, key)) {
    return 'add';
  }
  if (!_.has(json2, key)) {
    return 'remove';
  }
  if (_.has(json1, key) && _.has(json2, key)) {
    if (!_.isObject(json1[key]) || !_.isObject(json2[key])) {
      return json1[key] === json2[key] ? 'equal' : 'update';
    }
  }
  return 'equal';
};

const setValues = (js1, js2, key, fn) => {
  const preValue = _.isObject(js1[key]) ? fn(js1[key], js2[key]) : js1[key];
  const newValue = _.isObject(js2[key]) ? fn(js1[key], js2[key]) : js2[key];
  return { preValue, newValue };
};

const createJson = (json1, json2) => {
  const inJson1 = !_.isObject(json1) ? json2 : json1;
  const inJson2 = !_.isObject(json2) ? json1 : json2;
  const arrFile1 = Object.keys(inJson1);
  const arrFile2 = Object.keys(inJson2);
  const unionArr = _.union(arrFile1, arrFile2);
  const resultJson = unionArr.reduce((acc, key) => {
    const obj = {
      ...{},
      state: gerState(inJson1, inJson2, key),
      ...setValues(inJson1, inJson2, key, createJson),
    };
    return { ...{}, ...acc, [key]: { ...{}, ...obj } };
  }, {});
  return resultJson;
};

export default createJson;
