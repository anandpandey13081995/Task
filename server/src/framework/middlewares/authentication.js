const jwt = require('jsonwebtoken');

function authUser(req, res, next){
    const authHeader = req.cookies.authorization;
    
    if(!authHeader) return res.sendStatus(401);

    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    authUser,
}