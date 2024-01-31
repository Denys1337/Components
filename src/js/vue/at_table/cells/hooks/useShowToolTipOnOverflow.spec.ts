import { mount } from '@vue/test-utils';
import { computed, defineComponent, ref } from 'vue';

import * as useIsTextOverflowing from '../../../hooks/useIsTextOverflowing';
import useShowTooltipOnOverflow from './useShowTooltipOnOverflow';

const useIsTextOverflowingMock = jest.spyOn(useIsTextOverflowing, 'default');

const Comp = defineComponent({
  emits: ['show-tooltip'],
  setup(_, { emit }) {
    const comp = ref();
    const msg = 'emitted message';
    const { hoverHandler, id } = useShowTooltipOnOverflow(comp, emit, msg);
    return {
      comp,
      hoverHandler,
      id,
    };
  },
  template: `<div ref="comp" @mouseover="hoverHandler">sdf</div>`,
});

describe('Test useShowToolTipOnOverflow', () => {
  it('should not emit an event on hoverHandler call when text is not overflowing', async () => {
    useIsTextOverflowingMock.mockReturnValue(computed(() => false));
    const wrapper = await mount(Comp);
    wrapper.trigger('mouseover');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('show-tooltip')).toBe(undefined);
  });

  it('should emit an event on hoverHandler call', async () => {
    useIsTextOverflowingMock.mockReturnValue(computed(() => true));
    const wrapper = await mount(Comp);
    wrapper.trigger('mouseover');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('show-tooltip')?.length).toBeGreaterThan(0);
  });
});
