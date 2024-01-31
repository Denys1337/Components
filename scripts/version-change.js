/**
 * Update the package.json version to specific provided arg
 */

const fs = require('fs');
const process = require('process');

const currentVersion = require('../package.json').version;
const { root } = require('../paths');
const PACKAGE_PATH = root('package.json');

let packageContent = fs.readFileSync(PACKAGE_PATH, 'utf8');

packageContent = packageContent.replace(
  `"version": "${currentVersion}"`,
  `"version": "${process.argv[2]}"`
);

fs.writeFileSync(PACKAGE_PATH, packageContent);
