<template>
  <main class="AtFormBuilderPage">
    <section class="AtFormBuilderPage-wrapper d-flex flex-column">
      <FormBuilderTitle
        :is-loading="isLoading"
        :title="pageTitle"
        :display-save-button="showSaveButton"
        :disable-save-buttons="disableSaveButtons"
        :prefix-form-builder="translationPath"
        @save="saveForm"
        @publish="saveForm(true)"
        @open-edit="$emit('open-edit')"
        @back="$emit('back')"
      >
        <template #logo>
          <slot name="logo"></slot>
        </template>
      </FormBuilderTitle>
      <div class="d-flex h-100">
        <div class="AtFormBuilderAddSection-wrapper">
          <AtFormBuilderAddSection
            class="page-spacing-bottom"
            :sections="sections"
            :selected-section-id="currentSectionId"
            @section-select="onSelectedSection"
            @section-changed="updateSectionTitle"
            @rename-section="setSectionToUpdate"
            @delete-section="setSectionToDelete"
            @click="showSectionDialog = true"
          />
        </div>

        <div class="questions-wrapper d-flex jc-center page-spacing-bottom">
          <AtFormBuilder
            class="flex-1"
            :sections="sections"
            :selected-section="currentSection"
            :question-menu-list="menuQuestionListItems"
            :enable-advanced-edit="enableAdvancedEdit"
            :existing-elements-ids="existingElementsIds"
            v-bind="{ ...$attrs, ...$props }"
            @edit-question="handleInitEditQuestion"
            @delete-question="setQuestionToDelete"
            @rename-question="renameQuestionTitle"
            @rename-stack="renameStackTitle"
            @delete-stack="setStackToDelete"
            @add-question="handleAddQuestionEvent"
            @edit-question-options="handleInitEditQuestionOptions"
          >
            <template #empty-state>
              <div @click="showSectionDialog = true" tabindex="0" role="button">
                <slot name="empty-state"></slot>
              </div>
            </template>

            <template #add-question>
              <AtCard
                class="add-question-wrapper d-flex elevation-level-01"
                @card-click="handleAddQuestionOrStack"
                :card-clickable-disabled="!currentSection"
                extended
                :show-default-add-card="false"
                clickable
              >
                <template #text>
                  <div class="d-flex ai-center text-pri-500">
                    <AtButton :visual="ButtonVisual.tertiary">
                      <template #start>
                        <PlusIcon size="16" />
                      </template>
                      {{ addElementText }}
                      <template #end>
                        <AtMenu
                          :menu-item-list="questionTypes"
                          @menu-item-click="changeButtonText"
                          @click.stop
                          class="inline-start-02"
                        >
                          <template #default="{ isActionMenuVisible }">
                            <ChevronDownIcon
                              :class="{ 'rotate-180 transform-transition': isActionMenuVisible }"
                            />
                          </template>
                        </AtMenu>
                      </template>
                    </AtButton>
                  </div>
                </template>
              </AtCard>
            </template>
          </AtFormBuilder>
        </div>
      </div>
    </section>
    <CreateEditSectionPopup
      v-if="showEditSectionDialog"
      :show="showEditSectionDialog"
      :section-name-to-update="
        sectionToUpdate?.title ? getTranslatedText(sectionToUpdate.title, locale) : ''
      "
      @close="showEditSectionDialog = false"
      @save="updateSectionTitle"
      is-edit
      :prefix-form-builder="translationPath"
    />
    <CreateEditSectionPopup
      v-if="showSectionDialog"
      :show="showSectionDialog"
      @close="showSectionDialog = false"
      @ok="createSection"
      :prefix-form-builder="translationPath"
    />
    <DeleteSectionPopup
      v-if="showDeleteSectionDialog"
      :show="showDeleteSectionDialog"
      @cancel="showDeleteSectionDialog = false"
      @ok="deleteSection"
      :prefix-form-builder="translationPath"
    />
    <DeleteQuestionPopup
      v-if="showDeleteQuestionDialog"
      :show="showDeleteQuestionDialog"
      @ok="deleteQuestion"
      @close="showDeleteQuestionDialog = false"
      :prefix-form-builder="translationPath"
    />
    <DeleteStackPopup
      v-if="showDeleteStackDialog"
      :show="showDeleteStackDialog"
      @ok="deleteStack"
      @close="showDeleteStackDialog = false"
      :prefix-form-builder="translationPath"
    />

    <AtFormBuilderQuestionsPopup
      v-if="showEditQuestionsDialog || showQuestionsDialog"
      name="Questions"
      disable-click-away
      show-close-icon
      show-confirmation-buttons
      show-divider-line
      :enable-advanced-edit="enableAdvancedEdit"
      :existing-elements-ids="existingElementsIds"
      :question-to-edit="displayEditFormQuestion ? questionToEdit : undefined"
      :confirm-text="$t(`${translationPath}.${confirmTextQuestionPopup}`)"
      :cancel-text="$t(`${translationPath}.cancel`)"
      :title-text="$t(`${translationPath}.${titleTextQuestionPopup}`)"
      :show="displayEditFormQuestion ? showEditQuestionsDialog : showQuestionsDialog"
      :questions-types-configuration="questionsTypesConfiguration"
      @create="createQuestion"
      @edit="editQuestion"
      @close="onCloseFormBuilderQuestion"
    />

    <AtFormBuilderEditQuestionOptionsPopup
      v-if="showPopups.editOptions"
      :show="showPopups.editOptions"
      :question="questionToEdit!"
      @change="handleChangeQuestionOptions"
      @close="showPopups.editOptions = false"
    />
  </main>
</template>
<script lang="ts">
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    getCurrentInstance,
    onMounted,
    PropType,
    provide,
    reactive,
    Ref,
    ref,
  } from 'vue';

  import { nanoid } from 'nanoid';
  import { PlusIcon, ChevronDownIcon } from 'vue-tabler-icons';

  import AtButton from '../../at_button/AtButton.vue';
  import { ButtonVisual } from '../../at_button/types';
  import AtCard from '../../at_card/AtCard.vue';
  import AtMenu from '../../at_menu/AtMenu.vue';
  import { MenuItem, MenuItemList, MenuItemTypes } from '../../at_menu/types';
  import { AtToastType } from '../../at_toast/types';
  import createToast from '../../utils/createToast';
  import { getTranslatedText } from '../../utils/getTranslatedText';
  import getTranslators from '../../utils/getTranslators';
  import { extractElementIdsFromSections } from '../shared/utils';
  import AtFormBuilder from './components/AtFormBuilder.vue';
  import FormBuilderTitle from './components/FormBuilderTitle.vue';
  import AtFormBuilderAddSection from './components/at_form_builder_add_section/AtFormBuilderAddSection.vue';
  import { menuQuestionList } from './config';
  import { useAddElementButton } from './hooks/useAddElementButton';
  import CreateEditSectionPopup from './popups/CreateEditSectionPopup.vue';
  import DeleteQuestionPopup from './popups/DeleteQuestionPopup.vue';
  import DeleteSectionPopup from './popups/DeleteSectionPopup.vue';
  import DeleteStackPopup from './popups/DeleteStackPopup.vue';
  import AtFormBuilderQuestionsPopup from './popups/at_form_builder_questions_popup/AtFormBuilderQuestionsPopup.vue';
  import { AtFormBuilderQuestionType } from './popups/at_form_builder_questions_popup/types';
  import {
    AtFormBuilderQuestion,
    AtFormBuilderSection,
    AtFormBuilderSectionType,
    AtFormBuilderSubSection,
    EditQuestionArgs,
    FormDefinition,
    PossibleQuestionTypes,
    RenameQuestionArgs,
    FormData,
  } from './types';

  const AtFormBuilderEditQuestionOptionsPopup = defineAsyncComponent(
    () =>
      import(
        /* webpackChunkName: 'AtFormBuilderEditQuestionOptionsPopup' */ './popups/AtFormBuilderEditQuestionOptionsPopup.vue'
      )
  );

  export default defineComponent({
    name: 'AtFormBuilderPage',
    components: {
      AtCard,
      FormBuilderTitle,
      CreateEditSectionPopup,
      AtFormBuilderQuestionsPopup,
      AtFormBuilderAddSection,
      AtFormBuilder,
      DeleteSectionPopup,
      DeleteQuestionPopup,
      PlusIcon,
      ChevronDownIcon,
      AtMenu,
      DeleteStackPopup,
      AtFormBuilderEditQuestionOptionsPopup,
      AtButton,
    },
    props: {
      pageTitle: { type: String, required: true },
      modelValue: { type: Object as PropType<FormDefinition>, required: true },
      enableAdvancedEdit: { type: Boolean, default: false },
      questionsTypesConfiguration: {
        type: Object as PropType<AtFormBuilderQuestionType[]>,
        required: true,
      },
      translationPath: {
        type: String,
        default: 'form_builder',
      },
      showSaveButton: {
        type: Boolean,
        required: true,
      },
      isLoading: {
        type: Boolean,
        required: true,
      },
      locale: {
        type: String,
        default: 'en',
      },
      isStackAddingEnabled: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['save-form', 'back', 'open-edit', 'update:modelValue'],
    setup(props, { emit }) {
      const vm = getCurrentInstance()?.proxy;
      const { t } = getTranslators();
      provide('enableAdvancedEdit', props.enableAdvancedEdit);

      const model = computed({
        get: () => props.modelValue,
        set: (newValue) => {
          emit('update:modelValue', newValue);
        },
      });

      const currentSection = ref<AtFormBuilderSection>();
      const currentSectionIndex = ref<number | undefined>(undefined);
      const currentSectionId = computed(() => currentSection.value?.id);
      const questionToEdit = ref<AtFormBuilderQuestion>();
      const questionToEditIndex = ref<number | undefined>();
      const questionToDeleteIndex = ref<number | undefined>();
      const sectionToUpdate = ref<AtFormBuilderSection>();
      const sectionToDelete = ref<AtFormBuilderSection>();
      const sections = computed(() => props.modelValue.formDefinition?.sections || []);
      const existingElementsIds = computed(
        () =>
          extractElementIdsFromSections<
            AtFormBuilderSection,
            AtFormBuilderSubSection,
            AtFormBuilderQuestion
          >(sections.value).idsMap
      );

      const showPopups = reactive({
        editOptions: false,
      });
      const disableSaveButtons = computed(() => !sections.value.length);
      const showSectionDialog = ref(false);
      const showQuestionsDialog = ref(false);
      const showEditSectionDialog = ref(false);
      const showDeleteSectionDialog = ref(false);
      const showEditQuestionsDialog = ref(false);
      const showDeleteQuestionDialog = ref(false);
      const showDeleteStackDialog = ref(false);
      const displayEditFormQuestion = ref(false);
      const stackIdToDelete = ref<string>();
      const confirmTextQuestionPopup = computed(() =>
        displayEditFormQuestion.value ? 'edit_question' : 'add_question'
      );
      const titleTextQuestionPopup = computed(() =>
        displayEditFormQuestion.value ? 'edit_question_title' : 'add_question_title'
      );
      const onSelectedSection = ({
        section,
        sectionIndex,
      }: {
        section: AtFormBuilderSection;
        sectionIndex: number;
      }) => {
        currentSection.value = section;
        currentSectionIndex.value = sectionIndex;
      };

      const menuQuestionListItems = menuQuestionList(t, props.translationPath);

      onMounted(() => {
        if (sections.value[0]) {
          currentSection.value = sections.value[0];
          currentSectionIndex.value = 0;
        }
      });

      const getCurrentTopLevelSection = () =>
        sections.value.find(
          (section: AtFormBuilderSection) => section.id === currentSectionId.value
        ) as AtFormBuilderSection;

      const getCurrentTopLevelSectionIndex = () =>
        sections.value.findIndex(
          (section: AtFormBuilderSection) => section.id === currentSectionId.value
        );

      const getSubSectionIndexById = (sectionId: string) =>
        getCurrentTopLevelSection()?.sections?.findIndex(
          (section: AtFormBuilderSubSection) => section.id === sectionId
        );

      const createQuestion = (newQuestion: AtFormBuilderQuestion) => {
        // Adding the question in the end of the array
        updateQuestionsModel(Infinity, newQuestion, 0);

        showQuestionsDialog.value = false;
        currentSubsectionIndex.value = undefined;
      };
      function setQuestionToDelete({ questionIndex, subsectionIndex }: EditQuestionArgs) {
        currentSubsectionIndex.value = subsectionIndex;
        showDeleteQuestionDialog.value = true;
        questionToDeleteIndex.value = questionIndex;
      }

      const updateQuestionsModel = (
        questionIndex: number,
        newQuestion?: AtFormBuilderQuestion,
        elementsToRemove: number = 1
      ) => {
        if (currentSectionIndex.value === undefined) {
          console.warn('There is no currentSectionIndex');
          return;
        }
        const newSections = [...sections.value];
        let referenceToSplice;
        if (currentSubsectionIndex.value !== undefined) {
          referenceToSplice =
            newSections[currentSectionIndex.value].sections![currentSubsectionIndex.value].fields;
        } else {
          referenceToSplice = newSections[currentSectionIndex.value].fields;
        }
        if (newQuestion) {
          referenceToSplice.splice(questionIndex, elementsToRemove, {
            ...newQuestion,
          });
        } else {
          referenceToSplice.splice(questionIndex, elementsToRemove);
        }
        updateSectionsModel(newSections);
      };

      function setQuestionToEdit({ question, questionIndex, subsectionIndex }: EditQuestionArgs) {
        questionToEdit.value = question;
        questionToEditIndex.value = questionIndex;
        currentSubsectionIndex.value = subsectionIndex;
      }

      const handleInitEditQuestion = (editQuestionArg: EditQuestionArgs) => {
        setQuestionToEdit(editQuestionArg);
        displayEditFormQuestion.value = true;
        showEditQuestionsDialog.value = true;
      };

      const handleInitEditQuestionOptions = (editQuestionArg: EditQuestionArgs) => {
        setQuestionToEdit(editQuestionArg);
        showPopups.editOptions = true;
      };

      const handleChangeQuestionOptions = (editedQuestion: AtFormBuilderQuestion) => {
        updateQuestionsModel(questionToEditIndex.value!, editedQuestion);
        showPopups.editOptions = false;
        currentSubsectionIndex.value = undefined;
      };

      function editQuestion(editedQuestion: AtFormBuilderQuestion) {
        updateQuestionsModel(questionToEditIndex.value!, editedQuestion);
        displayEditFormQuestion.value = false;
        showEditQuestionsDialog.value = false;
        currentSubsectionIndex.value = undefined;
      }

      function renameQuestionTitle({
        title,
        questionIndex,
        subsectionIndex,
        question,
      }: RenameQuestionArgs) {
        currentSubsectionIndex.value = subsectionIndex;

        const newQuestion: AtFormBuilderQuestion = {
          ...question,
          title: { ...question.title, [props.locale]: title },
        };

        updateQuestionsModel(questionIndex, newQuestion);

        currentSubsectionIndex.value = undefined;
      }

      function deleteQuestion() {
        updateQuestionsModel(questionToDeleteIndex.value!, undefined, 1);
        showDeleteQuestionDialog.value = false;
      }

      const updateSectionsModel = (newSections: AtFormBuilderSection[]) => {
        if (newSections.length && currentSectionIndex.value === undefined) {
          currentSectionIndex.value = 0;
        }
        let formDefinition: FormData = { fieldsMetaData: [], sections: [] };
        if (model.value.formDefinition) {
          formDefinition = { ...model.value.formDefinition };
        }

        model.value = {
          ...model.value,
          formDefinition: {
            ...formDefinition,
            sections: [...newSections],
          },
        };
      };
      const createSection = (title: Ref<string>) => {
        if (sections.value.some((section) => section.title[props.locale] == title.value)) {
          createToast(vm, {
            title: t(`${props.translationPath}.errors.duplicate_section_name`),
            type: AtToastType.Error,
          });
        } else {
          showSectionDialog.value = false;
          currentSection.value = {
            id: nanoid(),
            title: {
              [props.locale]: title.value,
            },
            fields: [],
            sectionType: AtFormBuilderSectionType.Normal,
          };
          if (currentSectionIndex.value === undefined) currentSectionIndex.value = 0;
          else currentSectionIndex.value = sections.value.length;

          updateSectionsModel([...sections.value, currentSection.value]);
        }
      };
      const isSectionNameValid = (section: { title: string; sectionId?: string }) =>
        !sections.value.some(
          (sec) =>
            sec.title[props.locale].toLowerCase().trim() == section.title.toLowerCase().trim() &&
            sec.id !== section.sectionId
        );
      function setSectionToUpdate(value: AtFormBuilderSection) {
        sectionToUpdate.value = value;
        showEditSectionDialog.value = true;
      }
      function setSectionToDelete(value: AtFormBuilderSection) {
        sectionToDelete.value = value;
        showDeleteSectionDialog.value = true;
      }
      function deleteSection() {
        if (!sectionToDelete.value) {
          console.warn('There is no sectionToDelete');
          return;
        }
        const index = sections.value.findIndex(
          (section) => section.id == sectionToDelete.value?.id
        );

        if (index > -1) {
          const newSections = [...sections.value];
          newSections.splice(index, 1);
          updateSectionsModel(newSections);

          currentSectionIndex.value = index > 0 ? index - 1 : 0;
          currentSection.value =
            newSections.length > 0 ? newSections[currentSectionIndex.value] : undefined;
        } else {
          console.warn(`Section to deletion was not found, index: ${index}`);
          return;
        }
        showDeleteSectionDialog.value = false;
      }
      function updateSectionTitle(section: { title: string; sectionId?: string }) {
        if (!section.sectionId && sectionToUpdate.value)
          section.sectionId = sectionToUpdate.value?.id;
        if (isSectionNameValid(section)) {
          const index = sections.value.findIndex((sec) => sec.id === section.sectionId);

          const newSections = [...sections.value];
          newSections[index].title[props.locale] = section.title;
          updateSectionsModel(newSections);

          showEditSectionDialog.value = false;
        } else {
          createToast(vm, {
            title: t(`${props.translationPath}.errors.duplicate_section_name`),
            type: AtToastType.Error,
          });
        }
      }

      const onCloseFormBuilderQuestion = () => {
        displayEditFormQuestion.value
          ? (showEditQuestionsDialog.value = false)
          : (showQuestionsDialog.value = false);
        displayEditFormQuestion.value = false;
      };
      const noElementsInSection = () => {
        return sections.value.some((section) => {
          if (!section.fields.length && !section.sections?.length) return true;
          if (section.fields.length && !section.sections?.length) return false;
          if (section.sections?.length) {
            return section.sections.some((subSection) => !subSection.fields?.length);
          }
          return false;
        });
      };
      const saveForm = (publish = false) => {
        // checking if all sections have at least one question, only for publishing
        if (publish && noElementsInSection()) {
          vm?.$atToast.create({
            type: AtToastType.Error,
            title: t(`${props.translationPath}.errors.section_without_question.title`),
            message: t(`${props.translationPath}.errors.section_without_question.description`),
          });
          return;
        }

        emit('save-form', publish);
      };

      const questionTypes: MenuItemList = [
        {
          name: PossibleQuestionTypes.Question,
          label: t(`${props.translationPath}.question_types.${PossibleQuestionTypes.Question}`),
          type: MenuItemTypes.Regular,
        },
      ];

      // TODO - remove prop and statement after PLAT-3040
      if (props.isStackAddingEnabled) {
        questionTypes.push({
          name: PossibleQuestionTypes.Stack,
          label: t(`${props.translationPath}.question_types.${PossibleQuestionTypes.Stack}`),
          type: MenuItemTypes.Regular,
        });
      }

      const handleAddQuestionOrStack = (menuItem: MenuItem) => {
        if (elementToAdd.value === PossibleQuestionTypes.Question) {
          showQuestionsDialog.value = true;
          currentSubsectionIndex.value = undefined;
        } else {
          addStack();
        }
      };
      const changeButtonText = (menuItem: MenuItem) => {
        const elementType = menuItem
          ? (menuItem.name as PossibleQuestionTypes)
          : elementToAdd.value;
        setElementToAdd(elementType);
      };

      const addStack = () => {
        const currentSectionIndex = getCurrentTopLevelSectionIndex();

        const newSections = [...sections.value];
        newSections[currentSectionIndex].sections = newSections[currentSectionIndex].sections || [];
        newSections[currentSectionIndex].sections!.push({
          id: nanoid(),
          title: {
            [props.locale]: 'Stack Name',
          },
          sectionType: AtFormBuilderSectionType.SUBSECTION,
          fields: [],
          settings: {
            repeatable: false,
            grouped: false,
            minStack: 0,
            maxStack: null,
          },
          externalGroupId: '',
        });
        updateSectionsModel(newSections);
      };

      const renameStackTitle = ({ id, text }: { id: string; text: string }) => {
        const currentSectionIndex = getCurrentTopLevelSectionIndex();
        const currentStackIndex = getSubSectionIndexById(id) as number;

        const newSections = [...sections.value];
        newSections[currentSectionIndex].sections![currentStackIndex].title[props.locale] = text;
        updateSectionsModel(newSections);
      };

      const currentSubsectionIndex = ref<number | undefined>();

      const handleAddQuestionEvent = ({
        subsectionIndex,
      }: {
        subsectionIndex: undefined | number;
      }) => {
        currentSubsectionIndex.value = subsectionIndex;
        showQuestionsDialog.value = true;
      };

      const setStackToDelete = (id: string) => {
        stackIdToDelete.value = id;
        showDeleteStackDialog.value = true;
      };

      const deleteStack = () => {
        if (currentSection.value?.sections) {
          const index = currentSection.value?.sections.findIndex(
            (section) => section.id == stackIdToDelete.value
          );
          const currentSectionIndex = getCurrentTopLevelSectionIndex();
          const newSections = [...sections.value];
          newSections[currentSectionIndex].sections!.splice(index, 1);
          updateSectionsModel(newSections);

          showDeleteStackDialog.value = false;
        }
      };

      const {
        elementToAdd,
        setElementToAdd,
        buttonText: addElementText,
      } = useAddElementButton(props.translationPath);

      return {
        sections,
        existingElementsIds,
        showSectionDialog,
        createSection,
        showQuestionsDialog,
        createQuestion,
        deleteQuestion,
        editQuestion,
        onSelectedSection,
        currentSection,
        currentSectionId,
        saveForm,
        showEditSectionDialog,
        showDeleteSectionDialog,
        setSectionToUpdate,
        setSectionToDelete,
        deleteSection,
        updateSectionTitle,
        sectionToUpdate,
        menuQuestionListItems,
        setQuestionToEdit,
        showEditQuestionsDialog,
        displayEditFormQuestion,
        questionToEdit,
        showDeleteQuestionDialog,
        setQuestionToDelete,
        renameQuestionTitle,
        titleTextQuestionPopup,
        confirmTextQuestionPopup,
        onCloseFormBuilderQuestion,
        questionTypes,
        handleAddQuestionOrStack,
        handleAddQuestionEvent,
        currentSubsectionIndex,
        currentSectionIndex,
        renameStackTitle,
        showDeleteStackDialog,
        setStackToDelete,
        deleteStack,
        getTranslatedText,
        handleInitEditQuestionOptions,
        handleChangeQuestionOptions,
        handleInitEditQuestion,
        showPopups,
        disableSaveButtons,
        addElementText,
        ButtonVisual,
        changeButtonText,
      };
    },
  });
</script>
<style lang="scss">
  @import '../../../../style/scss/vars';
  .selector-label {
    margin: 0;
  }
  .AtFormBuilderPage {
    --form-builder-title-height: 106px;

    .add-question-wrapper {
      .AtCardClickable {
        &:hover {
          background-color: var(--pri-100);
        }
        .AtButton:hover {
          background-color: transparent;
        }
        .AtButton {
          background-color: transparent;
        }
      }
    }

    .AtFormBuilderAddSection {
      // align this width with dynamicformwith stepper sidebar in PLAT-3067
      width: 368px;
      min-height: calc(100vh - var(--header-height) - var(--form-builder-title-height));

      &-wrapper {
        border-inline-end: 1px solid var(--gray-400);
      }
    }

    .questions-wrapper {
      max-width: $max-form-width;
      margin-inline: auto;
      flex: 1;
    }

    &-wrapper {
      min-height: calc(100vh - var(--header-height));
    }

    .logo-image {
      height: 200px;
    }

    .page-spacing-bottom {
      padding-block-end: 128px;
    }
  }
</style>
