const login = require("./login");
const logout = require("./logout");
const home = require("./home");
const register = require("./register");

const mine = (app)=>{
	app.use('/login', login);
	app.use('/logout', logout);
	app.use('/home', home);
	app.use('/register', register);
}

module.exports = mine;
