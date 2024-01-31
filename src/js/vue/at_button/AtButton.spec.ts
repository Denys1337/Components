import { shallowMount } from '@vue/test-utils';

import AtButton from './AtButton.vue';

describe('AtButton', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtButton, {
    props: {
      size: 's',
      visual: 'danger',
      type: 'submit',
    },
  });

  it('should have small size class', () => {
    expect(wrapper.classes().includes('size-s')).toBe(true);
  });

  it('should have danger visual class', () => {
    expect(wrapper.classes().includes('danger')).toBe(true);
  });

  it('should be from type submit', () => {
    expect(wrapper.props('type')).toBe('submit');
  });

  it('should be an anchor tag', async () => {
    await wrapper.setProps({ tag: 'a' });
    const anchor = wrapper.find('a');
    expect(anchor.element.tagName === 'A').toBe(true);
  });
});
describe('AtButton with slots and icons', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtButton, {
    props: {
      tag: 'button',
      type: 'button',
      size: 'l',
      visual: 'primary',
      disabled: true,
      startIcon: 'start-class-icon',
      endIcon: 'end-class-icon',
    },
    slots: {
      start: '<div id=one>start-slot</div>',
      default: '<div id=two>default-slot</div>',
      end: '<div id=three>end-slot</div>',
    },
  });

  it('should be a button tag', () => {
    expect(wrapper.element.tagName === 'BUTTON').toBe(true);
  });

  it('should be a button type', () => {
    expect(wrapper.props('type')).toBe('button');
  });

  it('should have large size class', () => {
    expect(wrapper.classes().includes('size-l')).toBe(true);
  });

  it('shold have primary visual class', () => {
    expect(wrapper.classes().includes('primary')).toBe(true);
  });

  it('should be enabled', async () => {
    await wrapper.setProps({ disabled: false });
    expect(wrapper.attributes('disabled')).toBeUndefined();
  });

  it('should have first slot start content', () => {
    expect(wrapper.find('#one').text()).toContain('start-slot');
    expect(wrapper.find('#one').exists()).toBe(true);
  });

  it('should have second slot default content', () => {
    expect(wrapper.find('#two').text()).toContain('default-slot');
    expect(wrapper.find('#two').exists()).toBe(true);
  });

  it('should have third slot end content', () => {
    expect(wrapper.find('#three').text()).toContain('end-slot');
    expect(wrapper.find('#three').exists()).toBe(true);
  });

  it('should have only two i elements startIcon and endIcon', () => {
    const iElementsArray = wrapper.findAll('i');
    expect(iElementsArray.length).toBe(2);
    expect(iElementsArray[0].classes().includes('start-class-icon')).toBe(true);
    expect(iElementsArray[1].classes().includes('end-class-icon')).toBe(true);
  });
});
