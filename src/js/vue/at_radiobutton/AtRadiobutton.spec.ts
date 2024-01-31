import { shallowMount } from '@vue/test-utils';

import AtRadiobutton from './AtRadiobutton.vue';

describe('AtRadiobutton component readonly', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtRadiobutton, {
    props: {
      readonly: true,
      value: 'val',
      name: 'radio',
      label: 'label',
    },
  });

  it('should not display radio input', () => {
    const inputClass = wrapper.find('input.at-radiobutton-input');

    expect(inputClass.exists()).toBe(false);
  });

  it('should display ReadonlyField', () => {
    const readonlyField = wrapper.findComponent({ name: 'ReadonlyField' });

    expect(readonlyField.exists()).toBe(true);
  });
});
