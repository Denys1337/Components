const ColorFgRed = '\x1b[31m';
//const ColorFgGreen = '\x1b[32m';
const ColorReset = '\x1b[0m';

interface GroupItem {
  key: string;
  value: string;
  calculatedValue: string;
  cssVars: string[];
  isCSSVar: boolean;
}

interface Group {
  title: string;
  lines: string[];
  items: GroupItem[];
}

const getSCSSValuesF = (content: string) => {
  const lineBreak = content.includes('\r\n') ? '\r\n' : '\n';
  const lines: string[] = content.split(lineBreak);

  const groups: Group[] = [];

  lines.forEach((line) => {
    const isTitleParts = /\/\/-{4,}\s?([\w\W]+)/i.exec(line);
    if (isTitleParts) {
      const title = isTitleParts[1];
      if (!title.endsWith('END')) {
        // is not an end title
        groups.push({
          title,
          lines: [],
          items: [],
        });
      }
    } else {
      if (line) {
        groups[groups.length - 1].lines.push(line.trim());
      }
    }
  });

  const calculatedValues: Map<string, string> = new Map();
  const calculatedValueToCSSVar: Map<string, string[]> = new Map();

  const stringToGroupItem = (str: string): GroupItem | null => {
    str = str.trim();
    const res = /^(\$?(--)?[\w-_\d]+):\s?([#\$]?(#{\$)?[-\w(),.\s]+\}?)/gi.exec(str); // eslint-disable-line no-useless-escape
    if (!res) {
      return null;
    }

    const key = res[1].trim();
    let value = res[3].trim();

    const isCSSVar = str.startsWith('--');

    if (!calculatedValues.has(key)) {
      const valueIsReferenceParts = /^((\$)|(var\()|(#{\$))([\w\d\-_]+)/.exec(value);

      if (!valueIsReferenceParts) {
        // value is value not reference to another rule
        calculatedValues.set(key, value);
      } else {
        // value is referencing another rule - get referenced value!
        let referencedKey: string | undefined;

        switch (valueIsReferenceParts[1]) {
          case '$':
            // SCSS referencing SCSS variable
            referencedKey = '$' + valueIsReferenceParts[5];
            break;
          case '#{$':
            // CSS referencing SCSS variable
            referencedKey = '$' + valueIsReferenceParts[5];
            value = value.substring(2).replace('}', ''); // remove '#{' and '}'
            break;
          case 'var(':
            // CSS referencing CSS variable
            referencedKey = valueIsReferenceParts[5];
            break;
        }

        if (!referencedKey) {
          // eslint-disable-next-line no-console
          console.log(
            ColorFgRed,
            'FAILED to get referenced value',
            referencedKey,
            value,
            ColorReset
          );
          console.log(valueIsReferenceParts); // eslint-disable-line no-console
          return null;
        }

        if (calculatedValues.has(referencedKey)) {
          const referencedValue: string = calculatedValues.get(referencedKey)!;
          calculatedValues.set(key, referencedValue);
        } else {
          calculatedValues.set(key, value);
        }
      }
    }

    const calculatedValue: string = calculatedValues.get(key)!;
    const cssVars = [];

    if (isCSSVar) {
      const records = calculatedValueToCSSVar.get(calculatedValue) || [];
      records.push(key);
      calculatedValueToCSSVar.set(calculatedValue, records);
      cssVars.push(key);
    }

    return {
      key,
      value,
      calculatedValue,
      cssVars,
      isCSSVar,
    };
  };

  groups.forEach((group) => {
    group.items = group.lines.map(stringToGroupItem).filter((keyVal) => !!keyVal) as GroupItem[];
  });

  // assign CSS Vars to each item (if css var found)
  groups.forEach((group) =>
    group.items.forEach((item) => {
      if (item.cssVars.length === 0) {
        item.cssVars = calculatedValueToCSSVar.get(item.calculatedValue) || [];
      }
    })
  );

  return groups;
};

const convertToCamalCase = (str: string) =>
  str.replace(/[-_]\w{1}/gi, (val) => val[1].toUpperCase());

function reduceKeyValueArrayToObject(
  acc: Record<string, string>,
  { key, calculatedValue }: GroupItem
) {
  key = convertToCamalCase(key.replace('$', ''));
  acc[key] = calculatedValue;
  return acc;
}

function reduceGroupToValuesObject(group: Group[]) {
  return group.reduce((acc, { items }) => {
    const obj = items.reduce(reduceKeyValueArrayToObject, {});

    return { ...acc, ...obj };
  }, {});
}

module.exports = {
  getSCSSValues: getSCSSValuesF,
  reduceGroupToValuesObject,
};
