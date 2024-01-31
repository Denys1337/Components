<template>
  <div class="CardsLayout cards-wrapper at-grid">
    <AtCard
      class="at-col-lg-4 at-col-md-6 at-col-12"
      v-if="showClickableCard"
      @card-click="$emit('card-click')"
      default-add-card
      clickable
      :clickable-card-text="clickableCardText"
    />
    <div v-for="card in cardsList" :key="card.id" class="at-col-lg-4 at-col-md-6 at-col-12">
      <slot :name="card.id"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'CardsLayout',
  };
</script>
<script setup lang="ts">
  import { PropType } from 'vue';

  import { QuestionnaireType } from '../../at_dynamic_form/at_form_builder/types';
  import AtCard from '../AtCard.vue';

  defineProps({
    clickableCardText: { type: String, default: '' },
    cardsList: { type: Array as PropType<QuestionnaireType[]> },
    showClickableCard: { type: Boolean, default: true },
  });
  defineEmits(['card-click']);
</script>
<style lang="scss">
  .cards-wrapper {
    grid-auto-rows: 1fr;
    margin: 2.25em 0;
    grid-gap: var(--spacing-04);

    @media (min-width: 992px) and (max-width: 1090px) {
      .AtCard-title {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 10ch;
      }
    }
  }
</style>
