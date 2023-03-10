const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// TODO: import authentication middleware:
const {
	rejectUnauthenticated,
} = require(`../modules/authentication-middleware`);

/**
 * TODO: Get all of the items on the shelf:
 */
router.get("/", (req, res) => {
	const queryText = `SELECT * FROM "item";`;

	pool.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((err) => {
			console.log("Error with GET shelf in router", err);
			res.sendStatus(500);
		});
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
	const query = `
  INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3)`;

	params = [req.body.description, req.body.image_url, req.user.id];

	// FIRST QUERY MAKES MOVIE
	pool.query(query, params)
		.then(() => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});

/**
 * Delete an item if it's something the logged in user added
 */
// payload is the item id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
	// endpoint functionality

	queryText = `DELETE FROM "item" WHERE "id" = $1 AND user_id = $2`;
	queryParams = [req.params.id, req.user.id];

	pool.query(queryText, queryParams)
		.then(() => {
			res.sendStatus(204);
		})
		.catch((error) => {
			console.log("Delete failed in server", error);
		});
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
	// endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
	// endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
	// endpoint functionality
});

module.exports = router;
