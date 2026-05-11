const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");

module.exports = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = await UserModel.findById(req.user.id);
		if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

		let hashed = user.password;
		if (password) {
			if (password.length < 6)
				return res.status(400).json({ error: "Password minimal 6 karakter" });
			hashed = await bcrypt.hash(password, await bcrypt.genSalt(12));
		}

		// Cek duplikasi email jika email diubah
		if (email && email !== user.email) {
			const existingEmail = await UserModel.findByEmail(email);
			if (existingEmail)
				return res.status(409).json({ error: "Email sudah digunakan oleh user lain" });
		}

		// Cek duplikasi username jika username diubah
		if (username && username !== user.username) {
			const existingUsername = await UserModel.findByUsername(username);
			if (existingUsername)
				return res.status(409).json({ error: "Username sudah digunakan oleh user lain" });
		}

		// User biasa TIDAK boleh mengubah role sendiri
		await UserModel.update(
			req.user.id,
			username || user.username,
			email || user.email,
			hashed,
			user.role,  // role tetap, tidak bisa diubah oleh user
		);

		res.json({ message: "Profil berhasil diperbarui" });
	} catch (err) {
		console.error("Update profile error:", err);
		res.status(500).json({ error: "Gagal update profil" });
	}
};
