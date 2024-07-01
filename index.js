const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT = 8080, CORS_ORIGIN = "http://localhost:3000" } = process.env;

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

app.listen(PORT, () => {
	console.log("Server is listening on port " + PORT);
});
