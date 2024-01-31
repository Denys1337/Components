<template>
  <div class="AtSelectFilter">
    <div class="search-wrapper">
      <div :class="{ 'search-field': !searchButtonEnabled }" class="flex-grow-1">
        <label :for="atInputId" v-if="!searchButtonEnabled">
          <SearchIcon size="24" />
        </label>
        <AtInput
          :id="atInputId"
          v-model="searchText"
          ref="atInputRef"
          @keyup.enter="selectFirstOption"
          autocomplete="off"
          :placeholder="placeholder"
          class="AtSelectFilter"
        />
      </div>
      <AtButton
        v-if="searchButtonEnabled"
        @click="$emit('search', searchText)"
        is-square
        class="popup mr-1 inline-start-01"
        size="m"
      >
        <i class="icon icon-general-search"></i>
      </AtButton>
    </div>
    <slot name="dropdownListHeader"></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch, computed } from 'vue';

  import { SearchIcon } from 'vue-tabler-icons';

  import createId from '@agritask/js-utils/libs/createId';

  import AtButton from '../../at_button/AtButton.vue';
  import AtInput from '../../at_input/AtInput.vue';
  import getTranslators from '../../utils/getTranslators';
  export default defineComponent({
    name: 'AtSelectFilter',
    components: { AtInput, AtButton, SearchIcon },
    props: {
      dropdownOpened: { type: Boolean, default: false },
      defaultText: { type: String, default: '' },
      searchButtonEnabled: { type: Boolean, default: false },
      inputPlaceholder: { type: String },
    },
    emits: ['search', 'filter', 'select-first'],
    setup(props, { emit }) {
      const searchText = ref(props.defaultText);
      const atInputRef = ref<{ focusInput(): void }>();
      const atInputId = createId('atInput');
      const { t } = getTranslators();
      const placeholder = computed(() => {
        if (!props.searchButtonEnabled && !props.inputPlaceholder) return t('general.search');
        if (props.inputPlaceholder) return props.inputPlaceholder;
        return '';
      });
      watch(
        () => searchText.value,
        (text) => {
          emit('filter', text);
        }
      );

      watch(
        () => props.defaultText,
        (text) => {
          searchText.value = text;
        }
      );

      watch(
        () => props.dropdownOpened,
        (value) => {
          if (value) {
            atInputRef.value?.focusInput();
          } else {
            searchText.value = '';
          }
        }
      );

      onMounted(() => {
        if (props.dropdownOpened) {
          atInputRef.value?.focusInput();
        }
      });

      return {
        searchText,
        atInputRef,
        selectFirstOption: () => emit('select-first'),
        placeholder,
        atInputId,
      };
    },
  });
</script>

<style lang="scss">
  .search-field {
    display: flex;
    flex-grow: 1;
    position: relative;
    .AtSelectFilter {
      input {
        padding-inline-start: 2.75em;
        text-indent: 0;
      }
    }
    .icon-tabler-search {
      z-index: 3;
      position: absolute;
      inset-inline-start: var(--spacing-02);
      inset-block-end: var(--spacing-02);
      color: var(--gray-700);
    }
  }
  .AtSelectFilter {
    min-width: 100px;
    flex-grow: 1;
    flex: auto;
    position: sticky;
    inset-block-start: 0;
    background-color: var(--white);
    z-index: 2;
  }
  .search-wrapper {
    display: flex;
    align-items: center;
    .mt-container {
      max-width: 100%;
    }

    .popup {
      font-weight: normal;
      .icon-general-search {
        font-size: 1em;
        vertical-align: middle;
      }
    }
  }
</style>
