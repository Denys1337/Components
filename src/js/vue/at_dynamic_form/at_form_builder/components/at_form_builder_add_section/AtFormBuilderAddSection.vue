<template>
  <section class="AtFormBuilderAddSection">
    <header
      class="
        AddSection-header
        pad-block-04 pad-inline-start-06 pad-inline-end-02
        d-flex
        ai-center
        jc-space-between
      "
    >
      <h3 class="AddSection-header margin-00 font-body-default-b">{{ $t('general.section') }}</h3>
      <AtButton class="tertiary" @click="$emit('click')" size="s"
        >+ {{ $t('general.add') }}</AtButton
      >
    </header>

    <div class="sections">
      <AtFormBuilderSectionItem
        v-for="(section, index) in sections"
        :is-selected="selectedSectionId === section.id"
        @select="$emit('section-select', { section: $event, sectionIndex: index })"
        @title-changed="$emit('section-changed', $event)"
        :section="section"
        :key="section.id"
        @rename-section="$emit('rename-section', $event)"
        @delete-section="$emit('delete-section', $event)"
      />
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import AtButton from '../../../../at_button/AtButton.vue';
  import { AtFormBuilderSection } from '../../types';
  import AtFormBuilderSectionItem from '../at_form_builder_section_item/AtFormBuilderSectionItem.vue';

  export default defineComponent({
    name: 'AtFormBuilderAddSection',
    components: { AtFormBuilderSectionItem, AtButton },
    props: {
      sections: { type: Array as PropType<AtFormBuilderSection[]>, default: () => [] },
      selectedSectionId: { type: String },
    },
    emits: ['click', 'section-select', 'section-changed', 'delete-section', 'rename-section'],
  });
</script>
<style lang="scss">
  .AtFormBuilderAddSection {
    overflow: auto;
    background: var(--white);
    height: 100%;

    &-header {
      align-items: center;
    }
  }
</style>
