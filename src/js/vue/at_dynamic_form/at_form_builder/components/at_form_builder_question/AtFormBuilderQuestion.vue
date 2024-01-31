<template>
  <section class="AtFormBuilderQuestion w-100 pad-06 elevation-level-01">
    <div class="question-description block-end-04 d-flex jc-space-between">
      <p class="question-description__text font-body-default-b block-00 flex-grow-1">
        <AtEditinlineLabel v-model="titleModel" />
      </p>
      <div class="d-flex">
        <div class="question-status d-flex">
          <span class="question-status__text inline-end-02 inline-start-06 font-body-small">
            {{ $t('general.mandatory') }}
          </span>
          <AtToggle v-model="questionModel.settings.required" class="ai-flex-start" />
        </div>
        <AtMenu
          v-if="filteredMenuList?.length"
          :menu-item-list="filteredMenuList"
          @menu-item-click="$emit($event.name)"
          class="question-menu inline-start-02"
        >
          <template #default="{ isActionMenuVisible }">
            <DotsVerticalIcon
              size="24"
              class="menu-icon text-gray-800"
              :class="isActionMenuVisible ? 'open' : ''"
            />
          </template>
        </AtMenu>
      </div>
    </div>
    <div class="question-answers">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, Ref, toRefs } from 'vue';

  import { DotsVerticalIcon } from 'vue-tabler-icons';

  import AtEditinlineLabel from '../../../../at_edit_inline_label/AtEditInlineLabel.vue';
  import AtMenu from '../../../../at_menu/AtMenu.vue';
  import AtToggle from '../../../../at_toggle/AtToggle.vue';
  import useAtFormQuestionWrapperLogic, {
    emits,
    props,
  } from '../../hooks/useAtFormQuestionWrapperLogic';
  import { AtFormBuilderQuestion } from '../../types';

  export default defineComponent({
    name: 'AtFormBuilderQuestion',
    components: {
      AtToggle,
      AtEditinlineLabel,
      AtMenu,
      DotsVerticalIcon,
    },
    props,
    emits,
    setup(props, context) {
      const { question, questionMenuList } = toRefs(props);

      const { questionModel, titleModel, filteredMenuList } = useAtFormQuestionWrapperLogic(
        question as Ref<AtFormBuilderQuestion>,
        questionMenuList,
        context
      );

      return {
        questionModel,
        titleModel,
        filteredMenuList,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @import '../../../../../../style/scss/base_functions';
  .AtFormBuilderQuestion {
    border: 1px solid var(--gray-400);
    border-radius: var(--spacing-02);
    background: var(--white);
    position: relative;
    .menu-icon:hover {
      color: var(--gray-900);
    }
    .question-description {
      &__text {
        color: var(--gray-1000);
      }
    }
    .question-status {
      &__text {
        color: var(--gray-900);
      }
    }
    .question-menu {
      inset-block-start: var(--spacing-06);
      inset-inline-end: var(--spacing-06);
    }
  }
</style>
