var login = require("./login");

exports = module.exports = function(app){
	app.use('/login', login);
}
