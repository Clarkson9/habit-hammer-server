const router = require("express").Router();
const habitController = require("../controllers/habit-controller");

router
	.route("/")
	.get(habitController.getHabitList)
	.post(habitController.addHabit);

router
	.route("/:id")
	.put(habitController.editHabit)
	.delete(habitController.deleteHabit);

router.route("/:id/complete").put(habitController.completeHabit);

module.exports = router;
