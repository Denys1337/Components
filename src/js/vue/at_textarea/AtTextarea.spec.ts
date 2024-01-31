import { mount } from '@vue/test-utils';

import AtTextarea from './AtTextarea.vue';

describe('AtTextarea component readonly', () => {
  // @ts-ignore
  const wrapper = mount(AtTextarea, {
    props: {
      readonly: true,
    },
  });

  it('should not display textarea input', () => {
    const textarea = wrapper.find('textarea.textarea');
    expect(textarea.exists()).toBe(false);
  });

  it('should display ReadonlyField', () => {
    const field = wrapper.findComponent('.ReadonlyField');
    expect(field.exists()).toBe(true);
  });
});
