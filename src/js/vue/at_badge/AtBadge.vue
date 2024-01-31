<template>
  <span class="AtBadge" v-on="$attrs" :style="badgeStyles">
    <i class="icon" :class="`icon-${displayedIcon}`" v-if="displayedIcon"></i>
    <span class="label whitespace-nowrap" v-if="displayedLabel">{{ displayedLabel }}</span>
  </span>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import getTranslators from '../utils/getTranslators';
  import { BADGE_TYPE_MAP, BadgeTypes, BadgeTypeMap } from './types';
  export default defineComponent({
    name: 'AtBadge',
    components: {},
    props: {
      type: { type: String, default: BadgeTypes.Custom },
      noIcon: { type: Boolean, default: false },
      noLabel: { type: Boolean, default: false },
      icon: { type: String, required: false },
      label: { type: String, required: false },
      color: { type: String, required: false },
      backgroundColor: { type: String, required: false },
      translate: { type: Boolean, default: false },
      translatorPrefix: { type: String, default: 'at_badge' },
      badgeTypeMap: { type: Object as PropType<BadgeTypeMap>, default: () => BADGE_TYPE_MAP },
    },
    setup(props) {
      const { t } = getTranslators(props.translatorPrefix);
      const displayedIcon = computed(() => {
        if (props.noIcon) return '';
        else if (props.icon) return props.icon;
        else return props.badgeTypeMap[props.type]?.icon || '';
      });

      const displayedColor = computed(() => {
        if (props.color) return props.color;
        else return props.badgeTypeMap[props.type]?.color || '';
      });
      const displayedBackgroundColor = computed(() => {
        if (props.backgroundColor) return props.backgroundColor;
        else return props.badgeTypeMap[props.type]?.backgroundColor || '';
      });
      const badgeStyles = computed(() => ({
        ['--badge-color']: displayedColor.value,
        ['--badge-background-color']: displayedBackgroundColor.value,
      }));

      const displayedLabel = computed(() => {
        let label = '';
        if (!props.noLabel) {
          label = props.label || props.badgeTypeMap[props.type]?.label || '';
        }
        return props.translate ? t(label) : label;
      });

      return { displayedIcon, displayedLabel, badgeStyles };
    },
  });
</script>

<style lang="scss">
  @import '../../../style/scss/_base_functions.scss';

  .AtBadge {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: pxToRem(4);
    padding: pxToRem(4) pxToRem(8);
    color: var(--badge-color);
    background-color: var(--badge-background-color);
    border-radius: pxToRem(8);
    border: 1px solid var(--white);

    .label {
      text-transform: uppercase;
      font-size: pxToRem(12);
    }
    .icon {
      height: 1rem;
    }
  }
</style>
