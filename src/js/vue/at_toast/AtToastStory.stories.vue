<template>
  <div class="AtToastStory">
    <AtButton @click="onClick">Create a toast</AtButton>
    <AtButton @click="$atToast.clear()" class="warning">Clear</AtButton>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, PropType } from 'vue';

  import AtButton from '../at_button/AtButton.vue';
  import createToast from '../utils/createToast';
  import { AtToast } from './AtToastPlugin';
  import {
    DEFAULT_POSITION,
    DEFAULT_TOAST_TYPE,
    DEFAULT_STAY_DURATION,
    ToastPosition,
    AtToastType,
  } from './types';

  export default defineComponent({
    name: 'AtToastStory',
    components: { AtButton },
    use: { AtToast },
    props: {
      position: { type: String as PropType<ToastPosition>, default: DEFAULT_POSITION },
      title: { type: String, required: true },
      type: { type: String as PropType<AtToastType>, default: DEFAULT_TOAST_TYPE },
      message: { type: String, required: false },
      duration: { type: Number, default: DEFAULT_STAY_DURATION },
      isCloseDisabled: { type: Boolean },
    },
    setup(props) {
      const vm = getCurrentInstance()?.proxy;
      const onClick = () => {
        createToast(vm, props);
      };
      return { onClick };
    },
  });
</script>

<style lang="scss" scoped></style>
