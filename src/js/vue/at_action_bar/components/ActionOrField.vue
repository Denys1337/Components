<template>
  <Component
    class="ActionOrField"
    v-on="$attrs"
    :is="component"
    v-bind="componentProps"
    :required="false"
  >
    <template #start v-if="actionStartIcon">
      <Component :is="actionStartIcon" :size="iconSize" />
    </template>
    <span>
      {{ label }}
    </span>
    <template #end v-if="actionEndIcon">
      <Component :is="actionEndIcon" :size="iconSize" />
    </template>
  </Component>
</template>

<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent } from 'vue';

  const AtButton = defineAsyncComponent(
    () => import(/* webpackChunkName: "AtButton" */ '../../at_button/AtButton.vue')
  );
  const DynamicField = defineAsyncComponent(
    () => import(/* webpackChunkName: "DynamicField" */ '../../dynamic_field/DynamicField.vue')
  );

  import { ActionType } from '../types';

  export default defineComponent({
    name: 'ActionOrField',
    components: { AtButton, DynamicField },
    props: {
      actionType: {
        type: String,
        default: 'button',
        validator: (value: ActionType) => Object.values(ActionType).includes(value),
      },
      label: { type: String, required: true },
      name: { type: String, required: true },
      active: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      actionStartIcon: { type: Object, required: false },
      menuItemProps: { type: Object, default: () => ({}) },
      actionEndIcon: { type: Object, required: false },
      size: { type: String, default: 'm' },
      visual: { type: String, default: 'secondary' },
      iconSize: { type: String, default: '16' },
    },
    setup(props) {
      const component = computed(() => (props.actionType === 'button' ? AtButton : DynamicField));
      const componentProps = computed(() => ({
        ...props,
        ...props.menuItemProps,
        modelValue: props.menuItemProps.value,
      }));
      return { component, componentProps };
    },
  });
</script>

<style lang="scss">
  .ActionOrField {
    ::first-letter {
      text-transform: uppercase;
    }
  }
</style>
