<template>
  <div class="max-w-2xl border rounded mx-auto min-h-36 bg-white">
    <h1 class="text-2xl border-b p-4">{{ title }}</h1>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
