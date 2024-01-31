import { mount } from '@vue/test-utils';

import SubcolumnsCell from './SubcolumnsCell.vue';
import { DEFAULT_CHAR_LIMITATION } from './types';

describe('Test TextCell', () => {
  const modelValue = [
    new Array(DEFAULT_CHAR_LIMITATION + 1).fill('a').join(), //Over the limit
    'not overflowing',
    'dsadas',
  ];
  // @ts-ignore
  const subcolumnsCell = mount(SubcolumnsCell, {
    props: {
      modelValue,
      column: {
        description: '',
        format: '',
        name: 'object$materials$1',
        parentColumnName: 'object$materials',
        sortable: false,
        subcolumns: null,
        subtype: '',
        title: 'Name',
        type: 'TEXT',
      },
      rowIndex: 0,
      columnIndex: 0,
    },
  });
  it('should have 2 rows', () => {
    expect(subcolumnsCell.findAll('tr').length).toBe(3);
  });

  for (let index = 0; index < modelValue.length; index++) {
    it('should rows value should match the modelValue row - ' + index, () => {
      expect(subcolumnsCell.findAll('tr')[index].text()).toBe(modelValue[index]);
    });
  }

  it('should show tooltip on overflowing cell hover', () => {
    subcolumnsCell.findAll('tr')[0].find('td').trigger('mouseover');

    expect(subcolumnsCell.emitted('show-tooltip')).toBeDefined();
  });
});
