const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

const register = async (req, res) => {
	const { first_name, email, password, password_confirm } = req.body;

	const checkEmail = await knex("user").where({ email: email });
	if (checkEmail.length > 0) {
		return res.status(409).send("That email already exists.");
	}

	if (password != password_confirm) {
		return res.status(400).send("Passwords do not match.");
	}

	const hash = await bcrypt.hash(password, 10);

	// Passed validation, create new user
	const newUser = {
		first_name,
		email,
		password: hash,
	};

	try {
		let result = await knex("user").insert(newUser);
		const newUserId = result[0];

		let token = jwt.sign({ userId: newUserId }, JWT_KEY);
		res.status(201).json({ token });
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new user: ${error}`,
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const hash = await knex("user")
		.select("password")
		.where({ email: email })
		.first();

	if (!hash) {
		return res.status(400).send(`No user found with email ${email}`);
	}

	const { password: hashedPassword } = hash;
	const isValid = await bcrypt.compare(password, hashedPassword);

	if (!isValid) {
		return res.status(400).send("Wrong password");
	}

	try {
		const userId = await knex("user")
			.select("id")
			.where({ email: email })
			.first();
		const { id } = userId;

		let token = jwt.sign({ userId: id }, JWT_KEY);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({
			message: `Unable to find user: ${error}`,
		});
	}
};

module.exports = {
	register,
	login,
};
