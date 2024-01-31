import { shallowMount } from '@vue/test-utils';

import ReadonlyField from '../readonly_field/ReadonlyField.vue';
import AtSelect from './AtSelect.vue';
describe('AtSelect component readonly', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtSelect, {
    propsData: {
      readonly: true,
      options: [1, 2],
    },
    mocks: {
      $t: (msg: string) => msg,
    },
  });

  it('should not display AtSelect class', () => {
    const selectWrapper = wrapper.find('.AtSelect');

    expect(selectWrapper.exists()).toBe(false);
  });

  it('should display ReadonlyField', () => {
    // @ts-ignore
    const ReadOnlyField = wrapper.findComponent(ReadonlyField);

    expect(ReadOnlyField.exists()).toBe(true);
  });
});
