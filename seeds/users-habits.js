/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("habit").del();

	// Insert seed data
	await knex("user").insert([
		{ id: 1, first_name: "Alex", email: "test@gmail.com", password: "test" },
	]);
	await knex("habit").insert([
		{
			id: 1,
			habit_name: "Do 50 push-ups",
			habit_why: "Look better, feel better",
			streak: 9,
			progress: 80,
		},
		{
			id: 2,
			habit_name: "Make bed",
			habit_why: "Admiral William McRaven",
			streak: 0,
			progress: 0,
		},
	]);
};
