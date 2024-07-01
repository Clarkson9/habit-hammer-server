const router = require("express").Router();
const habitController = require("../controllers/habit-controller");

router
	.route("/")
	.get(habitController.getHabitList)
	.post(habitController.addHabit);

router
	.route("/:id")
	.get(habitController.editHabit)
	.post(habitController.deleteHabit);

module.exports = router;
