const setToken = (res, status)=>{
	res.cookie('token', status, { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
}

exports.setAuth = (res)=>{
	setToken(res, true);
}
exports.clearAuth =(res)=>{
	setToken(res, false);
}

exports.requireAuth =(req, res, next)=>{
	console.log(req.signedCookies)
	if(req.signedCookies.token === 'true'){
		next();
	}else{
		res.status(401).end();
	}
}
