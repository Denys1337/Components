interface CSSRuleWithSelector extends CSSRule {
  selectorText?: string;
}

const styleSelectorToCSSMap: Record<string, string[]> = {};
let loadedSheets = false;

const parseAllDocumentStyleSheet = () => {
  if (loadedSheets) {
    return;
  }
  loadedSheets = true;
  for (let i = 0; i < document.styleSheets.length; i++) {
    parseDocumentStyleSheet(i);
  }
};

const parseDocumentStyleSheet = (styleSheetIndex: number) => {
  const matchCSSRuleBody = /{([\s\w\-:;%(),.]+)}/i;

  const styleSheet = document.styleSheets;
  if (styleSheetIndex > styleSheet.length) {
    throw new RangeError(`position ${styleSheetIndex} is out of document.styleSheets bounds`);
  }

  const cssRules = styleSheet[styleSheetIndex].cssRules;
  for (let i = 0; i < cssRules.length; i++) {
    // parse all css rules of the stylesheet
    const rule = cssRules[i] as CSSRuleWithSelector;

    if (rule.selectorText) {
      const results = matchCSSRuleBody.exec(rule.cssText);

      // if got CSS rule body content:
      if (results && results.length > 1) {
        // update the selector to css map
        const text: string[] = styleSelectorToCSSMap[rule.selectorText] || [];

        // cleaning unwanted chars and splitting rules from the CSS body
        text.push(
          ...results[1]
            .trim()
            .split(/;\s?/)
            .filter((s) => !!s)
        );
        styleSelectorToCSSMap[rule.selectorText] = text;
      }
    }
  }
};

export const getCssBySelector = (selector: string) => {
  parseAllDocumentStyleSheet();
  return styleSelectorToCSSMap[selector] || [];
};

export const getCssBySelectors = (selector: string[]) => {
  return selector.reduce<string[]>((acc, cls) => {
    return [...acc, ...getCssBySelector(cls)];
  }, []);
};
