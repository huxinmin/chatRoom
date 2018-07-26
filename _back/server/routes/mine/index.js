const login = require("./login");
const logout = require("./logout");
const home = require("./home");
const register = require("./register");
const upload = require("./upload");

const mine = (app)=>{
	app.use('/server/login', login);
	app.use('/server/logout', logout);
	app.use('/server/home', home);
	app.use('/server/register', register);
	app.use('/server/upload', upload);
}

module.exports = mine;
