<template>
  <div v-if="hasItems" class="ClassList preview-part-container elevation-level-03">
    <ul class="List d-flex flex-column">
      <li class="d-flex" v-for="cls in cssClasses" :key="cls">
        <TrashIcon @click="removeCssClass(cls)" class="button--remove" />
        <p>{{ cls }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { computed, defineComponent } from 'vue';

  import { TrashIcon } from 'vue-tabler-icons';

  import useClipboardStore from '../../../hooks/useClipboardStore';

  import './list.scss';

  export default defineComponent({
    name: 'ClassList',
    components: { TrashIcon },
    setup() {
      const { cssClasses, removeCssClass } = useClipboardStore();

      const hasItems = computed(() => {
        return cssClasses.value.length > 0;
      });

      return {
        cssClasses,
        removeCssClass,
        hasItems,
      };
    },
  });
</script>
