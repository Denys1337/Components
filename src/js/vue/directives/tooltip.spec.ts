import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';

import { tooltip as vTooltip, DIRECTIVE_TOOLTIP_ID } from './tooltip';

let isOverflowMock = false;
beforeEach(() => {
  if (!isOverflowMock) return;
  jest.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(10);
  jest.spyOn(Element.prototype, 'scrollWidth', 'get').mockReturnValue(70);
});

const Component = (innerText: string, isOverflow?: boolean) =>
  defineComponent({
    directives: { tooltip: vTooltip },
    props: { text: { type: String, required: false } },
    template: `<div id=${'el_' + innerText} v-tooltip${
      isOverflow ? '.overflow' : ''
    }="{text}">${innerText}</div>`,
  });

describe('Tooltip directive', () => {
  const wrapper1 = mount(Component('1'), {
    global: {
      directives: {
        tooltip: vTooltip,
      },
    },
    attachTo: document.body,
  });
  const wrapper2 = mount(Component('2'), {
    global: {
      directives: {
        tooltip: vTooltip,
      },
    },
    attachTo: document.body,
  });
  const overflow = mount(Component('overflow', true), {
    global: {
      directives: {
        tooltip: vTooltip,
      },
    },
    attachTo: document.body,
  });
  beforeEach(() => {});

  it('should create a tooltip component', async () => {
    const tooltip = document.getElementById(DIRECTIVE_TOOLTIP_ID);
    expect(tooltip).not.toBeNull();
  });

  it('should show a tooltip with the inner text of the element', async () => {
    wrapper1.trigger('mouseover').then(() => {
      expect(getTooltipText()).toBe('1');
    });
  });

  it('should show a tooltip with the prop text of the element', async () => {
    await wrapper1.setProps({ text: 'prop1' });
    await nextTick();
    await wrapper1.trigger('mouseover');
    await nextTick();
    expect(getTooltipText()).toBe('prop1');
  });

  it('should show a tooltip with text from other element element', async () => {
    await wrapper2.trigger('mouseover');
    await nextTick();
    expect(getTooltipText()).toBe('2');
  });

  it('should not display a tooltip on no overflow', async () => {
    await overflow.trigger('mouseover');
    await nextTick();
    expect(getTooltipText()).not.toBe('overflow');

    //Setup for next test with overflow
    isOverflowMock = true;
  });

  it('should show a tooltip on overflow', async () => {
    await overflow.trigger('mouseover');
    await nextTick();
    expect(getTooltipText()).toBe('overflow');

    //ending overflow mock
    isOverflowMock = false;
  });
});

function getTooltipText() {
  const tooltip = document.getElementById(DIRECTIVE_TOOLTIP_ID);
  return tooltip!.textContent;
}
