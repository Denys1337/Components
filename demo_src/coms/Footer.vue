<template>
  <footer class="Footer">v. {{ version }}</footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      return {
        version: (window as unknown as { npmVersion: string }).npmVersion,
      };
    },
  });
</script>
<style lang="scss">
  .Footer {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 5px;
    color: #000;
    pointer-events: none;
    text-shadow: 1px 1px 1px white, -1px -1px 1px white, -1px 1px 1px white, 1px -1px 1px white;
  }
</style>
