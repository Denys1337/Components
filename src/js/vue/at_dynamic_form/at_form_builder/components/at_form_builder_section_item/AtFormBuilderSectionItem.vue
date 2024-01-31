<template>
  <div
    class="AtFormBuilderSectionItem pad-block-04 pad-inline-start-06 pad-inline-end-02"
    :class="{ isSelected }"
    @click="$emit('select', section)"
    @mouseover="displayMenuIcon = true"
    @mouseleave="hideMenuIcon"
  >
    <p class="AtFormBuilderSectionItem-description font-body-default margin-00">
      <AtEditInlineLabel v-model="titleModel" :max-preview-length="40" />
    </p>
    <p class="AtFormBuilderSectionItem--questions-counter font-subtext margin-00">
      {{ $t('form_builder.sections_overview.content_length', { count: sectionQuestionsCount }) }}
    </p>
    <AtMenu
      ref="menuRef"
      v-show="displayMenuIcon"
      :menu-item-list="menuSectionList"
      @menu-item-click="sectionMenuItemClickedHandler"
      class="section-menu"
    >
      <DotsVerticalIcon size="24" />
    </AtMenu>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, ref, watch, inject } from 'vue';

  import { DotsVerticalIcon, PencilIcon, TrashIcon } from 'vue-tabler-icons';

  import AtEditInlineLabel from '../../../../at_edit_inline_label/AtEditInlineLabel.vue';
  import AtMenu from '../../../../at_menu/AtMenu.vue';
  import { MenuItem, MenuItemList, MenuItemTypes } from '../../../../at_menu/types';
  import { Locales } from '../../../../at_translations/types';
  import { getTranslatedText } from '../../../../utils/getTranslatedText';
  import getTranslators from '../../../../utils/getTranslators';
  import { AtFormBuilderSection } from '../../types';
  export default defineComponent({
    name: 'AtFormBuilderSectionItem',
    components: { AtEditInlineLabel, AtMenu, DotsVerticalIcon },
    props: {
      isSelected: { type: Boolean, default: false },
      section: { type: Object as PropType<AtFormBuilderSection>, required: true },
    },
    emits: ['select', 'title-changed', 'rename-section', 'delete-section'],
    setup(props, { emit }) {
      const { t } = getTranslators('certifications');
      const locale = inject('language', 'en') as Locales;

      const displayMenuIcon = ref(false);
      const menuRef = ref<InstanceType<typeof AtMenu>>();
      const titleModel = computed({
        get: () => getTranslatedText(props.section.title, locale),
        set: (value) => {
          if (titleModel.value !== value) {
            emit('title-changed', { title: value, sectionId: props.section.id });
          }
        },
      });
      const menuSectionList: MenuItemList = [
        {
          label: t('rename_section'),
          name: 'rename',
          type: MenuItemTypes.Regular,
          icon: PencilIcon,
        },
        {
          label: t('delete_section'),
          name: 'delete section',
          type: MenuItemTypes.Critical,
          icon: TrashIcon,
        },
      ];
      watch(() => menuRef.value?.isActionMenuVisible, hideMenuIcon);

      function hideMenuIcon() {
        if (!menuRef.value?.isActionMenuVisible) {
          displayMenuIcon.value = false;
        }
      }
      function sectionMenuItemClickedHandler(value: MenuItem) {
        const newTitle = titleModel.value;
        if (value.name == 'rename')
          emit('rename-section', { ...props.section, title: { en: newTitle } });
        else emit('delete-section', { ...props.section, title: { en: newTitle } });
      }

      const sectionQuestionsCount = computed(
        () => props.section.fields.length + (props.section.sections?.length ?? 0)
      );

      return {
        titleModel,
        displayMenuIcon,
        menuSectionList,
        sectionMenuItemClickedHandler,
        menuRef,
        hideMenuIcon,
        sectionQuestionsCount,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormBuilderSectionItem {
    position: relative;
    cursor: pointer;
    &.isSelected {
      background: var(--pri-100);
    }

    &-description {
      color: var(--gray-900);
    }

    &--questions-counter {
      color: var(--gray-800);
    }
    .section-menu {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      right: 3%;
    }
    .icon-tabler {
      color: var(--gray-800);
    }
  }
</style>
