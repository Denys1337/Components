<template>
  <div class="SearchInput flex-grow-1 search-field">
    <label :for="atInputId">
      <SearchIcon class="icon" :size="`${iconSize}`" />
    </label>
    <AtInput ref="atInput" :id="atInputId" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
  export default { name: 'SearchInput' };
</script>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import { SearchIcon } from 'vue-tabler-icons';

  import createId from '@agritask/js-utils/libs/createId';

  import AtInput from './AtInput.vue';
  import { AtInputRef } from './types';
  const atInput = ref<AtInputRef>();
  const atInputId = createId('atInput');

  const props = defineProps({
    iconSize: { type: Number, default: 20 },
    autoFocus: { type: Boolean, required: false },
  });

  onMounted(() => {
    if (props.autoFocus) {
      atInput.value!.focusInput();
    }
  });
</script>

<style lang="scss">
  .search-field {
    .AtInput {
      --input-indent: calc(1px * v-bind(iconSize) + var(--spacing-03));
    }
    .icon {
      position: absolute;
      inset-block-start: calc((40px - (v-bind(iconSize) * 1px)) / 2);
    }
  }
</style>
