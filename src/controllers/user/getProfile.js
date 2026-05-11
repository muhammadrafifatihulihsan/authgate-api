const UserModel = require("../../models/userModel");

module.exports = async (req, res) => {
	try {
		const user = await UserModel.findById(req.user.id);
		if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

		// Jangan kirim password dan refresh_token ke client
		res.json({
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
				created_at: user.created_at,
				updated_at: user.updated_at,
			},
		});
	} catch (err) {
		console.error("Get profile error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
