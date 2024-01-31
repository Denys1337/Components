<template>
  <MainNav class="grid-navbar" />
  <div class="grid-page">
    <ItemsFilter />
    <RouterView />
    <Preview />
  </div>
  <Footer />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Footer from './coms/Footer.vue';
  import MainNav from './coms/MainNav.vue';
  import ItemsFilter from './coms/comps/items_filter/ItemsFilter.vue';
  import Preview from './coms/comps/previewer/Preview.vue';

  export default defineComponent({
    name: 'DemoApp',
    components: { MainNav, Footer, Preview, ItemsFilter },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  body {
    font-family: var(--font-family-base);
    padding: 0;
    margin: 0;

    --border-padding: 15px;
  }

  #wrapper {
    width: 100%;
    height: 100vw;

    display: grid;
    grid-template-rows: 55px auto;

    grid-template-areas:
      'header'
      'content';
  }

  #mainHeader {
    grid-area: header;

    background: var(--greyF2);
    align-items: center;
    justify-items: center;
    padding: var(--border-padding);

    .version-title {
      flex-grow: 1;
      margin: 0;
    }
    .storybook-btn {
      flex-grow: 0;
    }
  }

  .DemoApp {
    --page-shadow: -7px 6px 6px #00000030;
    --normal-space: var(--spacing-07);

    grid-area: content;

    display: grid;
    grid-template-areas: 'navbar page';

    grid-template-columns: minmax(200px, max-content) 1fr;
    grid-template-rows: 1fr;

    button {
      cursor: pointer;
    }

    ol,
    ul {
      padding: 0;
      margin: 0;
    }

    .grid {
      &-navbar {
        grid-area: navbar;
        background: var(--greyF2);
      }
      &-page {
        grid-area: page;
        box-shadow: var(--page-shadow);
        padding: var(--border-padding);
        padding-top: 0;
      }
    }

    .group-title {
      font-size: var(--font-size-x-large);
      font-weight: var(--font-bold);
      line-height: var(--line-height-x-large);
      margin-block-end: var(--spacing-03);
    }
    .empty-group:not(.highlight) {
      &.group-title,
      .group-title {
        color: var(--gray-600);
      }
    }
  }
</style>
