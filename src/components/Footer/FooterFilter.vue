<script setup lang="ts">
import type { PropType } from 'vue'

export type FilterType = 'all' | 'present' | 'absent'

defineProps({
  modelValue: { type: String as PropType<FilterType>, required: true },
})

const emit = defineEmits<{
  (e: 'change', val: FilterType): void
}>()

const options: { label: string; value: FilterType }[] = [
  { label: 'Без фильтра', value: 'all' },
  { label: 'Присутствующим', value: 'present' },
  { label: 'Отсутствующим', value: 'absent' },
]
</script>

<template>
  <footer class="footer">
    <div class="filter-group">
      <p class="filter-label">Фильтровать по:</p>
      <button
        v-for="opt in options"
        :key="opt.value"
        @click="$emit('change', opt.value)"
        :class="{ active: modelValue === opt.value }"
        class="filter-btn"
      >
        {{ opt.label }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 0;
  display: flex;
  justify-content: left;
}

.filter-group {
  display: flex;
  gap: 8px;
  margin-left: 20px;
}

.filter-label {
  font-weight: bold;
  color: #4e3000;
  font-size: 25px;
  margin: 0;
  line-height: 1;  
}

.filter-btn {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 20px;
  border: none;
  color: #4e3000;
  background: transparent;
}

.filter-btn.active {
  background: #c4c4c4;
  border-radius: 20px;
  color: white;
  font-weight: bold;
}
</style>
