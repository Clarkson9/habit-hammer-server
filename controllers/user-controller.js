const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	const { first_name, email, password, password_confirm } = req.body;

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
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
		res.status(200).send("This is the POST /user/login endpoint");
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

module.exports = {
	register,
	login,
};
