const Path = require('path');

/**
 * Resolve path in project directory.
 * @param  {...string[]} segments
 */
function root(...segments) {
  return Path.resolve(__dirname, ...segments);
}

/**
 * Resolve path in src directory.
 * @param  {...string[]} segments
 */
function src(...segments) {
  return Path.resolve(__dirname, 'src', ...segments);
}

function demoSrc(...segments) {
  return Path.resolve(__dirname, 'demo_src', ...segments);
}

/**
 * Resolve path in output directory.
 * @param  {...string[]} segments
 */
function libDist(...segments) {
  return Path.resolve(__dirname, 'libs', ...segments);
}

/**
 * Resolve path in output directory.
 * @param  {...string[]} segments
 */
function demoDist(...segments) {
  return Path.resolve(__dirname, 'public', ...segments);
}

/**
 * @returns Return true when building for demo sample app
 */
function isDemoBuild() {
  return process.argv.includes('--demo');
}

/**
 * Resolve path in output directory.
 * @param  {...string[]} segments
 */
function storybookBuild(...segments) {
  return Path.resolve(__dirname, '.storybook', 'build', ...segments);
}

const dist = isDemoBuild() ? demoDist : libDist;

module.exports = {
  root,
  src,
  dist,
  demoSrc,
  isDemoBuild,
  demoDist,
  libDist,
  storybookBuild,
};
