const login = require("./login");
const logout = require("./logout");

const mine = (app)=>{
	app.use('/login', login);
	app.use('/logout', logout);
}

module.exports = mine;
