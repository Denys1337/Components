<template>
  <div class="DateCell two-line-cell">
    <span class="font-body-small">{{ date }}</span>
    <span class="font-subtext text-gray-900" v-if="time">{{ time }}</span>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ modelValue: string }>(), { modelValue: '' });
  const [date, time = ''] = props.modelValue.split(' ');
</script>
