<template>
  <header class="todo-header">
    <div class="header-content">
      <div class="header-title">
        Coquet Todo
      </div>
      <p class="header-subtitle">Selamat datang! Mari mulai hari dengan produktif 🌅</p>
    </div>
    <div class="header-stats">
      <div class="stat-item">
        <span class="stat-number">{{ stats.total }}</span>
        <span class="stat-label">TOTAL</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.active }}</span>
        <span class="stat-label">AKTIF</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.completionRate }}%</span>
        <span class="stat-label">SELESAI</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { stats } = storeToRefs(store)
</script>