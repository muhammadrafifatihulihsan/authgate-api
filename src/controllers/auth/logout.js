const UserModel = require("../../models/userModel");

module.exports = async (req, res) => {
	try {
		await UserModel.updateRefreshToken(req.user.id, null);
		res.json({ message: "Logout berhasil" });
	} catch (err) {
		console.error("Logout error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
