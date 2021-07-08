
const express = require('express')
const router = express.Router()
const User = require('../models/user.model');
const Organization = require('../models/rolesOrganization.model');

const customErrors = (err) => {
    let errors = { name:'', email:'',password:'' };
    if (err.message.includes('Users validation failed:')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

router.get('/', async (req, res, next) => { 

    try {
        // const users = await User.find()
        //     .populate('Organization')
        //     .lean()
        //     .exec();

        User.find()
            .populate('organization')
            // .populate({ path: 'Organization', select: 'name' })
            .lean()
            .exec( (err, users)=>{
                console.log('=====users===', users)
                // console.log('=====users===', users.organization.name)
                
                return res.status(200).json(users)

            });

        // res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
// {
//   _id : ObjectId("5f408c5aa62915b7977d6e75")
// }
    try {
        const users = await User.findById({_id: id})
            .populate('organization')
            .lean()
            .exec();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


router.post('/', async (req, res, next) => { 

    const { name, email, password, idOrganization} = req.body;
    const organization = new Organization({
        _id :  (idOrganization.toString())
    });

    try{

        const user = await User.create({
            name: name,
            email: email,
            password:  password,
            fechaNacimiento: '',
            sexo: '',
            tipoVivienda: '',
            usoVehiculo: '',
            organization: organization._id,
        });
        res.status(201).json(user)

    } catch (error) {
        console.log(`
            error message: ${error.message}
            error code: ${error.code}
        `)
        let errors = customErrors(error);
        res.status(400).json({ errors });

        // const errors = customErrors(error);
        // res.status(400).json({ errors })
    }

});
// router.post('/', async (req, res, next) => { 

//     try {
//         console.log('--req.body-', req.body);
//         const { name, email, password, idOrganization} = req.body;
//         const organization = new Organization({
//             _id :  (idOrganization.toString())
//         });
        
//         console.log('--organization--', organization);


//         const newUser = { 
//             name: name.toString(),
//             email: email.toString(),
//             password:  password.toString(),
//             fechaNacimiento: '',
//             sexo: '',
//             tipoVivienda: '',
//             usoVehiculo: '',
//             organization: organization._id,
//         };
//         console.log('--newUser--',newUser);
        
//         const task = new User({...newUser});
//         const saveUser = await task.save(); 
//         console.log('--saveUser--',saveUser);

//         const users = await User.find({email})
//             .populate('organization')
//             .lean()
//             .exec();
//         // const users = await User.findOne({email:req.body.email}).populate('Organization');
//         res.status(201).json(users)

//     } catch (error) {
//         console.log(`
//         error message: ${error.message}
//         error code: ${error.code}
//         `)

//         res.status(500).json({ message: error })
//     }
// });


module.exports = router