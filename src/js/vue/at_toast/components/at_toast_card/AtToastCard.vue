<template>
  <li class="AtToastCard" :class="type">
    <Component class="icon" size="26" :is="ToastIcons[type].icon" v-bind="ToastIcons[type].props" />
    <h4 class="title">
      {{ title }}
    </h4>
    <XIcon size="16" class="close-toast" @click="onCloseHandler" v-if="!isCloseDisabled" />
    <pre class="message" v-if="message">{{ message }}</pre>
  </li>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance } from 'vue';

  import { XIcon } from 'vue-tabler-icons';

  import { ToastIcons } from '../../types';

  export default defineComponent({
    name: 'AtToastCard',
    components: { XIcon },
    props: {
      id: { type: String, required: true },
      title: { type: String, required: true },
      type: { type: String, required: true },
      message: { type: String, required: false },
      isCloseDisabled: { type: Boolean, required: false },
    },
    setup(props) {
      const vm = getCurrentInstance()?.proxy;
      const onCloseHandler = () => {
        vm?.$atToast.close(props.id);
      };
      return { ToastIcons, onCloseHandler };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../../../../../style/scss/_base_functions.scss';
  $toast-font-size: pxToRem(14);
  .AtToastCard {
    max-width: pxToRem(480);
    border-radius: pxToRem(8);
    padding: pxToRem(8);
    display: grid;
    align-items: center;
    text-align: start;
    column-gap: pxToRem(8);
    border: 1px solid black;
    grid-template-columns: max-content 1fr max-content;
    .title,
    .message {
      font-size: $toast-font-size;
      margin: 0;
      word-break: break-word;
    }
    .message {
      white-space: pre-wrap;
      padding-bottom: 2px;
    }
    &.info {
      background: var(--pri-100);
      border-color: var(--pri-500);
      color: var(--pri-500);
    }
    &.error {
      background: var(--red-100);
      border-color: var(--red-500);
      color: var(--red-500);
    }
    &.success {
      background: var(--green-100);
      border-color: var(--green-500);
      color: var(--green-500);
    }
    .message {
      grid-column: 2/3;
      color: var(--gray-800);
    }
    .close-toast {
      cursor: pointer;
    }
  }
</style>
