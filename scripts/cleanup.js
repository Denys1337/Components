const fs = require('fs');

const { demoDist, libDist, root } = require('../paths');

function remove(path) {
  fs.rm(path, { force: true, recursive: true }, () => {
    console.log(`cleaned path: ${path}`); // eslint-disable-line no-console
  });
}

function clearProd() {
  remove(libDist() + '\\');
}

function clearDemo() {
  remove(demoDist() + '\\');
}

function clearLocales() {
  remove(root('locales'));
}

function clearIndexes() {
  remove(root('index.ts'));
  remove(root('index.js'));
  remove(root('hooks.ts'));
  remove(root('hooks.js'));
  remove(root('root.css'));
  remove(root('styleJS.ts'));
}

function clearAll() {
  clearProd();
  clearDemo();
  clearIndexes();
  clearLocales();
}

[
  { key: 'dist', cb: clearProd },
  { key: 'demo', cb: clearDemo },
  { key: 'indexes', cb: clearIndexes },
  { key: 'all', cb: clearAll },
].forEach(({ key, cb }) => {
  if (process.argv.includes(`--${key}`)) {
    cb();
  }
});
