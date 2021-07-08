// module.exports.maxExpire = 3 * 24 *60 * 60;   // Expiración en 24 horas
// module.exports.secret = 'este es mi super secreto';


const jwt = require('jsonwebtoken');

const maxExpire = 3 * 24 *60 * 600;   // Expiración en 24 horas
const secret = 'este es mu super secreto';

const createToken = (data) => {
    console.log('secret', secret, "expiresIn:", maxExpire);
    return jwt.sign(
        { ...data }, 
        secret,
        { expiresIn: maxExpire })
}

module.exports = { secret, createToken }
