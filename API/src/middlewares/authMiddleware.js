const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { maxExpire, secret } = require('../controllers/utils')

const checkToken = (req, res, next)=>{
    const { authorization } =  req.headers;
    console.log('AUTH-MIDL', authorization);

    if(authorization){

        jwt.verify(authorization, secret, (er, decodeToken)=>{

            console.log('--DECODE-TOKEN--' ,decodeToken);
        })
    }


    next();
}


module.exports = { checkToken }