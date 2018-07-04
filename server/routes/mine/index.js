const login = require("./login");
const logout = require("./logout");
const home = require("./home");

const mine = (app)=>{
	app.use('/login', login);
	app.use('/logout', logout);
	app.use('/home', home);
}

module.exports = mine;
