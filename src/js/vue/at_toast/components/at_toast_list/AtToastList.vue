<template>
  <aside
    class="AtToastList"
    :class="position.replace('-', ' ')"
    :style="listStyles"
    v-show="validToasts.length"
  >
    <TransitionGroup class="AtToastList-list" name="AtToastList-list" tag="ul">
      <AtToastCard v-for="toast of validToasts" v-bind="toast" :key="toast.id" />
    </TransitionGroup>
  </aside>
</template>

<script lang="ts">
  import { computed, Ref, defineComponent, PropType } from 'vue';

  import { AtToastOptionsWithId, AtToastPluginOptions } from '../../types';
  import AtToastCard from '../at_toast_card/AtToastCard.vue';
  export default defineComponent({
    name: 'AtToastList',
    components: { AtToastCard },
    props: {
      position: { type: String, required: true },
      toasts: { type: Object as PropType<Ref<AtToastOptionsWithId[]>>, required: true },
      toastListStyles: { type: Object as PropType<AtToastPluginOptions>, required: true },
    },
    setup(props) {
      const listStyles = {
        '--inset-from-top-edge': props.toastListStyles.topInset,
        '--inset-from-bottom-edge': props.toastListStyles.bottomInset,
        '--inset-from-inline-edge': props.toastListStyles.inlineInset,
      };

      const validToasts = computed(() =>
        // toasts come from the render function as a Ref ,otherwise they lose their reactivity
        props.toasts.value.map((toast: AtToastOptionsWithId) => {
          if (toast.isCloseDisabled && !toast.duration) {
            console.error('Toasts with disabled close button must have duration!');
            toast.isCloseDisabled = false;
          }
          return toast;
        })
      );
      return { validToasts, listStyles };
    },
  });
</script>

<style lang="scss" scoped>
  .AtToastList {
    --animation-duration: 240ms;
    position: fixed;
    z-index: var(--toast-z);

    &.end {
      inset-inline-end: var(--inset-from-inline-edge);
    }
    &.start {
      inset-inline-start: var(--inset-from-inline-edge);
    }
    &.center {
      inset-inline-start: 50vw;
      transform: translateX(-50%);
    }
    &.bottom {
      bottom: var(--inset-from-bottom-edge);
      .AtToastList-list-enter {
        transform: translateY(calc(var(--inset-from-bottom-edge) + 300%));
      }
    }
    &.top {
      top: var(--inset-from-top-edge);
      .AtToastList-list {
        flex-direction: column-reverse;
        &-enter {
          transform: translateY(calc(-1 * (var(--inset-from-top-edge) + 300%)));
        }
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-03);
      overflow-y: visible;

      &-leave-to {
        transform: scale(0.5);
        opacity: 0;
      }
      //List modifications animations
      &-enter-active,
      &-move,
      &-leave-active {
        transition: all var(--animation-duration) cubic-bezier(0.18, 0.63, 0.365, 1.29);
      }
    }
  }
</style>
