import { ref } from 'vue';

import { DEFAULT_ITEMS_PER_PAGE } from '../types';
import usePagination from './usePagination';

describe('usePagination hook for starting page 0', () => {
  const startingPage = ref(0);
  const currentPage = ref(0);
  const itemsPerPage = ref(DEFAULT_ITEMS_PER_PAGE);
  const totalItems = ref(0);
  const { totalPages, endIndex } = usePagination({
    startingPage,
    currentPage,
    itemsPerPage,
    totalItems,
  });
  it('if there are no items total pages is 0', () => {
    expect(totalPages.value).toBe(0);
  });
  it('if there is 1 item total pages is 1', () => {
    totalItems.value = 1;
    expect(totalPages.value).toBe(1);
  });
  it('if total pages is 1 end index should be the total items', () => {
    totalItems.value = 12;
    expect(endIndex.value).toBe(12);
  });
  it('if current page is 2 and total pages 5 end index should be last items per page', () => {
    currentPage.value = 2;
    totalItems.value = 125;
    expect(endIndex.value).toBe(75);
  });
  it('if total items is the size of items per page total pages is 1', () => {
    totalItems.value = 25;
    expect(totalPages.value).toBe(1);
  });
  it('if total items is bigger than items per page total pages is calculated correctly', () => {
    totalItems.value = 26;
    expect(totalPages.value).toBe(2);
  });
});

describe('usePagination hook for starting page 1', () => {
  const startingPage = ref(1);
  const currentPage = ref(1);
  const itemsPerPage = ref(DEFAULT_ITEMS_PER_PAGE);
  const totalItems = ref(0);
  const { totalPages, endIndex } = usePagination({
    startingPage,
    currentPage,
    itemsPerPage,
    totalItems,
  });
  it('if there are no items total pages is 0', () => {
    expect(totalPages.value).toBe(0);
  });
  it('if total pages 1 end index should be total items', () => {
    totalItems.value = 12;
    expect(endIndex.value).toBe(12);
  });
  it('if total pages 5 and current page 2 end index should be last items per page', () => {
    totalItems.value = 100;
    currentPage.value = 2;
    expect(endIndex.value).toBe(50);
  });
  it('if there is 1 item total pages is 1', () => {
    totalItems.value = 1;
    expect(totalPages.value).toBe(1);
  });
  it('if total items is the size of items per page total pages is 1', () => {
    totalItems.value = 25;
    expect(totalPages.value).toBe(1);
  });
  it('if total items is bigger than items per page total pages is calculated correctly', () => {
    totalItems.value = 26;
    expect(totalPages.value).toBe(2);
  });
});
