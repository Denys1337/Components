<template>
  <div class="AtAccordion" :class="{ opened: expanded, disabled }" ref="root">
    <div class="AtAccordion-header" @click="handleHeaderClick">
      <slot name="header" :opened="expanded"></slot>
    </div>
    <Transition name="fade" mode="out-in" appear>
      <div class="AtAccordion-content" v-show="expanded">
        <div class="AtAccordion-content-wrapper" ref="contentWrapperElementRef">
          <slot name="body"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';

  export default defineComponent({
    name: 'AtAccordion',
    props: {
      isOpened: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      offsetHeight: { type: Number, default: 45 },
    },
    setup(props) {
      const expanded = ref(false);
      const contentWrapperElementRef = ref<HTMLElement>();
      const root = ref();

      watch(
        () => [props.isOpened, props.disabled],
        () => {
          expanded.value = props.isOpened && !props.disabled;
        },
        { immediate: true }
      );

      const handleHeaderClick = () => {
        expanded.value = !expanded.value;
      };

      return {
        expanded,
        handleHeaderClick,
        contentWrapperElementRef,
        root,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .AtAccordion-content {
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
</style>
