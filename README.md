# 🔐 AuthGate API

REST API Backend untuk **Autentikasi** dan **Manajemen User** menggunakan **JWT (JSON Web Token)** dengan mekanisme **Access Token** & **Refresh Token**.

Dibangun dengan **Node.js**, **Express v5**, dan **MySQL**.

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi & Setup](#-instalasi--setup)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Seeding Database](#-seeding-database)
- [API Endpoints](#-api-endpoints)
- [Swagger Documentation](#-swagger-documentation)
- [Docker](#-docker)
- [Keamanan](#-keamanan)
- [Penulis](#-penulis)

---

## ✨ Fitur

- ✅ Registrasi user baru dengan validasi input
- ✅ Login dengan email & password (bcrypt hashing)
- ✅ JWT Access Token (short-lived, 15 menit)
- ✅ JWT Refresh Token (long-lived, 7 hari) + rotasi token
- ✅ Logout (hapus refresh token dari database)
- ✅ Profil user (lihat & update profil sendiri)
- ✅ CRUD User untuk Admin (lihat semua user, hapus user)
- ✅ Role-Based Access Control (RBAC): `user` dan `admin`
- ✅ Swagger/OpenAPI Documentation
- ✅ Helmet, CORS, Morgan (security & logging)
- ✅ Docker & Docker Compose support
- ✅ Graceful shutdown
- ✅ Input validation & duplicate check (email + username)

---

## 🛠 Tech Stack

| Teknologi      | Keterangan                         |
| -------------- | ---------------------------------- |
| **Node.js**    | Runtime JavaScript                 |
| **Express v5** | Web framework                      |
| **MySQL**      | Relational database (via `mysql2`) |
| **JWT**        | Autentikasi berbasis token         |
| **bcryptjs**   | Password hashing                   |
| **Swagger**    | API documentation (OpenAPI 3.0)    |
| **Helmet**     | HTTP security headers              |
| **CORS**       | Cross-Origin Resource Sharing      |
| **Morgan**     | HTTP request logger                |
| **Docker**     | Containerization                   |

---

## 📁 Struktur Proyek

```
authgate-api/
├── src/
│   ├── config/
│   │   └── db.js                 # Koneksi MySQL (connection pool)
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── register.js       # POST /api/auth/register
│   │   │   ├── login.js          # POST /api/auth/login
│   │   │   ├── refreshToken.js   # POST /api/auth/refresh
│   │   │   └── logout.js         # POST /api/auth/logout
│   │   └── user/
│   │       ├── getAllUsers.js     # GET  /api/users (admin only)
│   │       ├── getProfile.js     # GET  /api/users/profile
│   │       ├── updateProfile.js  # PUT  /api/users/profile
│   │       └── deleteUser.js     # DELETE /api/users/:id (admin only)
│   ├── middleware/
│   │   ├── authenticate.js       # Verifikasi JWT access token
│   │   └── authorize.js          # Cek role (RBAC)
│   ├── models/
│   │   └── userModel.js          # Query database (CRUD users)
│   ├── routes/
│   │   ├── authRoutes.js         # Routing autentikasi
│   │   └── userRoutes.js         # Routing user management
│   ├── seeds/
│   │   └── seedUsers.js          # Seed data user awal
│   ├── swagger/
│   │   └── swaggerConfig.js      # Konfigurasi Swagger/OpenAPI
│   ├── utils/
│   │   ├── tokenUtils.js         # Generate & verify JWT
│   │   └── validators.js         # Validasi input
│   └── app.js                    # Entry point aplikasi
├── .dockerignore
├── .env                          # Environment variables (JANGAN commit!)
├── .env.example                  # Template environment variables
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── sonar-project.properties
└── README.md
```

---

## 📦 Prasyarat

Pastikan sudah terinstal di komputer Anda:

- **[Node.js](https://nodejs.org/)** v18 atau lebih baru
- **[MySQL](https://www.mysql.com/)** v8.0 atau lebih baru (atau gunakan Docker)
- **[npm](https://www.npmjs.com/)** (sudah termasuk dalam Node.js)
- _(Opsional)_ **[Docker](https://www.docker.com/)** & **Docker Compose**

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/authgate-api.git
cd authgate-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat Database MySQL

Masuk ke MySQL CLI atau GUI (seperti phpMyAdmin, MySQL Workbench, HeidiSQL):

```sql
CREATE DATABASE authgate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

> **Catatan:** Tabel `users` akan dibuat **otomatis** saat aplikasi pertama kali dijalankan.

### 4. Konfigurasi Environment

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi MySQL Anda.

---

## ⚙️ Konfigurasi Environment

Buat file `.env` di root project (atau copy dari `.env.example`):

```env
# Server
PORT=3000
NODE_ENV=development

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=authgate

# JWT Secrets (GANTI dengan string acak yang kuat!)
JWT_ACCESS_SECRET=rahasia_access_2026_super_kuat
JWT_REFRESH_SECRET=rahasia_refresh_2026_super_kuat
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

| Variable              | Deskripsi                                | Default       |
| --------------------- | ---------------------------------------- | ------------- |
| `PORT`                | Port server                              | `3000`        |
| `NODE_ENV`            | Environment (`development`/`production`) | `development` |
| `DB_HOST`             | Host MySQL                               | `localhost`   |
| `DB_PORT`             | Port MySQL                               | `3306`        |
| `DB_USER`             | Username MySQL                           | `root`        |
| `DB_PASSWORD`         | Password MySQL                           | _(kosong)_    |
| `DB_NAME`             | Nama database                            | `authgate`    |
| `JWT_ACCESS_SECRET`   | Secret key untuk access token            | -             |
| `JWT_REFRESH_SECRET`  | Secret key untuk refresh token           | -             |
| `JWT_ACCESS_EXPIRES`  | Masa berlaku access token                | `15m`         |
| `JWT_REFRESH_EXPIRES` | Masa berlaku refresh token               | `7d`          |

---

## ▶️ Menjalankan Aplikasi

### Development Mode (dengan auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server akan berjalan di: `http://localhost:3000`

---

## 🌱 Seeding Database

Untuk mengisi data user awal (termasuk akun admin):

```bash
npm run seed
```

**Data seed default:**

| Username | Email              | Password   | Role  |
| -------- | ------------------ | ---------- | ----- |
| admin    | admin@authgate.com | admin123   | admin |
| rafi     | rafi@mail.com      | rafi123    | admin |
| ihsan    | ihsan@mail.com     | ihsan123   | user  |
| denny    | denny@mail.com     | rahasia123 | user  |
| sinta    | sinta@mail.com     | sinta456   | user  |

---

## 📡 API Endpoints

### 🔓 Auth (Tidak perlu token)

| Method | Endpoint             | Deskripsi                   |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Mendaftarkan user baru      |
| POST   | `/api/auth/login`    | Login dan mendapatkan token |
| POST   | `/api/auth/refresh`  | Memperbarui access token    |

### 🔒 Auth (Perlu token)

| Method | Endpoint           | Deskripsi                      |
| ------ | ------------------ | ------------------------------ |
| POST   | `/api/auth/logout` | Logout dan hapus refresh token |

### 👤 User (Perlu token)

| Method | Endpoint             | Deskripsi                 | Akses       |
| ------ | -------------------- | ------------------------- | ----------- |
| GET    | `/api/users/profile` | Lihat profil sendiri      | User, Admin |
| PUT    | `/api/users/profile` | Update profil sendiri     | User, Admin |
| GET    | `/api/users`         | Lihat semua user          | Admin only  |
| DELETE | `/api/users/:id`     | Hapus user berdasarkan ID | Admin only  |

### 🏥 Health

| Method | Endpoint  | Deskripsi        |
| ------ | --------- | ---------------- |
| GET    | `/health` | Status kesehatan |

---

## 📝 Contoh Request & Response

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "rafiiee",
    "email": "rafiiee@mail.com",
    "password": "password123"
  }'
```

**Response (201):**

```json
{
	"message": "Registrasi berhasil",
	"user": {
		"id": 6,
		"username": "rafiiee",
		"email": "rafiiee@mail.com",
		"role": "user"
	}
}
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@authgate.com",
    "password": "admin123"
  }'
```

**Response (200):**

```json
{
	"message": "Login berhasil",
	"accessToken": "eyJhbGci...",
	"refreshToken": "eyJhbGci...",
	"user": {
		"id": 1,
		"username": "admin",
		"email": "admin@authgate.com",
		"role": "admin"
	}
}
```

### Get Profile (perlu Bearer Token)

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Refresh Token

```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<REFRESH_TOKEN>"
  }'
```

---

## 📚 Swagger Documentation

Setelah server berjalan, buka di browser:

```
http://localhost:3000/api-docs
```

Swagger menyediakan UI interaktif untuk mencoba semua endpoint. Klik **Authorize** (ikon gembok) dan masukkan access token untuk mengakses endpoint yang memerlukan autentikasi.

---

## 🐳 Docker

### Menjalankan dengan Docker Compose

```bash
# Build dan jalankan semua service (API + MySQL)
docker-compose up -d

# Lihat logs
docker-compose logs -f app

# Jalankan seeder di dalam container
docker-compose exec app node src/seeds/seedUsers.js

# Stop semua service
docker-compose down

# Stop dan hapus volume (reset database)
docker-compose down -v
```

### Menjalankan Dockerfile saja (tanpa Compose)

```bash
docker build -t authgate-api .
docker run -p 3000:3000 --env-file .env authgate-api
```

> **Catatan:** Jika menjalankan tanpa Docker Compose, pastikan MySQL sudah berjalan dan `DB_HOST` di `.env` mengarah ke host MySQL yang benar.

---

## 🔒 Keamanan

| Fitur                           | Implementasi                                          |
| ------------------------------- | ----------------------------------------------------- |
| Password Hashing                | bcryptjs dengan salt rounds 12                        |
| JWT Access Token                | Short-lived (default 15 menit)                        |
| JWT Refresh Token               | Long-lived (default 7 hari) + rotasi setiap refresh   |
| HTTP Security Headers           | Helmet.js                                             |
| Input Validation                | Custom validator (email, username, password)          |
| Role-Based Access Control       | Middleware authorize (admin/user)                     |
| Privilege Escalation Prevention | User tidak bisa mengubah role sendiri                 |
| Admin Self-Delete Prevention    | Admin tidak bisa menghapus akun sendiri               |
| Duplicate Check                 | Email & username dicek duplikasi saat register/update |
| Sensitive Data Protection       | Password & refresh_token tidak dikirim ke response    |
| Graceful Shutdown               | SIGTERM/SIGINT handler untuk menutup koneksi DB       |

---

## 🧪 Testing

Anda bisa menggunakan tools berikut untuk menguji API:

- **[Postman](https://www.postman.com/)** — GUI API client
- **[Insomnia](https://insomnia.rest/)** — Alternative API client
- **[curl](https://curl.se/)** — Command line (contoh di atas)
- **Swagger UI** — Langsung di `http://localhost:3000/api-docs`

---

## 👨‍💻 Penulis

**Muhammad Rafi Fatihul Ihsan**

📧 muhammadrafifatihulihsan@gmail.com

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [ISC License](https://opensource.org/licenses/ISC).
