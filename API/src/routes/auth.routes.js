
const express = require('express')
const router = express.Router()
// const User = require('../models/user.model');
const auth = require('../controllers/auth.controller');
// const ObjectId = mongoose.Types.ObjectId;

router.post('/login', auth.authLogin);


// router.get('/', async (req, res, next) => { 

//     try {
//         const tasks = await Task.find();
//         // console.log('<tasks>', tasks);

//         res.status(200).json(tasks)


//     } catch (error) {
//         res.status(500).json({ message: error })
//     }
// })

module.exports = router