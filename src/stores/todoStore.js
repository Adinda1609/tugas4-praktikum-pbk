// File: src/stores/todoStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

// URL ke JSON Server kita
// File: src/stores/todoStore.js

// URL ke API publik di My JSON Server
const API_URL = 'https://my-json-server.typicode.com/Adinda1609/tugas4-praktikum-pbk/todos';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    filter: 'all',
    search: '',
    isLoading: true, // Tambahkan state untuk loading
  }),

  getters: {
    // Getter tidak perlu diubah, mereka akan bekerja dengan state yang ada
    stats(state) {
      const total = state.todos.length;
      const completed = state.todos.filter(t => t.completed).length;
      return {
        total,
        active: total - completed,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },

    filteredTodos(state) {
      const searchLower = state.search.toLowerCase();
      
      const filteredBySearch = state.todos.filter(todo => 
        todo.text.toLowerCase().includes(searchLower) || 
        todo.category.toLowerCase().includes(searchLower)
      );

      switch (state.filter) {
        case 'active':
          return filteredBySearch.filter(todo => !todo.completed);
        case 'completed':
          return filteredBySearch.filter(todo => todo.completed);
        case 'high':
        case 'medium':
        case 'low':
          return filteredBySearch.filter(todo => todo.priority === state.filter);
        default:
          return filteredBySearch;
      }
    },
  },

  actions: {
    // --- AKSI BARU DENGAN API (CRUD) ---

    // 1. READ: Mengambil semua todos dari server
    async fetchTodos() {
      this.isLoading = true;
      try {
        const response = await axios.get(API_URL);
        // Urutkan berdasarkan tanggal terbaru
        this.todos = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } catch (error) {
        console.error('Gagal mengambil data todos:', error);
        alert('Tidak dapat memuat data dari server. Pastikan server JSON berjalan.');
      } finally {
        this.isLoading = false;
      }
    },

    // 2. CREATE: Menambah todo baru ke server
    async addTodo(todoData) {
      if (!todoData.text.trim()) return;
      
      const newTodo = {
        ...todoData,
        id: Date.now().toString(), // JSON server akan menimpa ini, tapi baik untuk ada
        completed: false,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await axios.post(API_URL, newTodo);
        this.todos.unshift(response.data); // Tambah ke depan array
      } catch (error) {
        console.error('Gagal menambah todo:', error);
      }
    },

    // 3. UPDATE (Toggle Completed): Mengubah status todo di server
    async toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };
      
      try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
        // Update data di state dengan data dari server
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
      } catch (error) {
        console.error('Gagal mengubah status todo:', error);
      }
    },

    // 4. DELETE: Menghapus todo dari server
    async deleteTodo(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.todos = this.todos.filter(t => t.id !== id);
      } catch (error) {
        console.error('Gagal menghapus todo:', error);
      }
    },
    
    // --- Aksi Lainnya (sudah disesuaikan) ---

    async markAllCompleted() {
      // Buat semua todo jadi completed
      const updates = this.todos.map(todo => {
        if (!todo.completed) {
          return axios.put(`${API_URL}/${todo.id}`, { ...todo, completed: true });
        }
        return Promise.resolve(); // Jika sudah selesai, tidak perlu diupdate
      });
      
      try {
        await Promise.all(updates);
        // Ambil data terbaru dari server setelah semua selesai
        await this.fetchTodos();
      } catch (error) {
        console.error('Gagal menandai semua selesai:', error);
      }
    },

    async clearCompleted() {
      // Hapus semua todo yang sudah completed
      const completedTodos = this.todos.filter(todo => todo.completed);
      const deletePromises = completedTodos.map(todo => axios.delete(`${API_URL}/${todo.id}`));
      
      try {
        await Promise.all(deletePromises);
        this.todos = this.todos.filter(todo => !todo.completed);
      } catch (error) {
        console.error('Gagal menghapus tugas yang selesai:', error);
      }
    },
    
    // Fungsi filter dan search tidak perlu diubah, mereka bekerja di sisi klien
    setFilter(filter) {
      this.filter = filter;
    },
    setSearch(value) {
      this.search = value;
    },
    
    // Fungsi Import/Export tetap bekerja di sisi klien, tidak menyentuh server
    exportTodos() {
      return JSON.stringify(this.todos, null, 2);
    },
    
    async importTodos(data) {
        alert("Fungsi import akan menimpa semua data di server. Lanjutkan?");
        try {
            const parsed = JSON.parse(data);
            
            // 1. Hapus semua data yang ada di server
            const deletePromises = this.todos.map(t => axios.delete(`${API_URL}/${t.id}`));
            await Promise.all(deletePromises);

            // 2. Tambahkan semua data baru ke server
            const addPromises = parsed.map(todo => {
                const newTodo = {...todo, id: undefined }; // Hapus ID agar JSON server membuat yang baru
                return axios.post(API_URL, newTodo);
            });
            await Promise.all(addPromises);
            
            // 3. Ambil data final dari server
            await this.fetchTodos();

        } catch (e) {
            console.error('Gagal mengimpor data:', e);
            alert('Gagal mengimpor data. Pastikan format file JSON benar.');
        }
    },
  },
});