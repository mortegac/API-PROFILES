
const express = require('express')
const router = express.Router()
const Pages = require('../models/rolesPages.model');

router.get('/', async (req, res, next) => { 

    try {
        const pages = await Pages.find();
        res.status(200).json(pages)
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const pages = await Pages.findById({_id: id});
        res.status(200).json(pages)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router