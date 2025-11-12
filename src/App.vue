<script setup lang="ts">
import Header from './components/Header/Header.vue';
import VisitorsTable from './components/VisitorsTable/VisitorsTable.vue';
import FooterFilter, { type FilterType } from './components/Footer/FooterFilter.vue';
import VisitorModal from './components/VisitorsModal/VisitorModal.vue';
import { ref, onMounted, computed, watch } from 'vue';
import type { Visitor } from './types/Visitor';

const visitors = ref<Visitor[]>([]);
const showModal = ref(false);

onMounted(async () => {
  const res = await fetch('http://localhost:3000/visitors');
  visitors.value = await res.json();
});


function readFilterFromUrl(): FilterType {
  const p = new URLSearchParams(window.location.search);
  const f = p.get('filter');
  if (f === 'present' || f === 'absent') return f;
  return 'all';
}

const filter = ref<FilterType>(readFilterFromUrl());

watch(filter, val => {
  const url = new URL(window.location.href);
  if (val === 'all') url.searchParams.delete('filter');
  else url.searchParams.set('filter', val);
  window.history.replaceState({}, '', url);
});


function readSearchFromUrl(): string {
  return new URLSearchParams(window.location.search).get('search')?.trim() || '';
}

const searchQuery = ref<string>(readSearchFromUrl());

watch(searchQuery, val => {
  const url = new URL(window.location.href);
  if (val) url.searchParams.set('search', val);
  else url.searchParams.delete('search');
  window.history.replaceState({}, '', url);
});


const filteredVisitors = computed(() => {
  let list = visitors.value;
  if (searchQuery.value) {
    list = list.filter(v =>
      v.fullName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filter.value === 'present')  return list.filter(v => v.present);
  if (filter.value === 'absent')   return list.filter(v => !v.present);
  return list;
});

const modalVisitor = ref<Visitor | null | undefined>(undefined);

function openModal(v: Visitor | null = null) {
  modalVisitor.value = v;
}

async function saveVisitor(payload: Visitor | Omit<Visitor, 'id'>) {
  if ('id' in payload) {

    await fetch(`http://localhost:3000/visitors/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const i = visitors.value.findIndex(v => v.id === payload.id);
    if (i !== -1) visitors.value[i] = payload;
  } else {

    const res = await fetch('http://localhost:3000/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, id: Date.now().toString() }),
    });
    const newV: Visitor = await res.json();
    visitors.value.push(newV);
  }
  modalVisitor.value = undefined;
}

async function removeVisitor(id: string) {
  await fetch(`http://localhost:3000/visitors/${id}`, { method: 'DELETE' });
  visitors.value = visitors.value.filter(v => v.id !== id);
  modalVisitor.value = undefined;
}
</script>


<template>
  <div>
    <Header
      v-model="searchQuery"
      :visitors="visitors"
      @add="openModal()"
    />
    <main class="container">
      <div class="wrapper">
        <VisitorsTable :visitors="filteredVisitors" @edit="openModal($event)"/>
      </div>
    </main>
    <FooterFilter v-model="filter" @change="filter = $event" />
    <VisitorModal
      v-if="modalVisitor !== undefined"
      :visitor="modalVisitor"
      @save="saveVisitor"
      @remove="removeVisitor"
      @close="modalVisitor = undefined"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  margin: 0;
  padding: 16px;
}
.wrapper {
  margin: 0 50px;
}
</style>
