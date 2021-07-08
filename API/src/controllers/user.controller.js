// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');

// //token para autenticar
// const authLogin = async(req,res, next)=>{
//     const {email, password, role} = req.body;

//     try {
//         const user = await User.login(email, password, role);
//         const data = {
//             id: user._id,
//             user: user.email,
//             role: user.role
//         };

//         //crear token
//         const token = createToken(data);
//         res.status(200).json({ token: token})

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error });
//     }

// }

// //const maxExpire = 3 * 24 * 60 * 60;
// //const secret = 'este es el secreto';


// const createToken = (data) => {
//     return jwt.sign(
//         { ...data},
//         secret,
//         { expiresIn: maxExpire})
// };

// module.exports = {authLogin}

// const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { createToken } = require('./utils');

// Generamos el token al autenticar
const authLogin = async (req, res, next)=>{
    const { email, password } = req.body;
// console.log('--email, password---', email, password)
    try {
        const user = await User.login(email, password);
        // console.log(user);
        const data = {
            id: user._id,
            user: user.email
        };
        // Llamamos a la función para crear el token
        const token = createToken(data);

        //Add header custom
        res.header('bearer', [`${token}`])

        res.status(200).json({ token: token, id: user._id})


    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = { authLogin }