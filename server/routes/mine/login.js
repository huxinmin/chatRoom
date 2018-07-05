const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const messages = require('../../utils/messages');
const _ = require("lodash");

/* GET home page. */
router.post('/', function(req, res, next) {
	const mine = _.omit(db.findUserByName( req.signedCookies.uid),["password"]);
	if (mine && mine.password === req.body.password) {
		auth.setAuth(res);
		auth.setUid(res, req.body.username);
		res.json({ auth:true, mine:mine, message:messages.loginSuccess})
	} else {
		res.json({ auth: false, message: messages.loginFail});
	}
});

module.exports = router;
