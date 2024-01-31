<template>
  <span class="NumericCell cell">{{ modelValue }}</span>
</template>

<script setup lang="ts">
  defineProps<{ modelValue: number | string }>();
</script>

<style></style>
