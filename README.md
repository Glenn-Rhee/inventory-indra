# Inventory Indra — Frontend

Aplikasi manajemen inventaris berbasis web yang dibangun dengan **Next.js 16** dan **TypeScript**. Terhubung ke REST API backend untuk mengelola produk, stok, transaksi, dan laporan.

🔗 **Live Demo:** [https://inventory-indra.vercel.app](https://inventory-indra.vercel.app)  
🔗 **Backend Repository:** [inventory-indra-be](https://github.com/Glenn-Rhee/inventory-indra-be)

---

## Tech Stack

| Kategori         | Teknologi                    |
| ---------------- | ---------------------------- |
| Framework        | Next.js 16.2                 |
| Language         | TypeScript 5                 |
| Styling          | Tailwind CSS 4               |
| UI Components    | shadcn/ui, Radix UI, Base UI |
| State Management | Zustand                      |
| Data Fetching    | TanStack Query (React Query) |
| Tabel Data       | TanStack Table               |
| Form             | React Hook Form + Zod        |
| Charts           | Recharts                     |
| Auth             | NextAuth.js                  |
| Upload File      | UploadThing                  |
| Date Picker      | React Day Picker + date-fns  |
| Notifikasi       | Sonner                       |
| Ikon             | Lucide React                 |

---

## Fitur-Fitur Aplikasi

### 1. Autentikasi & Manajemen Akun

Sistem autentikasi lengkap yang memungkinkan pengguna mendaftar, masuk, dan mengelola profil mereka.

- **Login** — Autentikasi menggunakan email dan password, dikelola via NextAuth.js dengan JWT token.
- **Update Profil** — Pengguna dapat memperbarui data akun mereka.
- **Proteksi Route** — Halaman tertentu hanya bisa diakses oleh pengguna yang sudah login.

---

### 2. Manajemen Produk

Fitur CRUD (Create, Read, Update, Delete) lengkap untuk mengelola data produk/obat dalam inventaris.

- **Daftar Produk** — Menampilkan semua produk dalam tabel interaktif dengan fitur sorting, filtering, dan pagination (menggunakan TanStack Table).
- **Tambah Produk** — Form validasi untuk menambahkan produk baru ke sistem.
- **Edit Produk** — Memperbarui informasi produk yang sudah ada.
- **Hapus Produk** — Menghapus produk dari sistem dengan konfirmasi.

---

### 3. Monitoring Stok

Halaman khusus untuk memantau kondisi stok produk secara real-time.

- **Tampilan Stok** — Melihat jumlah stok tersedia untuk setiap produk.
- **Indikasi Stok Rendah** — Membantu mengidentifikasi produk yang perlu diisi ulang.

---

### 4. Manajemen Transaksi

Mencatat dan mengelola setiap transaksi keluar/masuk produk dari inventaris.

- **Buat Transaksi** — Mencatat transaksi baru dengan detail produk dan jumlah yang diproses.
- **Riwayat Transaksi** — Menampilkan seluruh riwayat transaksi dalam tabel yang dapat difilter dan diurutkan.

---

### 5. Dashboard & Statistik

Halaman utama yang memberikan gambaran menyeluruh tentang kondisi inventaris.

- **Ringkasan Data** — Menampilkan statistik kunci seperti total produk, transaksi terkini, dan status stok.
- **Grafik Interaktif** — Visualisasi data menggunakan Recharts untuk memudahkan analisis tren.

---

### 6. xport Laporan ke Excel

Fitur ekspor data langsung ke file Excel untuk keperluan pelaporan.

- **Export Data Produk/Obat** — Mengunduh daftar seluruh produk dalam format `.xlsx`.
- **Export Laporan Transaksi** — Mengunduh laporan transaksi dalam format `.xlsx`.

---

## Struktur Direktori

```
inventory-indra/
├── public/               # Aset statis (gambar, favicon, dll)
├── src/
│   ├── app/              # Halaman & routing (Next.js App Router)
│   ├── components/       # Komponen UI yang dapat digunakan kembali
│   └── ...               # Hooks, lib, types, stores (Zustand)
├── components.json       # Konfigurasi shadcn/ui
├── next.config.ts
├── tailwind.config
├── tsconfig.json
└── package.json
```

---

## Cara Menjalankan

### Prasyarat

- Node.js 20+
- npm / yarn / pnpm

### 1. Clone Repository

```bash
git clone https://github.com/Glenn-Rhee/inventory-indra.git
cd inventory-indra
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env.local` di root direktori:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
BASE_SERVER_URL=http://localhost:8080
SECRET_KEY=your_secret_key
UPLOADTHING_TOKEN=your_uploadthing_token
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Akses aplikasi di `http://localhost:3000`.

### 5. Build untuk Production

```bash
npm run build
npm run start
```
