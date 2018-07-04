const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');

/* GET home page. */
router.get('/',auth.requireAuth, function(req, res, next) {
	const users = db.getAllUsers();
	const rooms = db.getAllRooms();
	res.json({ users:users, rooms:rooms})
});

module.exports = router;