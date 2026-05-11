const jwt = require("jsonwebtoken");

/**
 * Generate access token (short-lived).
 * Payload berisi: id, email, role.
 */
exports.generateAccessToken = (user) =>
	jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		process.env.JWT_ACCESS_SECRET,
		{ expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" },
	);

/**
 * Generate refresh token (long-lived).
 * Payload berisi: id, email, role.
 */
exports.generateRefreshToken = (user) =>
	jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		process.env.JWT_REFRESH_SECRET,
		{ expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" },
	);

/**
 * Verifikasi access token.
 * @throws {JsonWebTokenError|TokenExpiredError}
 */
exports.verifyAccessToken = (token) =>
	jwt.verify(token, process.env.JWT_ACCESS_SECRET);

/**
 * Verifikasi refresh token.
 * @throws {JsonWebTokenError|TokenExpiredError}
 */
exports.verifyRefreshToken = (token) =>
	jwt.verify(token, process.env.JWT_REFRESH_SECRET);
