<template>
  <div class="TractorLoader">
    <img :src="tractorSvg" :width="size" :height="size" :alt="$t('loading')" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TractorLoader',
    components: {},
    props: {
      size: { type: String, default: '250' },
    },
    setup() {
      const tractorSvg = require('./images/tractor.loader.svg');
      return { tractorSvg };
    },
  });
</script>

<style lang="scss" scoped>
  .TractorLoader {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-200);
    z-index: 2;
  }
</style>
