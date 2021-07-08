
const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.model');
const Pages = require('../models/rolesPages.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



router.get('/', async (req, res, next) => { 

    try {
        const profiles = await Profile.find();
        // profiles.populate('roles_pages');

        res.status(200).json(profiles)

            // .populate('roles_pages', 'pageText')
            // .sort({ name: -1 })
            // .lean()
            // .exec( (err, profiles)=>{
            //     console.log('=====profiles===', profiles)                
            //     return res.status(200).json(profiles)

            // });
        // res.status(200).json(profiles)


    } catch (error) {
        console.log('--error--', error)
        res.status(500).json({ message: error })
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        // const profiles = await Profile.findById({_id: id})
        //     .populate('roles_pages')
        //     .lean()
        //     .exec();

        const profiles = await Profile.findById({_id: id});
        profiles.populate('roles_pages');

        res.status(200).json(profiles)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/', async (req, res, next) => { 

    try{

        const newProfile = new Profile(req.body);
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile)
        
    } catch (error) {
        console.log('---error--', error)
        res.status(500).json({ message: error })
    }

});


router.put('/', async (req, res, next) => { 

    try{

        // const newProfile = new Profile(req.body);
        // const savedProfile = await newProfile.save();

        // const { _id } = req.params;
        const { _id, page } = req.body;
        const profileUpdated = await Profile.findByIdAndUpdate(
        _id,
        {
            $push: { pages: page },
        },
        { useFindAndModify: false }
        );


        res.status(201).json(profileUpdated)
        
    } catch (error) {
        console.log('---error--', error)
        res.status(500).json({ message: error })
    }

});

// router.post('/', async (req, res, next) => { 

//     try {
//         console.log('--req.body-', req.body);
//         const { name, idPage} = req.body;
//         const pages = new Pages({
//             _id : (idPage.toString())
//         });
        
//         console.log('--roles_pages--', roles_pages);


//         const newProfile = { 
//             name: name.toString(),
//             pages: roles_pages._id
//             // [Schema.Types.ObjectId(idPage.toString())],
//         };
//         console.log('--newProfile--',newProfile);
        
//         const profile = new Profile({...newProfile});
//         const saveProfile = await profile.save(); 
//         console.log('--saveProfile--',saveProfile);

//         const profiles = await Profile.find({name})
//             .populate('roles_pages')
//             .lean()
//             .exec();
//         // const profiles = await Profile.findOne({email:req.body.email}).populate('roles_pages');
//         res.status(200).json(profiles)

//     } catch (error) {
//         console.log('---error--', error)
//         res.status(500).json({ message: error })
//     }
// });


module.exports = router