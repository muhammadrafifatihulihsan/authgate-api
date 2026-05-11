require("dotenv").config({
	path: require("path").resolve(__dirname, "../../.env"),
});
const { initDatabase, getPool, closePool } = require("../config/db");
const bcrypt = require("bcryptjs");

const users = [
	{
		username: "admin",
		email: "admin@authgate.com",
		password: "admin123",
		role: "admin",
	},
	{
		username: "denny",
		email: "denny@mail.com",
		password: "rahasia123",
		role: "user",
	},
	{
		username: "sinta",
		email: "sinta@mail.com",
		password: "sinta456",
		role: "user",
	},
	{
		username: "rafi",
		email: "rafi@mail.com",
		password: "rafi123",
		role: "admin",
	},
	{
		username: "ihsan",
		email: "ihsan@mail.com",
		password: "ihsan123",
		role: "user",
	},
];

async function seed() {
	try {
		// Pastikan tabel sudah dibuat
		await initDatabase();
		const pool = getPool();

		for (const u of users) {
			// Cek apakah user sudah ada (berdasarkan email)
			const [existing] = await pool.execute(
				`SELECT id FROM users WHERE email = ?`,
				[u.email],
			);

			if (existing.length > 0) {
				console.log(`⏭️  Skip: ${u.email} sudah ada (id: ${existing[0].id})`);
				continue;
			}

			const salt = await bcrypt.genSalt(12);
			const hashed = await bcrypt.hash(u.password, salt);
			const [result] = await pool.execute(
				`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
				[u.username, u.email, hashed, u.role],
			);
			console.log(
				`User ditambahkan: ${u.email} (id: ${result.insertId}, role: ${u.role})`,
			);
		}

		console.log("\nSeeding selesai!");
	} catch (err) {
		console.error("Seeding gagal:v", err.message);
	} finally {
		await closePool();
	}
}

seed();
