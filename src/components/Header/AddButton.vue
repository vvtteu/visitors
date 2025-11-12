<script setup lang="ts">
defineEmits<{
  (e: 'click') : void
}>();
</script>

<template>
 <button @click = "$emit('click')" class="add-button">Добавить</button>
</template>

<style scoped>
.add-button{
  width: 273px;
  height: 52px;
  background-color: #4caf50;
  border-radius: 10px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 400;
  font-size: 24px;
  margin-left: 15px;
}

.add-button:hover {
  background-color: #45a049;
}

</style>
