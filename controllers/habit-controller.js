const knex = require("knex")(require("../knexfile"));

const getHabitList = async (req, res) => {
	// Header id used to specify which user's habits to retrieve
	const { id } = req.headers;

	try {
		const habitList = await knex("habit")
			.select("id", "habit_name", "habit_why", "streak", "progress")
			.where({ user_id: id });
		return res.status(200).json(habitList);
		// res.status(200).send("This is the GET /habit endpoint");
	} catch (error) {
		console.error("Error getting habit list:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const addHabit = async (req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
		res.status(200).send("This is the POST /habit endpoint");
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

const editHabit = async (req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
		res.status(200).send("This is the PUT /habit/:id endpoint");
	} catch (err) {
		// res.status(400).send(`Error retrieving Users: ${err}`);
	}
};

const deleteHabit = async (req, res) => {
	try {
		// const data = await knex("user");
		// res.status(200).json(data);
		res.status(200).send("This is the DELETE /habit/:id endpoint");
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
