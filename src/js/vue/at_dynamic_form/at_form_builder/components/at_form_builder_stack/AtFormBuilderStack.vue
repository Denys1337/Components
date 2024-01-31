<template>
  <section v-bind="$attrs" class="AtFormBuilderStack w-100 pad-block-06 elevation-level-01">
    <div class="stack-description block-end-04 pad-inline-06 d-flex jc-space-between">
      <p class="stack-description__text font-title-large flex-grow-1 block-00">
        <AtEditInlineLabel v-model="titleModel" />
      </p>

      <div class="stack-actions-bar d-flex">
        <div class="stack-status d-flex" ref="repeatableToggle">
          <div
            class="font-body-small text-gray-800 inline-end-02"
            v-if="stackModel.settings.minStack > 0"
          >
            ({{ $t('general.mandatory') }})
          </div>
          <RepeatIcon
            :class="repeatableIconStyle"
            class="repeatable-toggle inline-end-02 inline-start-06"
          />
          <Tooltip :reference="repeatableToggle" position="bottom">{{
            $t(translationPath + '.repeatable_description')
          }}</Tooltip>
        </div>
        <AtMenu :menu-item-list="menuList" @menu-item-click="handleMenuClick">
          <DotsVerticalIcon size="24" class="menu-icon text-gray-800" />
        </AtMenu>
      </div>
    </div>
    <div class="stack-fields">
      <AtFormBuilderStackQuestionWrapper
        v-for="(question, index) in fields"
        :key="question.id"
        :question="question"
        :question-menu-list="questionMenuList"
        v-model="stackModel.fields[index]"
        @edit-question="$emit('edit-question', { question, questionIndex: index })"
        @edit-question-options="$emit('edit-question-options', { question, questionIndex: index })"
        @delete-question="$emit('delete-question', { questionIndex: index })"
        @rename-question="
          $emit('rename-question', { title: $event, questionIndex: index, question })
        "
      >
        <AtQuestionTypeResolver
          :question="question"
          v-bind="$attrs"
          :question-type-component-map="questionTypeComponentMap"
          :question-menu-list="questionMenuList"
          v-model="stackModel.fields[index]"
        />
      </AtFormBuilderStackQuestionWrapper>

      <AtButton
        class="tertiary inline-start-06"
        :size="ButtonSize.m"
        @click="$emit('add-question')"
      >
        <template #start>
          <PlusIcon size="20" />
        </template>
        {{ $t(translationPath + '.stack_add_stack_title') }}</AtButton
      >
    </div>
  </section>
  <AtFormBuilderEditStackPopup
    v-if="showEditPopup"
    v-bind="$props"
    :show="showEditPopup"
    :title="titleModel"
    :enable-advanced-edit="enableAdvancedEdit"
    :min-stack="stackModel.settings.minStack"
    :repeatable="stackModel.settings.repeatable"
    :external-group-id="stackModel.externalGroupId"
    @ok="handleSaveEditPopup"
    @close="showEditPopup = false"
  />
</template>
<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent, inject, PropType, ref } from 'vue';

  import { merge } from 'lodash-es';
  import { PlusIcon, DotsVerticalIcon, RepeatIcon, PencilIcon, TrashIcon } from 'vue-tabler-icons';

  import AtButton from '../../../../at_button/AtButton.vue';
  import { ButtonSize } from '../../../../at_button/types';
  import { defaultAtFormQuestionTypeComponentMap } from '../../../../at_dynamic_form/at_form/types';
  import AtEditInlineLabel from '../../../../at_edit_inline_label/AtEditInlineLabel.vue';
  import AtMenu from '../../../../at_menu/AtMenu.vue';
  import * as AtMenuTypes from '../../../../at_menu/types';
  import { Locales } from '../../../../at_translations/types';
  import Tooltip from '../../../../tooltip/Tooltip.vue';
  import { getTranslatedText } from '../../../../utils/getTranslatedText';
  import getTranslators from '../../../../utils/getTranslators';
  import AtQuestionTypeResolver from '../../../shared/AtQuestionTypeResolver.vue';
  import { AtQuestionTypeComponentMap } from '../../../types';
  import { AtFormBuilderQuestion, AtFormBuilderSubSection } from '../../types';
  import { QuestionMenuListItem } from '../at_form_builder_question/types';
  import AtFormBuilderStackQuestionWrapper from '../at_form_builder_stack_question_wrapper/AtFormBuilderStackQuestionWrapper.vue';

  const AtFormBuilderEditStackPopup = defineAsyncComponent(
    () =>
      import(
        /* webpackChunkName: 'AtFormBuilderEditStackPopup' */ '../../popups/at_form_builder_edit_stack_popup/AtFormBuilderEditStackPopup.vue'
      )
  );

  export default defineComponent({
    name: 'AtFormBuilderStack',
    components: {
      AtEditInlineLabel,
      AtQuestionTypeResolver,
      AtButton,
      PlusIcon,
      AtMenu,
      DotsVerticalIcon,
      RepeatIcon,
      Tooltip,
      AtFormBuilderEditStackPopup,
      AtFormBuilderStackQuestionWrapper,
    },
    props: {
      title: { type: Object as PropType<Record<string, string>>, required: true },
      fields: {
        type: Array as PropType<AtFormBuilderQuestion[]>,
        default: () => [],
      },
      questionTypeComponentMap: {
        type: Object as PropType<AtQuestionTypeComponentMap>,
        default: () => defaultAtFormQuestionTypeComponentMap,
      },
      questionMenuList: {
        type: Array as PropType<QuestionMenuListItem[]>,
      },
      id: {
        type: String,
        required: true,
      },
      translationPath: {
        type: String,
        default: 'form_builder',
      },
      modelValue: {
        type: Object as PropType<AtFormBuilderSubSection>,
        required: true,
      },
      enableAdvancedEdit: {
        type: Boolean,
        default: false,
      },
    },
    emits: [
      'rename-stack',
      'edit-question',
      'delete-question',
      'rename-question',
      'add-question',
      'update:modelValue',
      'delete-stack',
      'edit-question-options',
      'update:id',
    ],
    setup(props, { emit }) {
      const repeatableToggle = ref();
      const locale = inject('language', 'en') as Locales;

      const titleModel = computed({
        get: () => getTranslatedText(props.title, locale),
        set: (value) => {
          if (titleModel.value != value) {
            emit('rename-stack', {
              id: props.id,
              text: value,
            });
          }
        },
      });

      const { t } = getTranslators('form_builder');

      const showEditPopup = ref(false);

      const menuList: AtMenuTypes.MenuItemList = [
        {
          label: t('stack_settings'),
          name: 'stack_settings',
          type: AtMenuTypes.MenuItemTypes.Regular,
          icon: PencilIcon,
        },
        {
          label: t('delete_stack'),
          name: 'delete_stack',
          type: AtMenuTypes.MenuItemTypes.Critical,
          icon: TrashIcon,
        },
      ];

      const stackModel = computed({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      const repeatableIconStyle = computed(() =>
        stackModel.value.settings.repeatable ? 'text-pri-500' : 'text-gray-800'
      );

      const handleMenuClick = (menuItem: AtMenuTypes.MenuItem) => {
        switch (menuItem.name) {
          case 'repeatable':
            stackModel.value.settings.repeatable = true;
            break;
          case 'delete_stack':
            emit('delete-stack', props.id);
            break;
          case 'stack_settings':
            showEditPopup.value = true;
            break;
        }
      };

      interface HandleSaveEditPopupArgs {
        title: string;
        id: string;
        externalGroupId: string;
        repeatable: boolean;
        minStack: number;
        maxStack: number | null;
      }

      const handleSaveEditPopup = ({
        title,
        id,
        externalGroupId,
        minStack,
        maxStack = null,
        repeatable,
      }: HandleSaveEditPopupArgs) => {
        stackModel.value = merge(stackModel.value, {
          id,
          title: {
            ...stackModel.value.title,
            [locale]: title,
          },
          externalGroupId,
          settings: {
            repeatable,
            minStack,
            maxStack,
          },
        });

        showEditPopup.value = false;
      };

      return {
        titleModel,
        stackModel,
        repeatableIconStyle,
        handleMenuClick,
        repeatableToggle,
        menuList,
        showEditPopup,
        handleSaveEditPopup,
        ButtonSize,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @import '../../../../../../style/scss/base_functions';

  .AtFormBuilderStack {
    border: 1px solid var(--gray-400);
    border-radius: var(--spacing-02);
    background: var(--white);
    position: relative;

    .stack-description {
      &__text {
        color: var(--gray-1000);
      }
    }

    .repeatable-toggle {
      &:hover {
        color: var(--gray-900);
        cursor: pointer;
      }
    }
    .menu-icon:hover {
      color: var(--gray-900);
    }

    .stack-fields .AtFormBuilderStackQuestionWrapper:first-child {
      border-top: none;
    }
  }
</style>
