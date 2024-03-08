const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

// User registration
// User registration
// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

// User login
// router.post('/login', async (req, res) => {

// });

// register
// const register = async((res, req) => {
//     try {
//         const {
//             username,
//             password
//         } = req.body;
//         const hashedPassword =  await bcrypt.hash(password, 10);
//         const user = new User({ username, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

// login
// const login = async((res, req) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(401).json({ error: 'Authentication failed' });
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ error: 'Authentication failed' });
//         }
//         const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
//             expiresIn: '1h',
//         });
//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ error: 'Login failed' });
//     }
// });

// module.exports = {
//     login, register
// }

// class apiController {
//     async register (req,res) {
//         try{
//             const {
//                 name,
//                 email,
//                 mobileno,
//                 password
//             } = req.body

//             const hashedPassword = await bcrypt.hashSync(password)
//         }catch(error){
//             throw error
//         }

//     }

// }
// module.exports = new apiController()

const register =  async (req,res)=>{
    try{
        const {
            name,
            email,
            password
        } = req.body

        const hashedPassword = await bcrypt.hashSync(password)
        const user  = new User({
           name,
           email,
           password:hashedPassword 
        })
        await user.save()
        return res.json({
            status:200,
            title:'success',
            msg:req.body
        })
    }catch(error){
        throw error
    }

}
module.exports = {
    register
}

const abc = (()=>{

})