const knex = require("knex")(require("../knexfile"));

const getHabitList = async (req, res) => {
	// Get userId from jwt token
	const { userId } = req.decoded;

	try {
		const habitList = await knex("habit")
			.select("id", "habit_name", "habit_why", "streak", "progress")
			.where({ user_id: userId });
		return res.status(200).json(habitList);
	} catch (error) {
		console.error("Error getting habit list:", error);
		res.status(500).json({
			message: `Unable to get habit list: ${error}`,
		});
	}
};

const addHabit = async (req, res) => {
	// Get userId from jwt token
	const { userId } = req.decoded;
	const { habit_name, habit_why } = req.body;

	// Verify that all expected req.body keys are present (all fields are required)
	const reqBodyKeys = Object.keys(req.body);

	if (
		!reqBodyKeys.includes("habit_name") ||
		!reqBodyKeys.includes("habit_why")
	) {
		return res
			.status(400)
			.send("Failed to create new habit. All form fields are required.");
	}

	// ************ REVISIT THE ABOVE VALIDATION LATER ************

	// Passed validation, create new habit
	const newHabit = {
		user_id: userId,
		habit_name,
		habit_why,
	};

	try {
		const result = await knex("habit").insert(newHabit);

		const newHabitId = result[0];
		const createdHabit = await knex("habit").where({
			id: newHabitId,
		});

		res.status(201).json(createdHabit);
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new warehouse: ${error}`,
		});
	}
};

const editHabit = async (req, res) => {
	const { id } = req.params;
	const {
		habit: { name, why },
	} = req.body;

	// Verify that all expected req.body keys are present (all fields are required)
	const reqBodyKeys = Object.keys(req.body.habit);

	if (!reqBodyKeys.includes("name") || !reqBodyKeys.includes("why")) {
		return res
			.status(400)
			.send("Failed to create new habit. All form fields are required.");
	}

	// ************ REVISIT THE ABOVE VALIDATION LATER ************
	// ******* add and edit habit can share validation --> factor out logic *******

	// Passed validation, create new habit object
	const newHabit = {
		habit_name: name,
		habit_why: why,
	};

	// Update habit after validation
	try {
		const rowsUpdated = await knex("habit").where({ id: id }).update(newHabit);

		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `Habit with ID "${id}" not found`,
			});
		}

		const updatedHabit = await knex("habit").where({
			id: id,
		});
		res.json(updatedHabit);
	} catch (error) {
		res.status(500).json({
			message: `Unable to update habit with ID ${id}`,
		});
	}
};

const deleteHabit = async (req, res) => {
	const { id } = req.params;

	try {
		const rowsDeleted = await knex("habit").where({ id: id }).delete();

		if (rowsDeleted === 0) {
			return res
				.status(404)
				.json({ message: `Record with ID: ${req.params.id} not found` });
		}

		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({
			message: `Unable to delete habit: ${error}`,
		});
	}
};

const completeHabit = async (req, res) => {
	try {
		const rowsUpdated = await knex("habit")
			.where({ id: req.params.id })
			.increment({ streak: 1, progress: 1 })
			.update({ last_complete: knex.fn.now() });

		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `Habit with ID "${habit_id}" not found`,
			});
		}

		const updatedHabit = await knex("habit").where({
			id: req.params.id,
		});
		res.json(updatedHabit);
	} catch (error) {
		res.status(500).json({
			message: `Unable to complete habit: ${error}`,
		});
	}
};

module.exports = {
	getHabitList,
	addHabit,
	editHabit,
	deleteHabit,
	completeHabit,
};
