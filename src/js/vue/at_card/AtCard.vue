<template>
  <div
    class="AtCard"
    :class="{
      'height-100 ': !extended,
      'extended-clickable': extended && clickable,
    }"
  >
    <div v-if="!clickable" class="p-relative pad-block-start-06 pad-block-end-05">
      <AtCardHeader
        :image-url="imageUrl"
        :image-size="imageSize"
        :show-image="showImage"
        :title="title"
        :sub-title="subTitle"
        :show-border-bottom="showDividerLine"
      >
        <template #beforeEndHeader>
          <slot name="beforeEndHeader"></slot>
        </template>
        <template #startHeader>
          <slot name="startHeader"></slot>
        </template>
        <template #endHeaderTitle>
          <slot name="endHeaderTitle"></slot>
        </template>
        <template #endHeaderSubtitle>
          <slot name="endHeaderSubtitle"></slot>
        </template>
        <template #afterEndHeader>
          <slot name="afterEndHeader"></slot>
        </template>
      </AtCardHeader>
      <AtCardFooter
        :description="description"
        :button-content="buttonContent"
        :button-size="buttonSize"
        :additional-info="additionalInfo"
        :show-button="showButton"
        @click="$emit('button-click')"
      >
        <template #description>
          <slot name="description"></slot>
        </template>
        <template #startAdditional>
          <slot name="startAdditional"></slot>
        </template>
        <template #endAdditional>
          <slot name="endAdditional"></slot>
        </template>
      </AtCardFooter>
      <AtMenu
        v-if="menuItems?.length && !clickable"
        class="context-menu block-start-04 inline-end-02"
        :menu-item-list="menuItems"
        @menu-item-click="handleMenuItemClick"
      >
        <DotsVerticalIcon size="24" />
      </AtMenu>
    </div>
    <AtCardClickable
      v-else
      :text="clickableCardText"
      :tag="tag"
      :extended="extended"
      :height="height"
      :show-default-add-card="defaultAddCard"
      :disabled="cardClickableDisabled"
      @card-click="$emit('card-click')"
    >
      <template #text><slot name="text"></slot></template>
    </AtCardClickable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { DotsVerticalIcon } from 'vue-tabler-icons';

  import { ButtonSize } from '../at_button/types';
  import AtMenu from '../at_menu/AtMenu.vue';
  import { MenuItem, MenuItemList } from '../at_menu/types';
  import AtCardClickable from './components/AtCardClickable.vue';
  import AtCardFooter from './components/AtCardFooter.vue';
  import AtCardHeader from './components/AtCardHeader.vue';
  import './at-card.scss';
  export default defineComponent({
    name: 'AtCard',
    components: {
      AtCardClickable,
      AtCardFooter,
      AtCardHeader,
      AtMenu,
      DotsVerticalIcon,
    },

    props: {
      additionalInfo: { type: String },
      buttonContent: { type: String },
      buttonSize: { type: String as PropType<ButtonSize>, default: ButtonSize.s },
      clickable: { type: Boolean, default: false },
      clickableCardText: { type: String },
      defaultAddCard: { type: Boolean },
      description: { type: String, default: '' },
      cardClickableDisabled: { type: Boolean, default: false },
      extended: { type: Boolean },
      height: { type: String },
      id: { type: String },
      imageSize: { type: String },
      imageUrl: { type: String },
      menuItems: { type: Array as PropType<MenuItemList> },
      showDividerLine: { type: Boolean, default: true },
      showImage: { type: Boolean, default: false },
      showButton: { type: Boolean, default: false },
      subTitle: { type: String },
      tag: { type: String },
      title: { type: String },
    },
    emits: ['menu-item-click', 'card-click', 'button-click'],
    setup(props, { emit }) {
      function handleMenuItemClick(item: MenuItem) {
        emit('menu-item-click', { menuItem: item, cardId: props.id });
      }
      return {
        handleMenuItemClick,
      };
    },
  });
</script>
