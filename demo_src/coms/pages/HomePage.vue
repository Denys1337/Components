<template>
  <Page class="HomePage" title="homepage"> welcome </Page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Page from './comps/Page.vue';

  export default defineComponent({
    name: 'HomePage',
    components: { Page },
    setup() {
      return {};
    },
  });
</script>
