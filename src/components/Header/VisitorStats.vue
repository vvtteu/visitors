<script setup lang="ts">
defineProps<{
  activeCount: number;
  inactiveCount: number;
}>();
</script>

<template>
  <div class="stats">
    <h2 class="stats-text">Посетители</h2>
    <div class="counters">
      <span class="active">{{ activeCount }}</span>
      <span class="stats-text"> / </span>
      <span class="inactive"> {{ inactiveCount }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  align-items: baseline;
  flex-direction: column;
}
.stats-text{
  color: #4E3000;
  font-weight: 700;
  font-size: 30px;
}
.counters {
  margin-left: auto;
  text-align: right;
}

.active{
  font-weight: 700;
  color: green;
  font-size: 30px;
}
.inactive{
  font-weight: 700;
  color: red;
  font-size: 30px;
}
</style>
