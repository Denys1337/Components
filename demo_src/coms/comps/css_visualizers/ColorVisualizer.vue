<template>
  <div class="ColorVisualizer p-relative" :class="{ 'dark-content': isDark }">
    <span class="colored p-absolute inset-0" :style="{ background: hex }"></span>
    <label class="ColorVisualizer-identifier p-absolute">
      <strong class="uppercase">{{ name }}</strong
      ><br />
      {{ item.key }}
    </label>
    <label class="ColorVisualizer-hex p-absolute"> {{ hex }}<br />{{ rgb }} </label>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref, watch } from 'vue';

  import { GroupItem } from 'scripts/comps/types';

  import { averageRGBMembers, hexToRgb, rgbToHex } from '../../../helpers/colors';

  export default defineComponent({
    name: 'ColorVisualizer',
    props: {
      item: { type: Object as PropType<GroupItem>, required: true },
    },
    setup(props) {
      const hex = ref('#fff');
      const rgb = ref('rgb(255,255,255)');

      watch(
        () => props.item.calculatedValue,
        (calculatedValue) => {
          const isRGB = calculatedValue.startsWith('rgb');
          hex.value = isRGB ? rgbToHex(calculatedValue)! : calculatedValue;
          rgb.value = isRGB ? calculatedValue : hexToRgb(calculatedValue);
        },
        {
          immediate: true,
        }
      );

      const isDark = computed(() => averageRGBMembers(rgb.value) < 120);
      const name = computed(() => {
        return props.item.key
          .replace(/\$|var\(--/i, '')
          .replace(')', '')
          .replaceAll(/-+/gi, ' ');
      });

      return {
        name,
        rgb,
        hex,
        isDark,
      };
    },
  });
</script>

<style lang="scss">
  .ColorVisualizer {
    display: block;
    min-width: 200px;
    max-width: 320px;
    width: 20%;
    height: 120px;
    margin: 0;
    border-radius: var(--input-border-radius);
    flex-grow: 1;

    background-image: linear-gradient(
      45deg,
      var(--orange-500) 6.52%,
      #ffffff 6.52%,
      #ffffff 50%,
      var(--orange-500) 50%,
      var(--orange-500) 56.52%,
      #ffffff 56.52%,
      #ffffff 100%
    );
    background-size: 32.53px 32.53px;

    --text-offset: var(--spacing-03);

    &.dark-content {
      color: var(--white);
    }

    &-identifier {
      top: var(--text-offset);
      inset-inline-start: var(--text-offset);
    }
    &-hex {
      bottom: var(--text-offset);
      inset-inline-end: var(--text-offset);
    }

    > .colored {
      border-radius: var(--input-border-radius);
    }
  }
</style>
