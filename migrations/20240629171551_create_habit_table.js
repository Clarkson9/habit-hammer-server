/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("habit", (table) => {
		table.increments("id").primary();
		table
			.integer("user_id")
			.unsigned()
			.references("user.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.string("habit_name").notNullable();
		table.string("habit_why").notNullable();
		table.integer("streak").unsigned().defaultTo(0);
		table.integer("progress").unsigned().defaultTo(0);
		table.timestamp("last_complete").nullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("habit");
};
