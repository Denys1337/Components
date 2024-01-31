import { computed, ref, Ref } from 'vue';

import { DEFAULT_ITEMS_PER_PAGE } from '../types';

interface UsePaginationParams {
  startingPage?: Ref<number>;
  currentPage: Ref<number>;
  itemsPerPage: Ref<number>;
  totalItems: Ref<number>;
}
export default function usePagination({
  startingPage = ref(1),
  currentPage = ref(1),
  itemsPerPage = ref(DEFAULT_ITEMS_PER_PAGE),
  totalItems,
}: UsePaginationParams) {
  const totalPages = computed(() => {
    if (totalItems.value === 0) return 0;
    if (totalItems.value < itemsPerPage.value) return 1;
    return Math.ceil(totalItems.value / itemsPerPage.value);
  });

  const startIndex = computed(
    () => 1 + (currentPage.value - startingPage.value) * itemsPerPage.value
  );
  const lastItemInPage = computed(() => startIndex.value + itemsPerPage.value - 1);
  const endIndex = computed(() => {
    //To make sure we get the correct page, in case starting page initialized by zero.
    if (currentPage.value === 0 && totalPages.value === 1) return totalItems.value;
    return Math.min(lastItemInPage.value, totalItems.value);
  });
  return {
    startIndex,
    endIndex,
    totalPages,
  };
}
