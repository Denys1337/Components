<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, onUnmounted } from 'vue';

  export default defineComponent({
    name: 'ClickAway',
    emits: ['clickaway'],
    setup(_, { emit, slots }) {
      const vm = getCurrentInstance()?.proxy;

      function handleClick(event: MouseEvent) {
        const path = event.composedPath();

        // Ignore the event it the target is on composedPath or has 'ignore-click-away' class
        const ignore =
          (vm && path.includes(vm.$el)) ||
          path.some((el) => {
            const classList = (el as any)['classList'] as DOMTokenList;
            return classList && classList.contains('ignore-click-away');
          });

        if (ignore) {
          return;
        }

        emit('clickaway');
      }

      const eventHandlerOptions = {
        passive: true,
        capture: true,
      };

      onMounted(() => {
        document.addEventListener('click', handleClick, eventHandlerOptions);
      });

      onUnmounted(() => {
        document.removeEventListener('click', handleClick, eventHandlerOptions);
      });

      return () => {
        const children = slots.default && slots.default();

        return children ? children[0] : null;
      };
    },
  });
</script>
