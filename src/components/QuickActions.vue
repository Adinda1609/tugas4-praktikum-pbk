<template>
  <div class="quick-actions-section">
    <div class="section-header-bar">
      <i class="fas fa-bolt"></i> Aksi Cepat
    </div>
    <div class="card quick-actions-content">
      <div class="action-buttons">
        <button class="btn btn-action" @click="store.markAllCompleted">
          <i class="fas fa-check-double"></i> Tandai Semua Selesai
        </button>
        <button class="btn btn-action" @click="store.clearCompleted">
          <i class="fas fa-trash"></i> Hapus yang Selesai
        </button>
        <button class="btn btn-action" @click="downloadData">
          <i class="fas fa-file-export"></i> Export Data
        </button>
        <button class="btn btn-action" @click="importData">
          <i class="fas fa-file-import"></i> Import Data
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
const store = useTodoStore()

function downloadData() {
  const blob = new Blob([JSON.stringify(store.todos, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'coquet-todos.json'
  link.click()
  URL.revokeObjectURL(url)
}

function importData() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const text = await file.text()
    store.importTodos(text)
  }
  input.click()
}
</script>