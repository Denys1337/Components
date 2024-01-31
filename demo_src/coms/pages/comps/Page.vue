<template>
  <div class="Page">
    <h1 class="page-title block-end-03 capitalize">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Page',
    props: {
      title: String,
    },
    setup() {},
  });
</script>
