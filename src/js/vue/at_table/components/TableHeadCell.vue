<template>
  <th
    :nowrap="column.width === 'oneLine'"
    :rowspan="hasSubColumns ? 1 : 2"
    :colspan="hasSubColumns ? column.subcolumns?.length : 1"
    :class="{ resizing: isResizing }"
    class="TableHeadCell table-head-cell font-tag"
    ref="elementRef"
  >
    <div class="cell">
      <div
        :class="[{ sorting: hasSorting }, sorting[column.name]]"
        class="width-inherit"
        @click="hasSorting && !isResizing && $emit('sort')"
      >
        <div :id="id" @mouseover="hoverHandler" ref="titleRef" class="table-head-cell-title">
          {{ column.title }}
          <slot :name="`table-head-cell-title-${column.name}`"></slot>
        </div>
        <div class="sorting-arrows" v-if="hasSorting">
          <SortingArrow
            :class="`${direction}-arrow`"
            v-for="direction in ['up', 'down']"
            :key="direction"
          />
        </div>
      </div>
      <div class="resizer" @mousedown="handleResizeInit">|</div>
    </div>
  </th>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import useColumnResize from '../cells/hooks/useColumnResize';
  import { Column, MIN_CELL_WIDTH, SortingDirection } from '../types';
  import SortingArrow from './SortingArrow.vue';

  export default defineComponent({
    name: 'TableHeadCell',
    components: { SortingArrow },
    props: {
      column: { type: Object as PropType<Column>, required: true },
      sorting: { type: Object as PropType<Record<string, SortingDirection>>, required: true },
    },
    emits: ['sort', 'show-tooltip', 'resized'],
    setup(props, { emit }) {
      const hasSubColumns = computed(() => props.column.subcolumns?.length);
      const hasSorting = computed(() => props.column.sortable && !hasSubColumns.value);
      const id = createId('header-cell');
      const titleRef = ref<HTMLElement>();
      const hoverHandler = () => {
        if (titleRef.value && titleRef.value.clientWidth < titleRef.value.scrollWidth) {
          emit('show-tooltip', { id, message: props.column.title });
        }
      };

      const elementRef = ref();

      const handleDrag = (e: MouseEvent) => {
        const offset = startWidth.value + (e.clientX - startingMousePosition.value);
        if (offset >= MIN_CELL_WIDTH) {
          elementRef.value.style.maxWidth = `${offset}px`;
          emit('resized', `${offset}px`);
        }
      };

      const { handleResizeInit, startWidth, startingMousePosition, isResizing } = useColumnResize(
        elementRef,
        handleDrag
      );

      return {
        hasSubColumns,
        hasSorting,
        titleRef,
        elementRef,
        hoverHandler,
        id,
        isResizing,
        handleResizeInit,
        MIN_CELL_WIDTH,
      };
    },
  });
</script>

<style lang="scss">
  .AtTable {
    &:not(:has(.resizing)) {
      .TableHeadCell:hover {
        .resizer {
          opacity: 1;
        }
      }
    }

    .TableHeadCell {
      color: var(--gray-800);
      max-width: 30ch;
      min-width: v-bind(MIN_CELL_WIDTH);

      .width-inherit {
        width: inherit;
      }

      .cell {
        min-width: v-bind(MIN_CELL_WIDTH);
        width: 100%;
        max-width: 100%;
        position: relative;
        flex-grow: 1;
      }

      .table-head-cell-title {
        max-width: inherit;
        overflow: hidden;
        user-select: none;
        text-overflow: ellipsis;
      }

      &.resizing {
        .resizer {
          opacity: 1;
        }
      }

      .resize-in-progress {
        .resizer {
          width: 100%;
        }
      }

      .resizer {
        user-select: none;
        margin-inline-start: auto;
        opacity: 0;
        // In order to icrease a bit the surrface of interaction
        min-width: var(--spacing-03);
        padding-inline-start: var(--spacing-01);
        height: 15px;
        cursor: col-resize;
      }

      .sorting {
        cursor: pointer;
        width: fit-content;
        display: flex;
        gap: var(--spacing-01);
        align-items: center;
        max-width: inherit;
        margin-inline-end: var(--spacing-01);

        .sorting-arrows {
          display: flex;
          gap: 2px;
          flex-direction: column;
        }
        .down-arrow,
        .up-arrow {
          --arrow-color: var(--gray-500);
          fill: var(--arrow-color);
        }
        .down-arrow {
          transform: rotate(180deg);
        }
        &.asc {
          .up-arrow {
            --arrow-color: var(--pri-500);
          }
        }
        &.desc {
          .down-arrow {
            --arrow-color: var(--pri-500);
          }
        }
      }
    }
  }
</style>
