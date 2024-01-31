import { shallowMount } from '@vue/test-utils';

import AtAlert from './AtAlert.vue';

describe('AtAlert with default icon', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtAlert, {
    props: {
      title: 'some-title',
      content: 'some-content',
    },
    computed: {
      //iconToDisplay: () => ({}),
      //propsIcon: () => ({}),
    },
  });

  it('should be type info by default', () => {
    expect(wrapper.props('type')).toBe('info');
  });

  it('should have two spans one for title and one for content', () => {
    const spans = wrapper.findAll('span');
    expect(spans.length).toBe(2);
    expect(spans[0].text()).toBe('some-title');
    expect(spans[1].text()).toBe('some-content');
  });
  it('should have InfoCircleIcon by default', () => {
    expect(wrapper.classes().includes('icon-tabler-info-circle'));
  });
});

describe('AtAlert with custom icon', () => {
  // @ts-ignore
  const wrapperCustomeIcon = shallowMount(AtAlert, {
    props: {
      title: 'title',
      icon: 'some-icon',
      type: 'warning',
    },
  });

  it('should be type warning', async () => {
    expect(wrapperCustomeIcon.props('type')).toBe('warning');
  });

  it('should have custom icon some-icon', () => {
    expect(wrapperCustomeIcon.find('.AtAlert-icon').classes().includes('some-icon')).toBe(true);
  });
});
