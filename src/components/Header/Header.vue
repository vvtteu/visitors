<script setup lang="ts">
import VisitorStats from './VisitorStats.vue';
import AddButton from './AddButton.vue';
import SearchInput from './SearchInput.vue';
import type { Visitor } from '@/types/Visitor';
import { computed } from 'vue';

const props = defineProps<{
  visitors: Visitor[]
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'add') : void
}>();

const searchQuery = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const activeCount = computed(() => props.visitors.filter((v) => v.present).length);
const inactiveCount = computed(() => props.visitors.filter((v) => !v.present).length);
</script>

<template>
<header class="header">
  <div class="left-section">
      <div class="logo">
        <img src="@/assets/images/logo_garden.png" alt="logo" class="logo-img"/>
      </div>
      <div class="controls">
        <SearchInput v-model="searchQuery" />
        <AddButton @click="$emit('add')" />
      </div>
    </div>
   <VisitorStats :activeCount="activeCount" :inactiveCount="inactiveCount" class="stats" />
</header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.left-section {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}

.logo-img {
  max-width: 187px;
  height: 89px;
  margin-top: 24px;
  margin-left: 50px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 59px;
}

.stats{
  padding: 30px;
}
</style>
