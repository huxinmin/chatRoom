var home = require("./home");
var upload = require("./upload");
var register = require("./register");
var login = require("./login");
var logout = require("./logout");
var download = require("./download");
var middleware = require("./middleware");

exports = module.exports = function(app){
	app.all('*', middleware.initLocals);
	app.use('/', home);
	app.use('/login', login);
	app.use('/register', register);
	app.use('/logout', middleware.requireLogin, logout);
	app.use('/upload', middleware.requireLogin, upload);
	app.use('/download', middleware.requireLogin, download);
}
