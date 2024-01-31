import { shallowMount } from '@vue/test-utils';

import AtToggle from './AtToggle.vue';

describe('AtToggle', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtToggle, {
    props: {
      readonly: true,
    },
  });

  it("The AtToggle component shouldn't be displayed", () => {
    const AtToggle = wrapper.find('label.AtToggle');
    expect(AtToggle.exists()).toBe(false);
  });

  it('The ReadOnlyField component should be displayed', () => {
    const ReadOnlyField = wrapper.findComponent({ name: 'ReadonlyField' });
    expect(ReadOnlyField.exists()).toBe(true);
  });
});
