const { getPool } = require("../config/db");

const UserModel = {
	/**
	 * Membuat user baru.
	 * @returns {{ id, username, email, role }}
	 */
	create: async (username, email, hashedPass, role = "user") => {
		const pool = getPool();
		const [result] = await pool.execute(
			`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
			[username, email, hashedPass, role],
		);
		return { id: result.insertId, username, email, role };
	},

	/**
	 * Cari user berdasarkan email. Mengembalikan semua kolom (termasuk password & refresh_token).
	 */
	findByEmail: async (email) => {
		const pool = getPool();
		const [rows] = await pool.execute(
			`SELECT * FROM users WHERE email = ?`,
			[email],
		);
		return rows[0] || null;
	},

	/**
	 * Cari user berdasarkan username.
	 */
	findByUsername: async (username) => {
		const pool = getPool();
		const [rows] = await pool.execute(
			`SELECT * FROM users WHERE username = ?`,
			[username],
		);
		return rows[0] || null;
	},

	/**
	 * Cari user berdasarkan ID. Mengembalikan semua kolom termasuk refresh_token
	 * agar bisa dipakai untuk validasi refresh token.
	 */
	findById: async (id) => {
		const pool = getPool();
		const [rows] = await pool.execute(
			`SELECT id, username, email, password, role, refresh_token, created_at, updated_at FROM users WHERE id = ?`,
			[id],
		);
		return rows[0] || null;
	},

	/**
	 * Ambil semua user (tanpa password & refresh_token).
	 */
	findAll: async () => {
		const pool = getPool();
		const [rows] = await pool.execute(
			`SELECT id, username, email, role, created_at, updated_at FROM users`,
		);
		return rows;
	},

	/**
	 * Update data user.
	 */
	update: async (id, username, email, hashedPass, role) => {
		const pool = getPool();
		const [result] = await pool.execute(
			`UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`,
			[username, email, hashedPass, role, id],
		);
		return { affectedRows: result.affectedRows };
	},

	/**
	 * Hapus user berdasarkan ID.
	 */
	delete: async (id) => {
		const pool = getPool();
		const [result] = await pool.execute(
			`DELETE FROM users WHERE id = ?`,
			[id],
		);
		return { affectedRows: result.affectedRows };
	},

	/**
	 * Update refresh token untuk user tertentu.
	 */
	updateRefreshToken: async (id, token) => {
		const pool = getPool();
		await pool.execute(
			`UPDATE users SET refresh_token = ? WHERE id = ?`,
			[token, id],
		);
		return true;
	},
};

module.exports = UserModel;
