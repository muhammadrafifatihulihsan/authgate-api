const router = require("express").Router();
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const refreshToken = require("../controllers/auth/refreshToken");
const logout = require("../controllers/auth/logout");
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Mendaftarkan user baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Berhasil registrasi
 *       400:
 *         description: Validasi gagal
 *       409:
 *         description: Email sudah terdaftar
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login dan mendapatkan access token + refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan token
 *       400:
 *         description: Input tidak lengkap
 *       401:
 *         description: Email atau password salah
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Memperbarui access token menggunakan refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshRequest'
 *     responses:
 *       200:
 *         description: Token baru berhasil dibuat
 *       400:
 *         description: Refresh token tidak disertakan
 *       403:
 *         description: Refresh token tidak valid atau kadaluarsa
 */
router.post("/refresh", refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout dan hapus refresh token
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout berhasil
 *       401:
 *         description: Tidak ada token
 */
router.post("/logout", authenticate, logout);

module.exports = router;
