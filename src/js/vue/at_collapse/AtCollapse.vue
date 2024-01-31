<template>
  <div class="AtCollapse">
    <AtButton :visual="ButtonVisual.text" @click="isCollapsedModal = !isCollapsedModal">
      {{ buttonLabel }}
      <template #end>
        <ChevronDownIcon :class="{ 'rotate-180 transform-transition': !isCollapsedModal }" />
      </template>
    </AtButton>
    <div v-if="!isCollapsedModal"><slot></slot></div>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'AtCollapse',
  };
</script>
<script setup lang="ts">
  import { computed } from 'vue';

  import { ChevronDownIcon } from 'vue-tabler-icons';

  import AtButton from '../at_button/AtButton.vue';
  import { ButtonVisual } from '../at_button/types';
  const props = defineProps({
    buttonLabel: {
      type: String,
      required: true,
    },
    collapsed: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(['update:collapsed']);

  const isCollapsedModal = computed({
    get: () => props.collapsed,
    set: (value: boolean) => emit('update:collapsed', value),
  });
</script>
