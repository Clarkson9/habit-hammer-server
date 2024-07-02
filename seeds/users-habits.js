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
		{ id: 2, first_name: "John", email: "doe@gmail.com", password: "testtest" },
	]);
	await knex("habit").insert([
		{
			id: 1,
			user_id: 1,
			habit_name: "Do 50 push-ups",
			habit_why: "Look better, feel better",
			streak: 9,
			progress: 80,
		},
		{
			id: 2,
			user_id: 1,
			habit_name: "Make bed",
			habit_why: "Admiral William McRaven",
			streak: 0,
			progress: 0,
		},
		{
			id: 3,
			user_id: 2,
			habit_name: "Take at least 6,000 steps",
			habit_why: "Improve overall health",
			streak: 64,
			progress: 64,
		},
		{
			id: 4,
			user_id: 2,
			habit_name: "Stretch for at least 30 minutes a day",
			habit_why: "Improve overall health",
			streak: 11,
			progress: 55,
		},
	]);
};
