<template>
  <div class="UserInitialsBadge user-pic uppercase">{{ initialLetters }}</div>
</template>
<script lang="ts">
  export default { name: 'UserInitialsBadge' };
</script>
<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    lastName: { type: String, required: false },
    firstName: { type: String, required: false },
    name: { type: String, default: '' },
  });

  const initialLetters = computed(() => {
    let initials = '';
    if (props.firstName?.[0]) {
      initials += props.firstName[0];
    }
    if (props.lastName?.[0]) {
      initials += props.lastName[0];
    }
    if (!initials.length) {
      initials += props.name[0] || '';
    }
    return initials;
  });
</script>

<style lang="scss">
  .UserInitialsBadge {
    font-size: 16px;
    width: 2em;
    height: 2em;
    border-radius: 100vmax;
    background: var(--agritask-color);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
</style>
