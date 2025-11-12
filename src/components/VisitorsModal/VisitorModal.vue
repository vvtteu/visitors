<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { Visitor } from '../../types/Visitor'
import { GROUPS } from '../../types/Visitor'

const props = defineProps<{
  visitor?: Visitor | null
}>()

const emit = defineEmits<{
  (e: 'save', payload: Visitor | Omit<Visitor, 'id'>): void
  (e: 'remove', id: string): void
  (e: 'close'): void
}>()

const isEdit = computed(() => !!props.visitor)

const form = reactive({
  fullName: '',
  company: '',
  group: GROUPS[0],
  present: true,
})

watch(
  () => props.visitor,
  (v) => {
    if (v) Object.assign(form, v)
    else reset()
  },
  { immediate: true },
)

function reset() {
  Object.assign(form, {
    fullName: '',
    company: '',
    group: GROUPS[0],
    present: true,
  })
}

function submit() {
  if (isEdit.value) emit('save', { ...props.visitor!, ...form })
  else emit('save', { ...form })
}

function remove() {
  if (confirm('Удалить посетителя?')) emit('remove', props.visitor!.id)
}

function close() {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="close">
      <div class="modal">
        <form @submit.prevent="submit" class="form-group">
          <div class="form-content">
            <div class="form">
              <label class="form-label">ФИО</label>
              <input v-model="form.fullName" required class="form-input" />
            </div>

            <div class="form">
              <label class="form-label">Компания</label>
              <input v-model="form.company" required class="form-input" />
            </div>

            <div class="form">
              <label class="form-label">Группа</label>
              <select v-model="form.group" required class="form-input">
                <option v-for="g in GROUPS" :key="g">{{ g }}</option>
              </select>
            </div>

            <div class="form">
              <label class="form-label">Присутствие</label>
              <input type="checkbox" class="custom-checkbox" v-model="form.present" />
            </div>
            <div class="form buttons-row">
              <button type="submit" class="save-button">
                {{ isEdit ? 'Сохранить' : 'Добавить' }}
              </button>
              <button type="button" @click="close" class="cancel">Отмена</button>
              <button v-if="isEdit" type="button" @click="remove" class="delete">Удалить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 1200px;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-group {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-content {
  width: 90%;
  max-width: 600px;

}

.form {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0 20px;
  align-items: baseline;
  margin-top: 30px;
}
.form-label {
  font-size: 25px;
  font-weight: 600;
  color: #4e3000;
}
.form-input {
  width: 100%;
  height: 52px;
  padding-left: 19px;
  font-size: 20px;
  border: none;
  box-shadow: 0 0 6px rgba(167, 163, 163, 0.3);
  outline: none;
}

.custom-checkbox {
  justify-self: start;
  width: 25px;
  height: 25px;
}

.buttons-row {
  grid-column: 2 / 3;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  margin-top: 32px;
}

.save-button,
.cancel,
.delete {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 220px;
}

.save-button {
  background: #4caf50;
  color: #fff;
}

.cancel {
  background: #e0e0e0;
  color: #333;
}

.delete {
  background: #dc3545;
  color: #fff;
}
</style>
