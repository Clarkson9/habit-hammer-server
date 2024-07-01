const knex = require("knex")(require("../knexfile"));

const getHabitList = async (_req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

const addHabit = async (req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

const editHabit = async (req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

const deleteHabit = async (req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

module.exports = {
	getHabitList,
	addHabit,
	editHabit,
	deleteHabit,
};
