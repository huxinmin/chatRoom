const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const messages = require('../../utils/messages')

/* GET home page. */
router.post('/', auth.requireAuth, function(req, res, next) {
	db.setOffline(req.signedCookies.uid);
	auth.clearAuth(res);
 	res.end();
});

module.exports = router;
