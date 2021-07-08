
const express = require('express')
const router = express.Router()
const Organization = require('../models/rolesOrganization.model');

router.get('/', async (req, res, next) => { 

    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations)
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const organizations = await Organization.findById({_id: id});
        res.status(200).json(organizations)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router