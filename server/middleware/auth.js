const setToken = (res, status)=>{
	res.cookie('token', status, { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
}

exports.setUid = (res, status)=>{
	res.cookie('uid', status, { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
}

exports.setAuth = (res)=>{
	setToken(res, true);
}
exports.clearAuth =(res)=>{
	setToken(res, false);
}

exports.requireAuth =(req, res, next)=>{
	console.log("req.signedCookies")
	console.log(req.signedCookies)
	if(req.signedCookies.token === 'true' && req.signedCookies.uid){
		next();
	}else{
		res.status(401).end();
	}
}
