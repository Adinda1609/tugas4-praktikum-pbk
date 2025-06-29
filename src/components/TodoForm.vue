<template>
  <div class="card todo-form-container">
    <form @submit.prevent="handleSubmit">
      <div class="section-header" style="text-align: center; margin-bottom: 1.5rem;">
        <h2 class="section-title">✨ Tambah Tugas Baru</h2>
        <p class="section-subtitle">Buat tugas baru untuk meningkatkan produktivitas</p>
      </div>

      <div class="form-group">
        <label for="task-text">Deskripsi Tugas</label>
        <textarea
          id="task-text"
          v-model="text"
          class="input"
          placeholder="Tulis deskripsi tugasmu di sini..."
          maxlength="200"
          required
        ></textarea>
        <div class="char-counter">{{ text.length }}/200</div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="task-priority">Prioritas</label>
          <select id="task-priority" v-model="priority" class="input">
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>
        <div class="form-group">
          <label for="task-category">Kategori</label>
          <select id="task-category" v-model="category" class="input">
            <option value="belajar">Belajar</option>
            <option value="personal">Personal</option>
            <option value="projek">Projek</option>
            <option value="deploy">Deploy</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" @click="resetForm">
          <i class="fas fa-undo"></i> Reset
        </button>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-plus"></i> Tambah Tugas
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const store = useTodoStore()

const text = ref('')
const priority = ref('low')
const category = ref('belajar')

function resetForm() {
  text.value = ''
  priority.value = 'low'
  category.value = 'belajar'
}

function handleSubmit() {
  if (text.value.trim()) {
    store.addTodo({ text: text.value, priority: priority.value, category: category.value })
    resetForm()
  }
}
</script>