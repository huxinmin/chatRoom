const login = require("./login");
const logout = require("./logout");

const mine = (app)=>{
	app.use('/mine/login', login);
	app.use('/mine/logout', logout);
}

module.exports = mine;
