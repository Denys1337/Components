import { shallowMount } from '@vue/test-utils';

import AtPagination from './AtPagination.vue';
import { DEFAULT_ITEMS_PER_PAGE_OPTIONS, DEFAULT_ITEMS_PER_PAGE } from './types';

describe('AtPagination component readonly', () => {
  // @ts-ignore
  const wrapper = shallowMount(AtPagination, {
    propsData: {
      totalItems: 1,
      selectedRowsCount: 0,
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      itemsPerPageOptions: DEFAULT_ITEMS_PER_PAGE_OPTIONS,
      showPrevNextButtons: true,
      showFirstLastButtons: true,
      startingPage: 0,
      currentPage: 0,
    },
    global: {
      mocks: {
        $t: (msg: string) => msg,
        $tc: (msg: string) => msg,
      },
    },
  });

  it('should display AtPagination', () => {
    // @ts-ignore
    const foundComponent = wrapper.find('.AtPagination');

    expect(foundComponent.exists()).toBe(true);
  });

  it('test previous buttons state', async () => {
    const firstPageBtn = wrapper.find('.pagination-first-page');
    const previousPageBtn = wrapper.find('.pagination-previous-page');

    expect(firstPageBtn.attributes('disabled')).toBe('true');
    expect(previousPageBtn.attributes('disabled')).toBe('true');
  });

  it('test next buttons state', async () => {
    const lastPageBtn = wrapper.find('.pagination-last-page');
    const nextPageBtn = wrapper.find('.pagination-next-page');

    expect(lastPageBtn.attributes('disabled')).toBe('true');
    expect(nextPageBtn.attributes('disabled')).toBe('true');
  });
});
