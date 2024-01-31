import { ref } from 'vue';

import useAtSelectPaginated from './useAtSelectPaginated';

describe('Test useAtSelectPaginated - general', () => {
  let nextValue = 1;
  const { options, attrs, isLoaded, isLoadingNextOptions, storedOptionsMap } = useAtSelectPaginated(
    {
      async loadNextOptionsPromise() {
        options.value.push({ value: `${nextValue}`, text: `${nextValue}` });
        nextValue++;
      },
    }
  );
  it('should not load a page before first open', () => {
    expect(options.value.length).toBe(0);
  });
  it('should load a page on first open', () => {
    attrs.value.onFirstOpening().then(() => {
      expect(options.value[0].value).toBe('1');
    });
  });
  it('should load a page on scroll down', () => {
    attrs.value.onScrolledDown().then(() => {
      expect(options.value[1].value).toBe('2');
    });
  });
  it('should not load another page on scroll down while still loading', () => {
    isLoadingNextOptions.value = true;
    attrs.value.onScrolledDown().then(() => {
      expect(options.value[2]).toBeUndefined();
    });
    isLoadingNextOptions.value = false;
  });
  it('should not load a page on scroll down when isLoading is changed to true', () => {
    isLoaded.value = true;
    attrs.value.onScrolledDown().then(() => {
      expect(options.value[2]).toBeUndefined();
    });
  });
  it('should save options for a new string query in a diffrent field', () => {
    attrs.value.onSearch('123').finally(() => {
      //on search is loading the first page so options[0] will be defined
      expect(options.value[0].value).toBe('3');
      expect(options.value[1]).toBeUndefined();
    });
  });
  it('going back to the original search should maintain the options it had', () => {
    attrs.value.onSearch('').finally(() => {
      //on search is loading the first page so options[0] will be defined
      expect(options.value[0].value).toBe('1');
      expect(options.value[2]).toBeUndefined();
    });
  });

  it('should add toggled options to stored options', () => {
    expect(storedOptionsMap.value.size).toBe(0);
    attrs.value.onOptionToggle({ text: '1', value: '1' });
    expect(storedOptionsMap.value.size).toBe(1);
    expect(storedOptionsMap.value.get('1')).toStrictEqual({ text: '1', value: '1' });
  });
});

describe('Test useAtSelectPaginated - multi', () => {
  //No selectAllOptionsPromise provided
  {
    let nextValue = 1;
    const { options, attrs } = useAtSelectPaginated({
      async loadNextOptionsPromise() {
        options.value.push({ value: `${nextValue}`, text: `${nextValue}` });
        nextValue++;
      },
    });
    it('should not be multi by default', () => {
      expect(attrs.value.multiple).toBeFalsy();
    });
    it('should hide select all button when no selectAllOptionsPromise provided ', () => {
      expect(attrs.value.showSelectAllOptions).toBeFalsy();
    });
  }
  //selectAllOptionsPromise provided
  {
    let nextValue = 1;
    const { options, attrs, storedOptionsMap } = useAtSelectPaginated({
      multiple: ref(true),
      async selectAllOptionsPromise() {
        options.value.push(
          ...[
            { text: '4', value: '4' },
            { text: '5', value: '5' },
            { text: '6', value: '6' },
          ]
        );
      },
      async loadNextOptionsPromise() {
        options.value.push({ value: `${nextValue}`, text: `${nextValue}` });
        nextValue++;
      },
    });
    it('should display selectAllOptions button', () => {
      expect(attrs.value.showSelectAllOptions).toBeTruthy();
    });
    it('add all options on select all', () => {
      attrs.value.onSelectAllOptions().then(() => {
        expect(options.value.length).toBe(3);
      });
    });
    it('toggle all options', () => {
      expect(attrs.value.modelValue.length).toBe(3);
    });
    it('add all options to stored options', () => {
      expect(storedOptionsMap.value.size).toBe(3);
    });
  }
});
