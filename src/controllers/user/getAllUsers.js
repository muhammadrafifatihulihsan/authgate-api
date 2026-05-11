const UserModel = require("../../models/userModel");

module.exports = async (req, res) => {
	try {
		const users = await UserModel.findAll();
		res.json({
			message: "Data user berhasil diambil",
			total: users.length,
			users,
		});
	} catch (err) {
		console.error("Get all users error:", err);
		res.status(500).json({ error: "Gagal mengambil data" });
	}
};
