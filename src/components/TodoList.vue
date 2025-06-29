<template>
  <div class="todo-list-section">
    <div class="section-header-bar">
      <i class="fas fa-list-check"></i> Daftar Tugas
    </div>
    <div v-if="store.filteredTodos.length > 0" class="todo-list-content card">
      <ul class="todo-list">
        <li
          v-for="todo in store.filteredTodos"
          :key="todo.id"
          :class="['todo-item', todo.priority, { completed: todo.completed }]"
        >
          <div class="todo-main" @click="store.toggleTodo(todo.id)">
            <i :class="['todo-check-icon', todo.completed ? 'fas fa-check-circle' : 'far fa-circle']"></i>
            <div class="todo-content">
              <span class="todo-text">{{ todo.text }}</span>
              <span class="todo-meta">Kategori: {{ capitalize(todo.category) }}</span>
            </div>
          </div>
          <button class="btn-delete" @click.stop="store.deleteTodo(todo.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="card empty-state">
      <p>✨ Belum ada tugas, silakan tambahkan tugas baru! ✨</p>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'

const store = useTodoStore()

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>