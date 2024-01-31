<template>
  <li class="d-flex">
    <TrashIcon @click="onRemove(index)" class="button--remove" />
    <select v-model="itemProperty">
      <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
    </select>
    <p>{{ item.value }}</p>
  </li>
</template>

<script lang="ts">
  import { defineComponent, computed, WritableComputedRef, PropType } from 'vue';

  import { TrashIcon } from 'vue-tabler-icons';

  import { getPossiblePropertyTypes } from '../../../../helpers/cssHelpers';
  import useClipboardStore, { CSSProperty } from '../../../hooks/useClipboardStore';

  export default defineComponent({
    name: 'CSSPropertyListItem',
    components: { TrashIcon },
    props: {
      item: { type: Object as PropType<CSSProperty>, required: true },
      index: { type: Number, required: true },
      onRemove: { type: Function, required: true },
    },
    setup(props) {
      const options = getPossiblePropertyTypes(props.item.calculatedValue);

      const { setCSSProperty } = useClipboardStore();

      const itemProperty: WritableComputedRef<string> = computed({
        get: () => {
          if (!options.some((option) => option === props.item.property) && options.length > 0)
            return options[0];
          return props.item.property;
        },
        set: (newProperty: string) => setCSSProperty(props.index, newProperty),
      });

      return {
        options,
        itemProperty,
      };
    },
  });
</script>
