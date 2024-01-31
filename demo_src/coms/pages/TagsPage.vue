<template>
  <Page class="TagsPage" title="tags">
    <ul>
      <li v-for="tag in tags" :key="tag.tagElement">
        <button @click="component = tag.tagElement">{{ tag.title }} ({{ tag.tagElement }})</button>
      </li>
    </ul>
  </Page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import useClipboardStore from '../hooks/useClipboardStore';
  import Page from './comps/Page.vue';

  interface Tag {
    title: string;
    tagElement: string;
  }

  export default defineComponent({
    name: 'TagsPage',
    components: { Page },
    setup() {
      const { component } = useClipboardStore();

      const tags = ref<Tag[]>([
        { title: 'div', tagElement: 'div' },
        { title: 'span', tagElement: 'span' },
        { title: 'h1', tagElement: 'h1' },
        { title: 'h2', tagElement: 'h2' },
        { title: 'h3', tagElement: 'h3' },
        { title: 'h4', tagElement: 'h4' },
        { title: 'h5', tagElement: 'h5' },
        { title: 'h6', tagElement: 'h6' },
      ]);

      return {
        tags,
        component,
      };
    },
  });
</script>
