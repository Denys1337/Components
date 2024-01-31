import { mount } from '@vue/test-utils';

import Injector from '@agritask/js-utils/libs/inject/Injector';

import { unitOptionGroupsMock } from '../../../shared/mock';
import AtFormBuilderUnitPopup from './AtFormBuilderUnitPopup.vue';

jest.mock('@agritask/js-utils/libs/inject/Injector');

(Injector.get as jest.Mock).mockReturnValue({
  tc: (key: string) => key,
  t: (key: string) => key,
});

const mountComponent = (props = {}) => {
  return mount(AtFormBuilderUnitPopup as any, {
    props: {
      show: true,
      unitOptionGroups: unitOptionGroupsMock,
      selectedUnits: [],
      modelValue: {
        options: [],
        groupTitle: '',
      },
      ...props,
    },
    global: {
      mocks: {
        $t: (msg: string) => msg,
      },
    },
  });
};

describe('AtFormBuilderUnitPopup', () => {
  it('group select should be empty by default', () => {
    const AtFormBuilderUnitPopupComponent = mountComponent();
    const atSelect = AtFormBuilderUnitPopupComponent.findComponent('.AtSelect');
    const label = atSelect.find('.AtSelectBody-button');
    expect(label.text()).toBe('');
  });

  it('unit options should be hidden by default', () => {
    const AtFormBuilderUnitPopupComponent = mountComponent();
    const atCheckBoxGroup = AtFormBuilderUnitPopupComponent.findComponent('.AtCheckBoxGroup');
    expect(atCheckBoxGroup.exists()).toBe(false);
  });

  it('group select should be filled when modelValue has group value', () => {
    const AtFormBuilderUnitPopupComponent = mountComponent({
      modelValue: {
        options: [{ label: { en: 'second group 1' }, value: '21' }],
        groupTitle: 'second group',
      },
      unitOptionGroups: unitOptionGroupsMock,
    });

    const atSelect = AtFormBuilderUnitPopupComponent.findComponent('.AtSelect');

    const label = atSelect.find('button');
    expect(label.text()).toBe('second group');
  });

  it('unit options should be filled correctly when modelValue has group value', () => {
    const AtFormBuilderUnitPopupComponent = mountComponent({
      modelValue: {
        options: [
          {
            label: { en: 'second group 1' },
            value: '21',
          },
          {
            label: { en: 'second group 2' },
            value: '22',
          },
        ],
        groupTitle: 'second group',
      },
    });

    const atCheckBoxGroup = AtFormBuilderUnitPopupComponent.findComponent('.AtCheckBoxGroup');
    expect(atCheckBoxGroup.exists()).toBe(true);
    const atCheckBoxes = atCheckBoxGroup.findAllComponents('.AtCheckbox');

    expect(atCheckBoxes[0].find('.at-checkbox-label').text()).toBe('second group 1');
    expect(atCheckBoxes[1].find('.at-checkbox-label').text()).toBe('second group 2');
  });
  it('unit options should be сhecked correctly when modelValue has group and options value', () => {
    const AtFormBuilderUnitPopupComponent = mountComponent({
      modelValue: {
        options: [
          {
            label: { en: 'second group 1' },
            value: '21',
          },
        ],
        groupTitle: 'second group',
      },
    });

    const atCheckBoxGroup = AtFormBuilderUnitPopupComponent.findComponent('.AtCheckBoxGroup');
    expect(atCheckBoxGroup.exists()).toBe(true);

    const atCheckBoxes = atCheckBoxGroup.findAllComponents('.AtCheckbox');

    // verifying first check box text
    expect(atCheckBoxes[0].find('.at-checkbox-label').text()).toBe('second group 1');
    //first check box should be checked
    expect(atCheckBoxes[0].find('.checked').exists()).toBe(true);

    // verifying second check box text
    expect(atCheckBoxes[1].find('.at-checkbox-label').text()).toBe('second group 2');
    // second check box should be unchecked
    expect(atCheckBoxes[1].find('.checked').exists()).toBe(false);
  });
});
