const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const _ = require("lodash");

/* GET home page. */
router.get('/',auth.requireAuth, function(req, res, next) {
	const users = db.getAllUsers();
	const rooms = db.getAllRooms();
	const mine = _.omit(db.findUserByName( req.signedCookies.uid),["password"]);
	res.json({ mine:mine, users:users, rooms:rooms})
});

module.exports = router;
