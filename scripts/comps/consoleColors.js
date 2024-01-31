const fgColors = {
  ColorFgBlack: '\x1b[30m',
  ColorFgRed: '\x1b[31m',
  ColorFgGreen: '\x1b[32m',
  ColorFgYellow: '\x1b[33m',
  ColorFgBlue: '\x1b[34m',
  ColorFgMagenta: '\x1b[35m',
  ColorFgCyan: '\x1b[36m',
  ColorFgWhite: '\x1b[37m',
};

const bgColors = {
  ColorBgBlack: '\x1b[40m',
  ColorBgRed: '\x1b[41m',
  ColorBgGreen: '\x1b[42m',
  ColorBgYellow: '\x1b[43m',
  ColorBgBlue: '\x1b[44m',
  ColorBgMagenta: '\x1b[45m',
  ColorBgCyan: '\x1b[46m',
  ColorBgWhite: '\x1b[47m',
};

const colors = {
  ColorReset: '\x1b[0m',
  ColorBright: '\x1b[1m',
  ColorDim: '\x1b[2m',
  ColorUnderscore: '\x1b[4m',
  ColorBlink: '\x1b[5m',
  ColorReverse: '\x1b[7m',
  ColorHidden: '\x1b[8m',

  ...fgColors,
  ...bgColors,
};

function getRandomFGs(count) {
  const results = new Array(count).fill('');
  const values = Object.values(fgColors);
  results.forEach((_, i) => {
    results[i] = values[Math.floor(Math.random() * (values.length - 1)) + 1];
  });
  return results;
}

module.exports = {
  ...colors,
  getRandomFGs,
};
