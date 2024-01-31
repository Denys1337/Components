import { shallowMount } from '@vue/test-utils';

import AtInput from './AtInput.vue';

describe('AtInput component readonly', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtInput, {
    props: {
      readonly: true,
    },
  });

  it('should not display input', () => {
    const input = wrapper.find('input.input');

    expect(input.exists()).toBe(false);
  });

  it('should display ReadonlyField', () => {
    const ReadOnlyField = wrapper.findComponent({ name: 'ReadonlyField' });

    expect(ReadOnlyField.exists()).toBe(true);
  });
});
