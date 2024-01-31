<template>
  <div class="AtCardSkeleton AtCard pad-block-06">
    <section
      class="AtCard-header d-flex pad-block-end-06 pad-inline-06"
      :class="{ 'border-bottom': showDividerLine }"
    >
      <div v-if="showLogoSkeleton" class="logo skeleton"></div>
      <div class="d-flex flex-column inline-end-04">
        <div class="AtCardSkeleton-title skeleton block-end-02"></div>
        <span class="AtCardSkeleton-subtitle skeleton"></span>
      </div>
    </section>
    <footer
      class="AtCardSkeleton-footer d-flex flex-column pad-block-start-04 pad-inline-06 jc-center"
    >
      <div class="AtCardSkeleton-description skeleton block-end-02"></div>
      <div class="AtCardSkeleton-description skeleton block-end-02"></div>
      <div class="AtCardSkeleton-half-line skeleton block-end-02"></div>
    </footer>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import './../at-card.scss';
  export default defineComponent({
    name: 'AtCardSkeleton',
    props: {
      showLogoSkeleton: { type: Boolean, default: true },
      showDividerLine: { type: Boolean, default: true },
    },
    setup() {},
  });
</script>
