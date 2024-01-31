<template>
  <section class="AtCard-footer d-flex flex-column pad-block-start-04 pad-inline-06">
    <div
      name="description"
      :class="{ truncate: truncateClass }"
      class="description block-end-02 text-gray-800"
    >
      <slot name="description">
        <p ref="descriptionRef" v-if="description">
          {{ description }}
        </p>
      </slot>
    </div>
    <footer
      class="card-additional-info d-flex jc-space-between ai-center font-body-small texy-gray-1000"
    >
      <slot name="startAdditional">
        <span ref="infoRef" v-if="additionalInfo">
          {{ truncatedInfo }}
        </span>
      </slot>
      <slot name="endAdditional">
        <AtButton v-if="showButton" :size="buttonSize" @click="$emit('click')">{{
          buttonContent
        }}</AtButton>
      </slot>
    </footer>
  </section>
  <Tooltip :reference="descriptionRef" v-if="descriptionRef && showDescTooltip">
    {{ description }}
  </Tooltip>
  <Tooltip :reference="infoRef" v-if="infoRef && showInfoTooltip">{{ additionalInfo }}</Tooltip>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, computed, defineAsyncComponent } from 'vue';

  import AtButton from '../../at_button/AtButton.vue';
  import { ButtonSize } from '../../at_button/types';
  const Tooltip = defineAsyncComponent(
    () => import(/* webpackChunkName: "Tooltip" */ '../../tooltip/Tooltip.vue')
  );
  import { ElementReference } from '../../tooltip/types';
  import { truncateString } from '../../utils/truncateString';
  import { CONTENT_MAX_LENGTH, INFO_MAX_LENGTH } from './../types';
  import './../at-card.scss';
  export default defineComponent({
    name: 'AtCardFooter',
    components: {
      AtButton,
      Tooltip,
    },
    props: {
      additionalInfo: { type: String },
      buttonContent: { type: String },
      buttonSize: { type: String as PropType<ButtonSize>, default: ButtonSize.s },
      description: { type: String },
      showButton: { type: Boolean, required: true },
    },
    emits: ['click'],
    setup(props) {
      const descriptionRef = ref<ElementReference>();
      const infoRef = ref<ElementReference>();
      const truncatedInfo = props.additionalInfo
        ? truncateString(props.additionalInfo, INFO_MAX_LENGTH)
        : '';
      const truncateClass = computed(
        () => props.description && props.description.length > CONTENT_MAX_LENGTH
      );
      const showDescTooltip = computed(
        () => props.description && props.description.length > CONTENT_MAX_LENGTH
      );
      const showInfoTooltip = computed(
        () => props.additionalInfo && props.additionalInfo.length > INFO_MAX_LENGTH
      );
      return {
        descriptionRef,
        CONTENT_MAX_LENGTH,
        showDescTooltip,
        showInfoTooltip,
        truncateClass,
        truncatedInfo,
        infoRef,
      };
    },
  });
</script>
