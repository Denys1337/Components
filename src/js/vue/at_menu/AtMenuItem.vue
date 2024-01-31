<template>
  <a
    class="AtMenuItem d-flex pad-02 font-body-default"
    :class="[type, { disabled }]"
    :disabled="disabled"
    @click="menuClick"
    v-bind="menuItemProps"
  >
    <span class="AtMenuItem-icon inline-end-02 as-center d-flex">
      <Component :is="icon" size="16" v-if="icon" />
    </span>
    <span>
      {{ label }}
    </span>
  </a>
</template>
<script lang="ts">
  import { defineComponent, Component, PropType } from 'vue';

  export default defineComponent({
    name: 'AtMenuItem',
    components: {},
    props: {
      label: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: Object as PropType<Component>,
        required: false,
      },
      type: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      menuItemProps: { type: Object as PropType<{ [key: string]: unknown }>, required: false },
    },
    emits: ['menu-item-click'],
    setup(props, { emit }) {
      function menuClick() {
        emit('menu-item-click', props);
      }

      return {
        menuClick,
      };
    },
  });
</script>
<style lang="scss">
  .AtMenuItem,
  .AtMenuItem:not([href]) {
    ::first-letter {
      text-transform: uppercase;
    }
    border-radius: var(--spacing-01);
    user-select: none;
    text-decoration: none;
    color: var(--gray-1000);

    &.disabled {
      pointer-events: none;
      color: var(--gray-500);
    }
    &:hover {
      text-decoration: none;
      background: var(--pri-500);
      color: var(--white);
      cursor: pointer;

      .AtMenuItem-icon {
        color: var(--white);
      }
    }

    &.critical {
      color: var(--red-500);
      .AtMenuItem-icon {
        color: inherit;
      }

      &:hover {
        color: var(--white);
        background: var(--red-500);
      }
    }

    .AtMenuItem-icon {
      color: var(--gray-700);
      width: 1rem;
    }
  }
</style>
