const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	const { first_name, email, password, password_confirm } = req.body;

	// ***** add check if email already exists in db *****

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
		const result = await knex("user").insert(newUser);

		// Maybe come back and add JWT auth

		res.status(201).send("New user successfully created.");
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
	const { password: hashedPassword } = hash;

	if (!hash) {
		return res.status(400).send(`No user found with email ${email}`);
	}

	const isValid = await bcrypt.compare(password, hashedPassword);

	if (!isValid) {
		return res.status(400).send("Wrong password");
	}

	try {
		res.status(200).send("This is the POST /user/login endpoint");
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new user: ${error}`,
		});
	}
};

module.exports = {
	register,
	login,
};
