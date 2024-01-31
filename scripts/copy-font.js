/* eslint-disable no-console */
const Path = require('path');

const fs = require('fs-extra');

const { libDist, storybookBuild, demoDist, isDemoBuild } = require('../paths');
const { ColorFgRed, ColorReset } = require('./comps/consoleColors');

function copyFontFiles() {
  const srcCSS = isDemoBuild() ? demoDist('css') : libDist('css');
  const srcFonts = isDemoBuild() ? demoDist('fonts') : libDist('fonts');

  if (!fs.existsSync(srcCSS)) {
    console.log(ColorFgRed + `copy-font.js can't find ${srcCSS}` + ColorReset);
  }
  if (!fs.existsSync(srcFonts)) {
    console.log(ColorFgRed + `copy-font.js can't find ${srcFonts}` + ColorReset);
  }

  // copy font files to destination
  function copyTo(destination) {
    const buildExists = fs.existsSync(destination);
    if (!buildExists) {
      fs.mkdirSync(destination);
    }

    const distCSS = Path.resolve(destination, 'css');
    const distFonts = Path.resolve(destination, 'fonts');

    !fs.existsSync(distCSS) && fs.mkdirSync(distCSS, { recursive: true });
    !fs.existsSync(distFonts) && fs.mkdirSync(distFonts, { recursive: true });

    // copy srcCSS and srcFons to destination
    fs.copySync(srcCSS, distCSS);
    fs.copySync(srcFonts, distFonts);
  }

  copyTo(storybookBuild());
}

copyFontFiles();
