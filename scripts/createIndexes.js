const fs = require('fs-extra');

const { root, src, dist } = require('../paths');
const { getSCSSValues, reduceGroupToValuesObject } = require('./comps/getSCSSValues');

// clone css
const rootCSSSrcPath = dist('css/root.css');
const rootCSSPath = root('root.css');

// change fonts' folder path from "../fonts/" to "./libs/fonts/"
let rootCSSContent = fs.readFileSync(rootCSSSrcPath, { encoding: 'utf-8' });
rootCSSContent = rootCSSContent.replace(/..\/fonts\//gi, './libs/fonts/');
fs.writeFileSync(rootCSSPath, rootCSSContent);

let content;

// clone and modify components ts
const indexTSSrcPath = src('index.ts');
const indexTSPath = root('index.ts');
content = fs.readFileSync(indexTSSrcPath, 'utf8');
content = content.replace(/from '\./gi, `from './src`);
content = content.replace(/from "\./gi, `from "./src`);
fs.writeFileSync(indexTSPath, content);

// clone and modify hooks ts
const hooksTSSrcPath = src('hooks.ts');
const hooksTSPath = root('hooks.ts');
content = fs.readFileSync(hooksTSSrcPath, 'utf8');
content = content.replace(/from '\./gi, `from './src`);
content = content.replace(/from "\./gi, `from "./src`);
fs.writeFileSync(hooksTSPath, content);

// clone and modify utils ts
const utilsTSSrcPath = src('utils.ts');
const utilsTSPath = root('utils.ts');
content = fs.readFileSync(utilsTSSrcPath, 'utf8');
content = content.replace(/from '\./gi, `from './src`);
content = content.replace(/from "\./gi, `from "./src`);
fs.writeFileSync(utilsTSPath, content);

function createColorsJS() {
  const path = src('style/scss/_colors.scss');
  if (!fs.existsSync(path)) {
    console.error('cant find ' + path);
  }

  const content = fs.readFileSync(path, { encoding: 'utf-8' });
  const colorGroups = getSCSSValues(content);
  const colorsObj = reduceGroupToValuesObject(colorGroups);
  const colorFileContent = `export const colors = ${JSON.stringify(colorsObj)};`;

  fs.writeFileSync(root('styleJS.ts'), colorFileContent);
}
createColorsJS();

// copy locales to root folder
function copyLocales() {
  const localesSrc = src('js/vue/locales');
  const localesDist = root('locales');
  fs.copy(localesSrc, root('locales'), function (err) {
    if (err) {
      /* eslint-disable-next-line no-console */
      console.log(
        `An error occured while copying vue's locales from '${localesSrc}' to ${localesDist}`
      );
      console.error(err);
    }
  });
}
copyLocales();
