const UserModel = require("../../models/userModel");

module.exports = async (req, res) => {
	try {
		const targetId = parseInt(req.params.id, 10);
		if (isNaN(targetId))
			return res.status(400).json({ error: "ID tidak valid" });

		const user = await UserModel.findById(targetId);
		if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

		// Admin tidak boleh menghapus dirinya sendiri
		if (targetId === req.user.id)
			return res.status(400).json({ error: "Tidak bisa menghapus akun sendiri" });

		await UserModel.delete(targetId);
		res.json({ message: "User berhasil dihapus" });
	} catch (err) {
		console.error("Delete user error:", err);
		res.status(500).json({ error: "Gagal menghapus user" });
	}
};
