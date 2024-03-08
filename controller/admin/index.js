const sequelize = require('../../config/database');

class adminController {
    async homePage (req,res){
        try{
            res.render('test',{
                title:'homePage'

            })
        } catch (error) {
            throw error
        }
    }
    
}

module.exports = new adminController()

// const homePage = async ((req,res)=>{
//     try{
//         res.render(test,{
//             msg:'homePage'
//         })

//     }catch(error){
//         throw error
//     }

// })

// module.exports = {
//     homePage
// }