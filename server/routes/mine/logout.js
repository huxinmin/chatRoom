const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const messages = require('../../utils/messages')

/* GET home page. */
router.post('/', auth.requireAuth, function(req, res, next) {
	db.setOffline(req.body.username);
	auth.clearAuth(res);
 	res.json({messages:messages.logoutSuccess});
});

module.exports = router;
