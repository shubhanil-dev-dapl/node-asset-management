const router = require('express').Router()
const adminControler = require('../../controller/admin/index')
router.get('/', adminControler.homePage)
module.exports = router