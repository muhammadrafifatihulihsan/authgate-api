const UserModel = require("../../models/userModel");
const {
	verifyRefreshToken,
	generateAccessToken,
	generateRefreshToken,
} = require("../../utils/tokenUtils");

module.exports = async (req, res) => {
	const { refreshToken } = req.body;
	if (!refreshToken)
		return res.status(400).json({ error: "Refresh token diperlukan" });

	try {
		const decoded = verifyRefreshToken(refreshToken);
		const user = await UserModel.findById(decoded.id);

		// Pastikan user masih ada DAN token cocok dengan yang tersimpan di DB
		if (!user || user.refresh_token !== refreshToken)
			return res.status(403).json({ error: "Refresh token tidak valid" });

		const newAccess = generateAccessToken(user);
		const newRefresh = generateRefreshToken(user);
		await UserModel.updateRefreshToken(user.id, newRefresh);

		res.json({
			message: "Token berhasil diperbarui",
			accessToken: newAccess,
			refreshToken: newRefresh,
		});
	} catch (err) {
		console.error("Refresh token error:", err.message);
		res.status(403).json({ error: "Refresh token kadaluarsa atau tidak valid" });
	}
};
