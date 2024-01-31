const fs = require('fs');

const { src, demoDist } = require('../paths');
const { getSCSSValues } = require('./comps/getSCSSValues');

const dataPath = demoDist('data');
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}

function getFileContent(path: string) {
  path = src(path);
  if (!fs.existsSync(path)) {
    console.error('cant find ' + path);
    throw 'cant find ' + path;
  }
  return fs.readFileSync(path, { encoding: 'utf-8' });
}

function createColorsData() {
  const content = getFileContent('style/scss/_colors.scss');
  const colorGroups = getSCSSValues(content);

  fs.writeFileSync(dataPath + '/colors.json', JSON.stringify({ colorGroups }));
}

function createSpacingData() {
  const content = getFileContent('style/scss/_spacings.scss');
  const spacingGroups = getSCSSValues(content);

  fs.writeFileSync(dataPath + '/spacings.json', JSON.stringify({ spacingGroups }));
}

function createTypoData() {
  const content = getFileContent('style/scss/_typo_root.scss');
  const typoGroups = getSCSSValues(content);

  fs.writeFileSync(dataPath + '/typo.json', JSON.stringify({ typoGroups }));
}

createColorsData();
createSpacingData();
createTypoData();
