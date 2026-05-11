const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");
const { validateRegisterInput } = require("../../utils/validators");

module.exports = async (req, res) => {
	const { username, email, password } = req.body;
	const errors = validateRegisterInput(username, email, password);
	if (errors.length) return res.status(400).json({ errors });

	try {
		// Cek duplikasi email
		const existingEmail = await UserModel.findByEmail(email);
		if (existingEmail)
			return res.status(409).json({ error: "Email sudah terdaftar" });

		// Cek duplikasi username
		const existingUsername = await UserModel.findByUsername(username);
		if (existingUsername)
			return res.status(409).json({ error: "Username sudah digunakan" });

		const salt = await bcrypt.genSalt(12);
		const hashed = await bcrypt.hash(password, salt);
		const user = await UserModel.create(username, email, hashed, "user");

		res.status(201).json({
			message: "Registrasi berhasil",
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (err) {
		console.error("Register error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
