const knex = require("knex")(require("../knexfile"));

const register = async (_req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
		res.status(200).send("This is the POST /user/register endpoint");
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

const login = async (_req, res) => {
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
