<template>
  <div class="Loader">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="cssSize"
      :height="cssSize"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
      class="mx-auto"
    >
      <path
        fill="#000"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  export const SIZE_MULTIPLIER = 5;

  export default defineComponent({
    name: 'Loader',
    props: {
      spinnerSize: {
        type: Number,
        default: 8, // Defaults to 40px
      },
    },
    setup(props) {
      const cssSize = computed(() => `${props.spinnerSize * SIZE_MULTIPLIER}`);
      return { cssSize };
    },
  });
</script>

<style lang="scss" scoped>
  // Set the color of the icon
  svg path,
  svg rect {
    fill: var(--lightish-blue);
  }
</style>
