/**
 * Validasi input untuk registrasi user baru.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {string[]} Array error messages (kosong jika valid)
 */
function validateRegisterInput(username, email, password) {
	const errors = [];

	if (!username || typeof username !== "string" || username.trim().length < 3)
		errors.push("Username minimal 3 karakter");

	if (username && username.trim().length > 50)
		errors.push("Username maksimal 50 karakter");

	// Hanya boleh huruf, angka, underscore, dan titik
	if (username && !/^[a-zA-Z0-9_.]+$/.test(username.trim()))
		errors.push("Username hanya boleh mengandung huruf, angka, underscore, dan titik");

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || !emailRegex.test(email))
		errors.push("Email tidak valid");

	if (!password || password.length < 6)
		errors.push("Password minimal 6 karakter");

	if (password && password.length > 128)
		errors.push("Password maksimal 128 karakter");

	return errors;
}

/**
 * Validasi input untuk login.
 * @param {string} email
 * @param {string} password
 * @returns {string[]} Array error messages (kosong jika valid)
 */
function validateLoginInput(email, password) {
	const errors = [];
	if (!email) errors.push("Email harus diisi");
	if (!password) errors.push("Password harus diisi");
	return errors;
}

module.exports = { validateRegisterInput, validateLoginInput };
