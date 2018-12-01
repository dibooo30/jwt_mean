const jwt = require('jsonwebtoken');
const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

module.export = jwtMedilwear = function(req, res, next) {
    const authString = req.headers.authorization;

    if (typeof authString === "string" && authString.indexOf(' ') > -1) {
        const authArray = authString.split(' ');
        const token = authArray[1];
        jwt.verify(token, serverJWT_Secret, (err, decoded) => {
            if (err) {
                res.json(err);
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        res.json('user not logeded in');  
    }
    
}