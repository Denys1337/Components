function getValueFromArgv(key, throwIfMissing, defaultValue) {
  const keyFull = `--${key}=`;
  const pair = process.argv.find((str) => str.indexOf(keyFull) === 0) || '';
  const value = pair.replace(keyFull, '');
  if (!value && throwIfMissing) {
    throw `missing required argv "${key}"`;
  }
  return value || defaultValue;
}

function getBooleanFromArgv(key, throwIfMissing, defaultValue) {
  const val = getValueFromArgv(key, throwIfMissing, defaultValue);
  return ['1', 'true', 1, true, 'yes'].includes(val);
}

function getIntFromArgv(key, throwIfMissing, defaultValue) {
  const val = getValueFromArgv(key, throwIfMissing, defaultValue);
  return Number.parseInt(val);
}

module.exports = {
  getValueFromArgv,
  getBooleanFromArgv,
  getIntFromArgv,
};
