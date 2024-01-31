#!/usr/bin/env node

const { execSync } = require('child_process');
const FS = require('fs');

const { src, dist, demoDist } = require('../paths');

/**
 * Builds a font and CSS file out of provided SVG files
 *
 * @param name output font name
 * @param outFile output css
 * @param outDir output directory
 * @param fontsPath relative font file path in produced CSS file
 */
function buildFonts(name, outFile, outDir, fontsPath) {
  FS.mkdirSync(outDir, { recursive: true });

  console.log(name); // eslint-disable-line no-console
  console.log(outFile); // eslint-disable-line no-console
  console.log(outDir); // eslint-disable-line no-console
  console.log(fontsPath); // eslint-disable-line no-console

  const icons = src('style/icons/*.svg');

  execSync(
    `icon-font-generator ${icons} --out=${outDir} --name=${name} --html=true --csspath=${outFile} --cssfontsurl=${fontsPath} --center=true --normalize=true`
  );
}

buildFonts('agritask-font', dist('fonts/icon-font.css'), dist('fonts/icon-font'), '../fonts/');
buildFonts(
  'agritask-font',
  demoDist('fonts/icon-font.css'),
  demoDist('fonts/icon-font'),
  '../fonts/'
);
