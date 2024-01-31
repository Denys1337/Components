<template>
  <div class="AtAlert d-flex" :class="`${type}`">
    <Component v-if="!icon" class="AtAlert-icon" :is="iconToDisplay" :style="iconProps" />
    <i v-else class="AtAlert-icon" :class="`${icon}`"></i>
    <div class="d-flex flex-column">
      <span class="AtAlert-title font-title-medium">{{ title }}</span>
      <span class="AtAlert-content font-body-default" v-if="content">{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { AlertTypes, AlertIconsMap } from './types';

  import './at-alert.scss';

  export default defineComponent({
    props: {
      type: {
        type: String,
        default: AlertTypes.Info,
        validator: (value: AlertTypes) => Object.values(AlertTypes).includes(value),
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: false,
      },
      icon: {
        type: String,
        required: false,
      },
    },
    setup(props) {
      const iconToDisplay = computed(() => {
        return AlertIconsMap[props.type].icon;
      });
      const iconProps = computed(() => {
        return AlertIconsMap[props.type].props;
      });
      return { props, iconToDisplay, iconProps };
    },
  });
</script>
