import { computed, reactive, toRefs, UnwrapRef } from 'vue';

import { getPossiblePropertyTypes } from '../../helpers/cssHelpers';

export type CSSProperty = { property: string; value: string; calculatedValue: string };

interface Store {
  component: string;
  cssClasses: string[];
  cssProperties: CSSProperty[];
}

let store: UnwrapRef<Store>;
const DEFAULT_ELEMENT_TAG = 'div';

function useClipboardStore() {
  if (!store) {
    store = reactive<Store>({
      component: '',
      cssClasses: [],
      cssProperties: [],
    });
  }

  const previewText = "here's johnny!";

  // CSS class
  const addCssClass = (clsList: string | string[]) => {
    clsList = Array.isArray(clsList) ? clsList : [clsList];
    clsList.forEach((cls) => {
      if (!store.cssClasses.includes(cls)) {
        store.cssClasses.push(cls);
      }
    });
  };

  const removeCssClass = (clsList: string | string[]) => {
    clsList = Array.isArray(clsList) ? clsList : [clsList];
    clsList.forEach((cls) => {
      const i = store.cssClasses.indexOf(cls);
      if (i >= 0) {
        store.cssClasses.splice(i, 1);
      }
    });
  };

  const toggleCssClass = (clsList: string | string[]) => {
    clsList = Array.isArray(clsList) ? clsList : [clsList];
    clsList.forEach((cls) => {
      const i = store.cssClasses.indexOf(cls);
      if (i >= 0) {
        store.cssClasses.splice(i, 1);
      } else {
        store.cssClasses.push(cls);
      }
    });
  };

  // CSS Properties
  const addCSSProperty = (value: string, calculatedValue: string = '', property: string = '') => {
    calculatedValue = calculatedValue || value;
    if (!property) {
      const propOptions = getPossiblePropertyTypes(calculatedValue);
      property = propOptions.length ? propOptions[0] : '';
    }

    store.cssProperties.push({ value, property, calculatedValue });
  };

  const toggleCSSPropertyValue = (val: string, calculatedValue?: string) => {
    const index = store.cssProperties.findIndex(({ value }) => value === val);
    if (index > -1) {
      removeCSSPropertyIndex(index);
    } else {
      addCSSProperty(val, calculatedValue);
    }
  };

  const removeCSSProperty = (val?: string, prop?: string) => {
    const indexes: number[] = [];
    if (val && prop) {
      // find exact `value` & `property` occurance
      const index = store.cssProperties.findIndex(({ value, property }) => {
        return value === val && property === prop;
      });
      if (index > -1) {
        indexes.push(index);
      }
    } else if (val) {
      // if no property, remove latest occurance of the `value`
      for (let i = store.cssProperties.length - 1; i >= 0; i--) {
        if (store.cssProperties[i].value === val) {
          indexes.push(i);
          break;
        }
      }
    } else if (prop) {
      // remove all occurances of the `property`
      for (let i = 0; i < store.cssProperties.length; i++) {
        if (store.cssProperties[i].property === prop) {
          indexes.push(i);
        }
      }
    }

    if (indexes.length) {
      indexes.forEach((index) => {
        store.cssProperties.splice(index, 1);
      });
    }
  };

  const removeCSSPropertyIndex = (index: number) => {
    store.cssProperties.splice(index, 1);
  };

  const removeAllCss = () => {
    store.component = DEFAULT_ELEMENT_TAG;
    store.cssClasses.splice(0);
    store.cssProperties.splice(0);
  };

  const setCSSProperty = (index: number, property: string) => {
    store.cssProperties[index].property = property;
  };

  // Component
  const setComponent = (comp: string) => (store.component = comp);

  const getHTML = (innerText = '', style = false) => {
    const hasContent =
      (store.component.length > 0 && store.component !== DEFAULT_ELEMENT_TAG) ||
      store.cssClasses.length > 0 ||
      (style && store.cssProperties.length > 0);

    if (!hasContent) {
      return '';
    }

    let styleString = '';

    if (style && store.cssProperties.length) {
      const styleContent = store.cssProperties.reduce(
        (acc, item) => (acc += `${item.property}: ${item.value}; `),
        ''
      );

      styleString = `style="${styleContent}"`;
    }

    const elemTag = store.component || DEFAULT_ELEMENT_TAG;
    return `<${elemTag} class="${store.cssClasses.join(
      ' '
    )}" ${styleString}>${innerText}</${elemTag}>`;
  };

  const html = computed(() => getHTML());

  const previewHTML = computed(() => getHTML(previewText, true));

  const css = computed(() => {
    if (store.cssProperties.length === 0) return '';

    return store.cssProperties.reduce(
      (acc, item) => (acc += `${item.property}: ${item.value};\n`),
      ''
    );
  });

  return {
    ...toRefs(store),
    addCssClass,
    removeCssClass,
    toggleCssClass,
    addCSSProperty,
    removeCSSProperty,
    removeCSSPropertyIndex,
    toggleCSSPropertyValue,
    setCSSProperty,
    setComponent,
    previewHTML,
    html,
    css,
    removeAllCss,
  };
}

export default useClipboardStore;
