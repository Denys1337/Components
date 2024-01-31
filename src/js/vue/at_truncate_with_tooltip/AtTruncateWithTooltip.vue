<template>
  <Component
    v-if="shouldUseTag"
    :is="tag"
    v-bind="$attrs"
    ref="elementRef"
    class="TruncateWithTooltip"
  >
    {{ truncatedContent }}
  </Component>
  <!-- The truncatedContent has to stay in the same tag as the parent component - no wrappers -->
  {{ shouldUseTag ? '' : truncatedContent }}
  <Tooltip v-if="showTooltip" v-bind="$props" :reference="tooltipRef">
    {{ fullText }}
  </Tooltip>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, onMounted, ref, toRefs } from 'vue';

  import useTruncatedString, { DEFAULT_CLAMP_VALUE } from '../hooks/useTruncate';
  import Tooltip from '../tooltip/Tooltip.vue';
  import { ElementReference, tooltipProps } from '../tooltip/types';

  export default defineComponent({
    name: 'TruncateWithTooltip',
    components: { Tooltip },
    props: {
      ...tooltipProps,
      length: { type: Number, required: false },
      fullText: { type: String, required: true },
      clamp: { type: String, default: DEFAULT_CLAMP_VALUE },
      tag: { type: String, required: false },
    },
    setup(props) {
      const { length, fullText, clamp, tag, ...otherProps } = toRefs(props);
      const truncatedContent = props.length
        ? useTruncatedString(fullText, props.length)
        : computed(() => props.fullText);

      const showTooltip = computed(
        (): boolean => props.length !== undefined && props.fullText?.length > props.length
      );

      const elementRef = ref<ElementReference>();
      const shouldUseTag = computed(
        (): boolean => props.tag !== undefined && typeof props.tag === 'string' && !!props.tag
      );
      const tooltipRef = ref<HTMLElement | ElementReference | string | undefined>(props.reference);

      onMounted(() => {
        if (!props.reference) {
          const vm = getCurrentInstance()?.proxy;
          tooltipRef.value = shouldUseTag.value ? elementRef.value : ref(vm?.$el?.parentElement);
        }
      });

      return {
        truncatedContent,
        showTooltip,
        tooltipRef,
        shouldUseTag,
        elementRef,
        otherProps,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .TruncateWithTooltip {
    width: fit-content;
  }
</style>
