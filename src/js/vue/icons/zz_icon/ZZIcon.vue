<template>
  <svg
    :width="size"
    :height="size"
    v-bind="$attrs"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.42139 10.2102H11.4214L5.42139 19.8102H11.4214"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.0209 5.1897H19.0209L15.0209 11.5897H19.0209"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <img />
</template>
<script lang="ts">
  export default {
    name: 'ZZIcon',
  };
</script>
<script setup lang="ts">
  defineProps({ size: { type: Number, default: 24 } });
</script>
