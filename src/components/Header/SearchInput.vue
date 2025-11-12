<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="onInput"
    placeholder="Поиск по имени"
    class="search-input"
  />
</template>

<style scoped>
.search-input {
  width: 394px;
  height: 52px;
  border: 1px gray;
  box-shadow: 0 0 6px rgba(167, 163, 163, 0.3);
  padding-left: 19px;
  outline: none;
  margin-left: 9px;
}
</style>
