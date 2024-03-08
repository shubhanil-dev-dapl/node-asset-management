const router = require('express').Router()
const userController = require('../controller/user.controller')


router.get('/',(req,res)=>{
    try{
        res.json({
            msg:"success",
            status:200,
            
        })

    }catch(error){
        throw error
    }

})
router.post('/register',userController.register)


module.exports = router