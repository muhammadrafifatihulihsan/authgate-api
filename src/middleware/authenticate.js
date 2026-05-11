const { verifyAccessToken } = require("../utils/tokenUtils");

module.exports = (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer "))
		return res.status(401).json({ error: "Token tidak ditemukan" });

	const token = header.split(" ")[1];
	if (!token)
		return res.status(401).json({ error: "Format token tidak valid" });

	try {
		req.user = verifyAccessToken(token);
		next();
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Token sudah kadaluarsa" });
		}
		res.status(403).json({ error: "Token tidak valid" });
	}
};
