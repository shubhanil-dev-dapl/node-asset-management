const router = require('express').Router()
const userController = require('../controller/frontend/index')

router.get('/',userController.listingPage)


module.exports = router