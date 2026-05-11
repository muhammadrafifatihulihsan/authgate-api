const mysql = require("mysql2/promise");

let pool;

/**
 * Membuat connection pool ke MySQL.
 * Pool digunakan agar koneksi di-reuse, bukan dibuat baru setiap query.
 */
function createPool() {
	if (!pool) {
		pool = mysql.createPool({
			host: process.env.DB_HOST || "localhost",
			port: parseInt(process.env.DB_PORT, 10) || 3306,
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "",
			database: process.env.DB_NAME || "authgate",
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			charset: "utf8mb4",
		});
	}
	return pool;
}

/**
 * Inisialisasi database: membuat tabel `users` jika belum ada.
 * Dipanggil saat app pertama kali start.
 */
async function initDatabase() {
	const db = createPool();
	try {
		await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        refresh_token TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
		console.log("MySQL terkoneksi & tabel users siap.");
	} catch (err) {
		console.error("Gagal inisialisasi database:", err.message);
		throw err;
	}
}

/**
 * Mengembalikan pool instance.
 */
function getPool() {
	return createPool();
}

/**
 * Menutup semua koneksi di pool (untuk graceful shutdown).
 */
async function closePool() {
	if (pool) {
		await pool.end();
		pool = null;
		console.log("🔌 MySQL pool ditutup.");
	}
}

module.exports = { initDatabase, getPool, closePool };
