/**
 * Update the package.json version and adds "-beta.0" to it.
 */
const exec = require('child_process').exec;
const fs = require('fs');

const currentVersion = require('../package.json').version;
const { root } = require('../paths');

const BETA_SUFFIX = '-beta.';
const PACKAGE_PATH = root('package.json');

let packageContent = fs.readFileSync(PACKAGE_PATH, 'utf8');

exec(`npm show @agritask/vue-components versions`, function (error, stdout, stderr) {
  let tempVersion = currentVersion;
  if (error || stderr) {
    tempVersion += BETA_SUFFIX + '0';
    console.error('ERROR running "npm show @agritask/vue-components versions"');
    console.error(error);
  } else {
    const versions = stdout
      .trim()
      .replace('[', '')
      .replace(']', '')
      .split(',')
      .map((str) => str.replace("'", '').replace("'", '').trim());

    let versionsSet = new Set(versions);

    tempVersion += BETA_SUFFIX;

    // bump from latest beta of current version
    for (let betaIndex = 0; betaIndex < 9999; betaIndex++) {
      if (versionsSet.has(tempVersion + betaIndex) === false) {
        tempVersion += betaIndex;
        break;
      }
    }
  }

  packageContent = packageContent.replace(
    `"version": "${currentVersion}"`,
    `"version": "${tempVersion}"`
  );

  fs.writeFileSync(PACKAGE_PATH, packageContent);
});
