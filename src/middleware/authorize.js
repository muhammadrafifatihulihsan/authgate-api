/**
 * Middleware otorisasi berbasis role.
 * Harus dipanggil SETELAH middleware authenticate.
 * @param  {...string} roles  - Role yang diizinkan (misal: 'admin', 'user')
 */
module.exports =
	(...roles) =>
	(req, res, next) => {
		if (!req.user || !roles.includes(req.user.role))
			return res.status(403).json({ error: "Anda tidak memiliki izin untuk mengakses resource ini" });
		next();
	};
