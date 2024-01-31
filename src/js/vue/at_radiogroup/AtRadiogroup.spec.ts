import { shallowMount } from '@vue/test-utils';

import AtRadiogroup from './AtRadiogroup.vue';

describe('AtRadiogroup component readonly', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtRadiogroup, {
    props: {
      readonly: true,
      name: 'name',
      options: [
        { text: 'One', value: '1' },
        { text: 'Two', value: '2' },
        { text: 'Three', value: '3' },
      ],
    },
  });

  it('should render correctly ReadonlyField', () => {
    const readonlyField = wrapper.findComponent({ name: 'ReadonlyField' });

    expect(readonlyField.exists()).toBe(true);
  });
});
