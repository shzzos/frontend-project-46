const dataParse = (readFileResult, fileExt) => {
  if (fileExt === 'json') {
    return JSON.parse(readFileResult);
  }
  return null;
};

export default dataParse;
