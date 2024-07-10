const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
	PORT = 8080,
	CORS_ORIGIN = "http://localhost:3000",
	JWT_KEY,
} = process.env;

function authorize(req, res, next) {
	const token = req.headers.authorization.split(" ")[1];

	if (token) {
		// console.log("Auth Token:", token);
		try {
			const payload = jwt.verify(token, JWT_KEY);
			req.decoded = payload;
			// console.log(req.decoded);
			next();
		} catch (error) {
			res.sendStatus(401).json({ error: "Invalid token." });
		}
	} else {
		res.sendStatus(403).json({ error: "No token. Unauthorized." });
	}
}

/**
 * General Purpose Middleware
 */
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

/**
 * Basic route to test and verify server connection
 */
app.get("/", (_req, res) => {
	res.send("Server is live on PORT: " + PORT);
});

/**
 * Route API calls
 */
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const habitRoutes = require("./routes/habit");
app.use("/habit", authorize, habitRoutes);

app.listen(PORT, () => {
	console.log("Server is listening on port " + PORT);
});
