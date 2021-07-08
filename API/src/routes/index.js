const express = require('express')
const router = express.Router()


router.use('/api/auth', require('./auth.routes'))
router.use('/api/users', require('./users.routes'))
router.use('/api/organizations', require('./organizations.routes'))
router.use('/api/pages', require('./pages.routes'))
router.use('/api/profile', require('./profile.routes'))


module.exports = router 