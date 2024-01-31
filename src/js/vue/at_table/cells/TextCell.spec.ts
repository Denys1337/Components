import { mount } from '@vue/test-utils';

import TextCell from './TextCell.vue';

describe('Test TextCell', () => {
  it('should show the value string', () => {
    const str = 'just a string';
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: str,
        column: {},
      },
    });
    expect(textCell.text().includes(str)).toBe(true);
  });

  it('should show the modelValue.value string', () => {
    const str = 'just a string';

    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: {
          value: str,
          hint: '',
        },
        column: {},
      },
    });
    expect(textCell.text().includes(str)).toBe(true);
  });

  it('should not render the cell if passed an object with empty value', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: {
          value: '',
          hint: '',
        },
        column: {},
      },
    });
    expect(textCell.html()).toBe('<!--v-if-->');
  });

  it('should not render the cell if passed null', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: null,
        column: {},
      },
    });
    expect(textCell.html()).toBe('<!--v-if-->');
  });

  it('should not render the cell if passed undefined', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: undefined,
        column: {},
      },
    });
    expect(textCell.html()).toBe('<!--v-if-->');
  });

  it('should render when passed a boolean', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: false,
        column: {},
      },
    });
    expect(textCell.text()).toBe('false');
  });

  it('should render when passed a number', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: 123,
        column: {},
      },
    });
    expect(textCell.text()).toBe('123');
  });

  it('should emit a show-tooltip event on hover when have a hint', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue: {
          value: '123',
          hint: '123456789012345678901234567890123456789012345678901234567890',
        },
      },
    });
    textCell.trigger('mouseover');
    expect(textCell.emitted('show-tooltip')).toBeDefined();
  });

  it('should emit a show-tooltip event on hover when text overflowing', () => {
    // @ts-ignore
    const textCell = mount(TextCell, {
      props: {
        modelValue:
          '1ldsifhjais djhfb iasjdfoisjdofjhsbdof ijasndfoijsnd foijnasd ofijnasdofjinaodsjifn',
      },
    });

    const span = textCell.find('.TextCell');

    jest.spyOn(span.element, 'clientWidth', 'get').mockReturnValue(500);
    jest.spyOn(span.element, 'scrollWidth', 'get').mockReturnValue(1000);

    textCell.trigger('mouseover');
    expect(textCell.emitted('show-tooltip')).toBeDefined();
  });
});
