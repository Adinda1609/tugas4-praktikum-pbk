<template>
  <div id="app">
    <Header />
    <main class="container">
      <div v-if="store.isLoading" class="loading-indicator">
        <p>Memuat data tugas...</p>
      </div>
      <template v-else>
        <TodoForm />
        <FilterSection />
        <TodoList />
        <QuickActions />
      </template>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore';
import Header from './components/Header.vue';
import TodoForm from './components/TodoForm.vue';
import FilterSection from './components/FilterSection.vue';
import TodoList from './components/TodoList.vue';
import QuickActions from './components/QuickActions.vue';

const store = useTodoStore();

// Panggil fetchTodos saat komponen pertama kali dimuat
onMounted(() => {
  store.fetchTodos();
});
</script>

<style scoped>
.loading-indicator {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #B48E99;
}
</style>