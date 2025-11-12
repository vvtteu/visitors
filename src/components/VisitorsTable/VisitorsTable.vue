<script setup lang="ts">
import type { Visitor } from '../../types/Visitor';

defineProps<{
  visitors: Visitor[];
}>();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>№</th>
        <th>ФИО</th>
        <th>Компания</th>
        <th>Группа</th>
        <th>Присутствие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(visitor, idx) in visitors" :key="visitor.id" @click="$emit('edit', visitor)" class="row">
        <td>{{ idx + 1 }}</td>
        <td>{{ visitor.fullName }}</td>
        <td>{{ visitor.company }}</td>
        <td>{{ visitor.group }}</td>
        <td>
          <img
          v-if="visitor.present"
          class="circle"
          src="@/assets/images/rectangle-green.png" />
          <img
          v-else
          class="circle"
          src="@/assets/images/rectangle-red.png" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

}

.table thead {
  height: 34px;
  border-bottom: 3px solid #e9e9e9;
  color: #4e3000;
  font-size: 20px;
}

.row {
  cursor: pointer;
}
.row:hover {
  background: #f8f9fa;
}

th,
td {
  padding: 10px 12px;
  text-align: left;
}

.table th,
.table td {
  padding: 8px 12px;
  text-align: left;
}

.table td {
  font-size: 30px;
}

th {
  font-weight: 600;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #f5f5f5;
  color: #555;
}

.badge.active {
  background-color: #d4edda;
  color: #155724;
}
.circle {
  width: 59px;
  height: 59px;
}
</style>
