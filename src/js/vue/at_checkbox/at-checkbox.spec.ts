import { shallowMount } from '@vue/test-utils';

import AtCheckbox from './AtCheckbox.vue';

describe('AtCheckbox', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtCheckbox, {
    props: {
      readonly: true,
    },
  });

  it("The AtCheckbox component shouldn't be displayed", () => {
    const AtCheckbox = wrapper.find('input.at-checkbox-input');
    expect(AtCheckbox.exists()).toBe(false);
  });

  it('The ReadOnlyField component should be displayed', () => {
    const ReadOnlyField = wrapper.findComponent({ name: 'ReadonlyField' });
    expect(ReadOnlyField.exists()).toBe(true);
  });
});
