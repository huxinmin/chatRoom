const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const messages = require('../../utils/messages')

/* GET home page. */
router.post('/', function(req, res, next) {
	const mine = db.findUserByName( req.body.username);
	if (mine && mine.password === req.body.password) {
		const users = db.getAllUsers();
		const rooms = db.getAllRooms();
		auth.setAuth(res);
		res.json({ auth:true, mine:mine, users:users, rooms:rooms, message:messages.loginSuccess})
	} else {
		res.json({ auth: false, message: messages.loginFail});
	}
});

module.exports = router;
