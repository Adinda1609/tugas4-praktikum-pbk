# ✅ Coquet Todo!

**Coquet Todo** adalah aplikasi manajemen tugas (Todo List) yang fungsional dan kaya fitur, dibangun dengan Vue.js 3, Vite, dan Pinia. Aplikasi ini dirancang dengan estetika yang lembut, feminin, dan modern, namun tetap menyediakan semua alat yang diperlukan untuk produktivitas.

Aplikasi ini terhubung ke backend palsu menggunakan JSON Server dan berkomunikasi melalui Axios, memungkinkan persistensi data secara penuh (CRUD).


---

## 📌 Tentang Project

Repository ini dibuat untuk memenuhi tugas pada mata kuliah Praktikum Pemrograman Berbasis Komponen (PBK). Aplikasi ini merupakan implementasi to-do list modern yang menerapkan berbagai konsep inti dan lanjutan dari ekosistem Vue.js, termasuk:

**Konsep Dasar Vue:**
1. Declarative Rendering: Menampilkan data secara dinamis di template.
2. Attribute Bindings: Mengikat atribut HTML (seperti class atau disabled) ke data.
3. Event Listeners: Merespons interaksi pengguna (seperti @click atau @submit).
4. Form Bindings: Menggunakan v-model untuk sinkronisasi dua arah pada form.
5. Conditional Rendering: Menampilkan elemen secara kondisional dengan v-if dan v-else.

**Konsep Lanjutan & Ekosistem:**
1. State Management dengan Pinia: Mengelola semua data aplikasi di satu tempat (store) yang terpusat.
2. Komunikasi API: Menggunakan Axios untuk melakukan operasi CRUD (Create, Read, Update, Delete) ke JSON Server.
3. Arsitektur Berbasis Komponen: Memecah UI menjadi komponen-komponen kecil yang dapat digunakan kembali.

---

## 👩‍🎓 Informasi Mahasiswa

- **Nama:** Sri Adinda  
- **NPM:** 233510515  
- **Kelas:** 4F  
- **Program Studi:** Teknik Informatika

---

## ✨ Fitur Utama 
1. **CRUD Penuh**: Tambah, lihat, perbarui (tandai selesai), dan hapus tugas dengan data yang tersimpan di server.

2. **State Management Terpusat**: Menggunakan Pinia untuk mengelola semua state aplikasi secara efisien.

3. **Backend Persisten**: Menggunakan JSON Server dan Axios untuk simulasi backend REST API, sehingga data tidak hilang saat halaman di-refresh.

4. **Pencarian Real-time**: Cari tugas berdasarkan teks atau kategori dengan cepat.

5. **Filter Komprehensif**: Saring tugas berdasarkan status (Semua, Aktif, Selesai) dan Prioritas (Tinggi, Sedang, Rendah).

6. **Statistik Tugas**: Lihat ringkasan jumlah total tugas, tugas aktif, dan persentase penyelesaian di header.

7. **Aksi Cepat**: Tandai semua tugas sebagai selesai atau hapus semua tugas yang sudah selesai dengan satu klik.

8. **Impor & Ekspor Data**: Simpan daftar tugas Anda sebagai file JSON atau muat dari file yang ada.

9. **Desain Responsif**: Tampilan yang cantik dan fungsional di perangkat desktop maupun mobile.


```bash
# 1. Install Axios untuk di dalam proyek Vue
npm install axios

# 2. Install JSON Server sebagai dependency development
npm install --save-dev json-server

# 3. Jalankan Backend JSON Server
npm run serve-json
