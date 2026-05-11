require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");

const { initDatabase, closePool } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ── Security & Parsing ──────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Swagger Docs ────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ──────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ── Health Check ────────────────────────────────────────
app.get("/health", (_req, res) =>
	res.json({ status: "UP", timestamp: new Date().toISOString() }),
);

// ── 404 Handler ─────────────────────────────────────────
app.use((_req, res) => {
	res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

// ── Global Error Handler ────────────────────────────────
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		error:
			process.env.NODE_ENV === "production"
				? "Internal server error"
				: err.message,
	});
});

// ── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		// Inisialisasi database (buat tabel jika belum ada)
		await initDatabase();

		const server = app.listen(PORT, () => {
			console.log(`Server berjalan di http://localhost:${PORT}`);
			console.log(`Swagger docs di http://localhost:${PORT}/api-docs`);
		});

		// ── Graceful Shutdown ─────────────────────────────
		const shutdown = async (signal) => {
			console.log(`\n${signal} diterima. Menutup server...`);
			server.close(async () => {
				await closePool();
				console.log("Server ditutup dengan aman.");
				process.exit(0);
			});
		};

		process.on("SIGTERM", () => shutdown("SIGTERM"));
		process.on("SIGINT", () => shutdown("SIGINT"));
	} catch (err) {
		console.error("Gagal start server!:", err.message);
		process.exit(1);
	}
}

startServer();

module.exports = app;
