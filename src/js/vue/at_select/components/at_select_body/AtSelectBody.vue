<template>
  <div class="AtSelectBody" :class="{ 'dropdown-opened': dropdownOpened }" @click="onClicked">
    <Component :is="labelComponent" v-bind="$props" class="pad-inline-start-02">
      <div class="AtSelectBody-buttons">
        <AtButton
          :disabled="disabled"
          visual="text"
          size="m"
          v-show="selectedOptions?.length"
          class="body-btn"
          @click.stop="clearSelections"
          v-if="showClearButton"
        >
          {{ $t('general.clear') }}
        </AtButton>
        <i class="arrow-icon body-btn"></i>
      </div>
    </Component>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount } from 'vue';

  import AtButton from '../../../at_button/AtButton.vue';
  import AtSelectBodyInlineLabel from './components/AtSelectBodyInlineLabel.vue';
  import AtSelectBodyJumpingLabel from './components/AtSelectBodyJumpingLabel.vue';
  import { atSelectBodyProps } from './types';

  import '../../../at_input/at-input.scss';

  import './at-select-body.scss';

  export default defineComponent({
    name: 'AtSelectBody',
    components: { AtButton, AtSelectBodyJumpingLabel, AtSelectBodyInlineLabel },
    props: atSelectBodyProps,
    emits: { 'toggle-options': null, 'clear-selections': null },
    setup(props, { emit }) {
      const onClicked = () => {
        emit('toggle-options');
      };

      onBeforeUnmount(() => emit('toggle-options', false));

      const labelComponent = computed(() =>
        props.useInlineLabel ? AtSelectBodyInlineLabel : AtSelectBodyJumpingLabel
      );

      return {
        labelComponent,
        onClicked,
        clearSelections: () => emit('clear-selections'),
      };
    },
  });
</script>
