<template>
  <div class="filter-section">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input
        v-model="search"
        @input="store.setSearch(search)"
        type="text"
        placeholder="Cari tugas atau kategori..."
      />
    </div>
    <div class="filter-buttons">
      <button
        v-for="opt in filters"
        :key="opt.value"
        :class="['filter-btn', opt.value, { active: store.filter === opt.value }]"
        @click="store.setFilter(opt.value)"
      >
        <i :class="opt.icon"></i> {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const store = useTodoStore()
const search = ref(store.search)

const filters = [
  { label: 'Semua', value: 'all', icon: 'fas fa-infinity' },
  { label: 'Aktif', value: 'active', icon: 'fas fa-fire' },
  { label: 'Selesai', value: 'completed', icon: 'fas fa-check-circle' },
  { label: 'Tinggi', value: 'high', icon: 'fas fa-circle' },
  { label: 'Sedang', value: 'medium', icon: 'fas fa-circle' },
  { label: 'Rendah', value: 'low', icon: 'fas fa-circle' }
]
</script>