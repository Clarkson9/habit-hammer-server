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
		res.status(500).json({
			message: `Unable to get habit list: ${error}`,
		});
	}
};

const addHabit = async (req, res) => {
	// Header id used to identify a specific user
	const { id } = req.headers;
	const { habit_name, habit_why } = req.body;

	// Verify id is present in req.headers
	if (!id) {
		return res
			.status(400)
			.send("Failed to create new habit. No user id found in request header.");
	}

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
		user_id: id,
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
	// Header id used to identify a specific user
	const { id } = req.headers;
	const {
		id: habit_id,
		habit: { name, why },
	} = req.body;

	// Verify id is present in req.headers
	if (!id) {
		return res
			.status(400)
			.send("Failed to create new habit. No user id found in request header.");
	}

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
		const rowsUpdated = await knex("habit")
			.where({ id: habit_id })
			.update(newHabit);

		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `Habit with ID "${habit_id}" not found`,
			});
		}

		const updatedHabit = await knex("habit").where({
			id: habit_id,
		});
		res.json(updatedHabit);
	} catch (error) {
		res.status(500).json({
			message: `Unable to update habit with ID ${habit_id}`,
		});
	}
};

const deleteHabit = async (req, res) => {
	try {
		const rowsDeleted = await knex("habit")
			.where({ user_id: req.headers.id })
			.where({ id: req.params.id })
			.delete();

		if (rowsDeleted === 0) {
			return res
				.status(404)
				.json({ message: `Record with ID: ${req.params.id} not found` });
		}

		res.sendStatus(204);

		// res.status(200).send("This is the DELETE /habit/:id endpoint");
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
