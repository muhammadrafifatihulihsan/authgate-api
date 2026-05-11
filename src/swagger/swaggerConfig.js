const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "AuthGate API",
			version: "1.0.0",
			description:
				"REST API Autentikasi dan Manajemen User dengan JWT (Access & Refresh Token). Dibangun dengan Node.js, Express, dan MySQL.",
			contact: {
				name: "Muhammad Rafi Fatihul Ihsan",
				email: "muhammadrafifatihulihsan@gmail.com",
			},
			license: {
				name: "ISC",
			},
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3000}`,
				description: "Development server",
			},
		],
		components: {
			securitySchemes: {
				BearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
					description: "Masukkan access token JWT (tanpa prefix 'Bearer')",
				},
			},
			schemas: {
				RegisterRequest: {
					type: "object",
					required: ["username", "email", "password"],
					properties: {
						username: { type: "string", example: "rafi123", minLength: 3, maxLength: 50 },
						email: { type: "string", format: "email", example: "rafi123@mail.com" },
						password: { type: "string", example: "secret123", minLength: 6, maxLength: 128 },
					},
				},
				LoginRequest: {
					type: "object",
					required: ["email", "password"],
					properties: {
						email: { type: "string", format: "email", example: "admin@authgate.com" },
						password: { type: "string", example: "admin123" },
					},
				},
				RefreshRequest: {
					type: "object",
					required: ["refreshToken"],
					properties: {
						refreshToken: { type: "string", example: "eyJhbGci..." },
					},
				},
				UpdateProfileRequest: {
					type: "object",
					properties: {
						username: { type: "string", example: "rafi_new", minLength: 3, maxLength: 50 },
						email: { type: "string", format: "email", example: "rafi_new@mail.com" },
						password: { type: "string", example: "newpassword123", minLength: 6 },
					},
				},
				UserResponse: {
					type: "object",
					properties: {
						id: { type: "integer", example: 1 },
						username: { type: "string", example: "rafi123" },
						email: { type: "string", example: "rafi123@mail.com" },
						role: { type: "string", enum: ["user", "admin"], example: "user" },
						created_at: { type: "string", format: "date-time" },
						updated_at: { type: "string", format: "date-time" },
					},
				},
				ErrorResponse: {
					type: "object",
					properties: {
						error: { type: "string", example: "Internal server error" },
						errors: {
							type: "array",
							items: { type: "string" },
							example: ["Email tidak valid", "Password minimal 6 karakter"],
						},
					},
				},
				SuccessResponse: {
					type: "object",
					properties: {
						message: { type: "string", example: "Operasi berhasil" },
					},
				},
			},
		},
		security: [],
	},
	apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
