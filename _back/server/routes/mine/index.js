const login = require("./login");
const logout = require("./logout");
const home = require("./home");
const register = require("./register");

const mine = (app)=>{
	app.use('/server/login', login);
	app.use('/server/logout', logout);
	app.use('/server/home', home);
	app.use('/server/register', register);
}

module.exports = mine;
