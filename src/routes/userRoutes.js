const router = require("express").Router();
const getAllUsers = require("../controllers/user/getAllUsers");
const getProfile = require("../controllers/user/getProfile");
const updateProfile = require("../controllers/user/updateProfile");
const deleteUser = require("../controllers/user/deleteUser");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Mendapatkan semua user (hanya admin)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (bukan admin)
 */
router.get("/", authenticate, authorize("admin"), getAllUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Mendapatkan profil user yang sedang login
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticate, getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: Memperbarui profil sendiri
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui
 *       401:
 *         description: Unauthorized
 */
router.put("/profile", authenticate, updateProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Menghapus user berdasarkan ID (hanya admin)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang akan dihapus
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User tidak ditemukan
 */
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

module.exports = router;
