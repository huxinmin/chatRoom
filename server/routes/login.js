const express = require('express');
const router = express.Router();
const db = require("../middleware/db");

/* GET home page. */
router.post('/', function(req, res, next) {
	var user = db.findUserByName( req.body.username);
	res.json(user)
	if (user && user.password === req.body.password) {
				
		} else {
			
	}
});

module.exports = router;
