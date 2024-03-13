const express = require('express')
_ = require('underscore')
require('dotenv').config()

const app = express()

const path = require('path')

express.static(path.join(__dirname, "public"))

const bodyParser = require('body-parser')

// For while data pass on raw query
// app.use(bodyParser({
//     extended: true
// }))

// For while data pass on body parser
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');
app.set('views', 'views');

// database connect
const { sequelize } = require('./config/database');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// routing path
// Admin Router 
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter)

// User Router
const userRouter = require('./routes/userRoute')
app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log(`my server is running at http://127.0.0.1:${process.env.PORT}`);
})