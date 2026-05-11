const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");
const { validateLoginInput } = require("../../utils/validators");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../utils/tokenUtils");

module.exports = async (req, res) => {
	const { email, password } = req.body;
	const errors = validateLoginInput(email, password);
	if (errors.length) return res.status(400).json({ errors });

	try {
		const user = await UserModel.findByEmail(email);
		if (!user)
			return res.status(401).json({ error: "Email atau password salah" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(401).json({ error: "Email atau password salah" });

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
		await UserModel.updateRefreshToken(user.id, refreshToken);

		res.json({
			message: "Login berhasil",
			accessToken,
			refreshToken,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
