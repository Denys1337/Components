<template>
  <div class="AtPagination p-sticky" :style="cssVars">
    <div class="border-container">
      <span class="showing-items font-body-small" v-show="isLoading">
        {{ $t('tables.pagination.loading') }}
      </span>
      <span class="showing-items font-body-small" v-if="!selectedRowsCount && !isLoading">
        {{
          $t('tables.pagination.showing_items', { startIndex, endIndex, totalItems }, totalItems)
        }}
      </span>
      <span class="showing-items selection-text font-body-small margin-00" v-if="selectedRowsCount">
        {{ $t('tables.pagination.selected_rows', { selectedRowsCount }, selectedRowsCount) }}
        <AtButton visual="text" size="s" @click="$emit('clear-selection')">
          {{ $t(`tables.pagination.clear_selection`) }}
        </AtButton>
      </span>

      <form class="items_per_page_select end">
        <label for="items_per_page_select_label" class="font-body-small inline-end-01">
          {{ $t('tables.pagination.items_per_page_select_label') }}
        </label>
        <select
          name="items_per_page_select_label"
          class="page-quantity font-body-small"
          :disabled="totalItems < minimumItemsPerPage || isLoading"
          v-model="localItemsPerPage"
          :label="$t('tables.pagination.dropdown_label')"
        >
          <option
            :value="option.value"
            v-for="option of localItemsPerPageOptions"
            :key="`items_per_page_${option.value}`"
          >
            {{ option.text }}
          </option>
        </select>
      </form>
      <ul class="pagination-list">
        <li v-if="showFirstLastButtons">
          <AtButton
            visual="text"
            size="s"
            :disabled="isPreviousPagesDisabled || isLoading"
            is-square
            @click="firstPage"
            class="pagination-first-page"
          >
            <template #start>
              <Component
                size="24"
                :is="paginationIcons.firstPage.icon"
                :transform="paginationIcons.firstPage.transform"
              />
            </template>
          </AtButton>
        </li>
        <li v-if="showPrevNextButtons">
          <AtButton
            visual="text"
            size="s"
            :disabled="isPreviousPagesDisabled || isLoading"
            @click="previous"
            is-square
            class="pagination-previous-page"
          >
            <template #start>
              <Component
                :is="paginationIcons.previousPage.icon"
                :transform="paginationIcons.previousPage.transform"
              />
            </template>
          </AtButton>
        </li>

        <li v-if="showPrevNextButtons">
          <AtButton
            visual="link"
            size="s"
            :disabled="isNextPagesDisabled || isLoading"
            @click="next"
            is-square
            class="pagination-next-page"
          >
            <template #start>
              <Component
                :is="paginationIcons.nextPage.icon"
                :transform="paginationIcons.nextPage.transform"
              />
            </template>
          </AtButton>
        </li>
        <li v-if="showFirstLastButtons">
          <AtButton
            visual="text"
            size="s"
            :disabled="isNextPagesDisabled || isLoading"
            @click="lastPage"
            is-square
            class="pagination-last-page"
          >
            <template #start>
              <Component
                :is="paginationIcons.lastPage.icon"
                :transform="paginationIcons.lastPage.transform"
              />
            </template>
          </AtButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, toRefs, watch, PropType } from 'vue';

  import AtButton from '../at_button/AtButton.vue';
  import { isRTL } from '../utils/styling';
  import usePagination from './hooks/usePagination';
  import {
    DefaultItemPerPageOption,
    paginationIconsMap,
    DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    DEFAULT_ITEMS_PER_PAGE,
  } from './types';

  export default defineComponent({
    name: 'AtPagination',
    components: { AtButton },
    props: {
      startingPage: {
        type: Number,
        default: 1,
      },
      totalItems: {
        type: Number,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        default: DEFAULT_ITEMS_PER_PAGE,
      },
      itemsPerPageOptions: {
        type: Array as PropType<DefaultItemPerPageOption[]>,
        default: () => DEFAULT_ITEMS_PER_PAGE_OPTIONS,
      },
      // Whether to show the previous/next buttons UI to the user.
      showPrevNextButtons: {
        type: Boolean,
        default: true,
      },
      // Whether to show the first/last buttons UI to the user.
      showFirstLastButtons: {
        type: Boolean,
        default: true,
      },
      selectedRowsCount: {
        type: Number,
        default: 0,
      },
      parentBackground: {
        type: String,
        default: 'var(--white)',
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
    },
    emits: ['change-page', 'change-items-per-page', 'clear-selection'],
    setup(props, { emit }) {
      const { startingPage, totalItems, currentPage } = toRefs(props);
      const cssVars = {
        '--parent-bg': props.parentBackground,
      };
      const isPreviousPagesDisabled = computed(() => {
        if (props.totalItems === 0) return true;
        return props.currentPage === props.startingPage;
      });
      const isNextPagesDisabled = computed(() => {
        if (props.totalItems === 0) return true;
        if (props.startingPage === 0) {
          // When starting in 0 current page would fall behind the total pages
          return props.currentPage === totalPages.value - 1;
        }
        return props.currentPage === totalPages.value;
      });
      const paginationIcons = paginationIconsMap(isRTL());
      const localItemsPerPage = ref(props.itemsPerPage);
      const minimumItemsPerPage = computed(() =>
        Math.min(...props.itemsPerPageOptions.map((opt) => opt.value))
      );
      const localItemsPerPageOptions = computed(() => {
        if (!props.itemsPerPageOptions.some((option) => option.value === props.itemsPerPage)) {
          return [
            ...props.itemsPerPageOptions,
            { value: props.itemsPerPage, text: props.itemsPerPage },
          ].sort((a, b) => a.value - b.value);
        }
        return props.itemsPerPageOptions;
      });
      watch(
        () => props.isLoading,
        () => {
          firstPage();
        }
      );
      watch(
        () => localItemsPerPage.value,
        () => {
          firstPage();
          emit('change-items-per-page', localItemsPerPage.value);
        }
      );

      const { startIndex, endIndex, totalPages } = usePagination({
        startingPage,
        currentPage,
        totalItems,
        itemsPerPage: localItemsPerPage,
      });

      const setCurrentPage = (page: number) => {
        if (page > totalPages.value || page < props.startingPage) {
          return;
        }

        emit('change-page', page);
      };

      const next = () => {
        if (props.currentPage >= totalPages.value) return;
        setCurrentPage(props.currentPage + 1);
      };
      const previous = () => {
        if (props.currentPage === props.startingPage) return;
        setCurrentPage(props.currentPage - 1);
      };

      const firstPage = () => {
        setCurrentPage(props.startingPage);
      };
      const lastPage = () => {
        if (startingPage.value === 0) setCurrentPage(totalPages.value - 1);
        else setCurrentPage(totalPages.value);
      };

      return {
        minimumItemsPerPage,
        cssVars,
        startIndex,
        endIndex,
        totalPages,
        isPreviousPagesDisabled,
        isNextPagesDisabled,
        next,
        previous,
        firstPage,
        lastPage,
        localItemsPerPage,
        localItemsPerPageOptions,
        paginationIcons,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @import '../../../style/scss/_base_functions.scss';

  .AtPagination {
    top: calc(var(--header-height) - 2px);
    padding-top: 4px;
    background: var(--parent-bg);
    z-index: 2;
    .showing-items {
      display: flex;
      gap: var(--spacing-02);
      color: var(--gray-600);
      align-items: center;
    }

    //A container to hide background when pagination is sticky
    .border-container {
      transform: translateY(1px); //Hides the bottom border when not sticky
      font-size: pxToRem(14);
      padding: var(--spacing-03) var(--spacing-04) var(--spacing-03) var(--spacing-04);
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: pxToRem(8) pxToRem(8) 0 0;
      border: solid 1px var(--gray-400);
      background: white;
      z-index: -1;
      height: 100%;
    }
    .pagination-list {
      align-self: center;
      padding-inline-start: var(--spacing-06);
      margin: 0;
      display: flex;
      li {
        list-style: none;
        .AtButton:disabled {
          color: var(--gray-500);
        }
      }
    }
    .page-quantity {
      height: 28px;
      color: var(--black);
      border: 1px solid var(--gray-500);
      border-radius: 0.25rem;
    }
    .no-selection-text,
    .select-label {
      color: var(--gray-600);
    }
    .selection-text {
      .AtButton {
        font-size: pxToRem(14);
      }
    }
    .end {
      margin-inline-start: auto;
      color: var(--gray-600);
    }
  }
</style>
