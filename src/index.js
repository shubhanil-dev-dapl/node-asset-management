const express = require('express')
_ = require('underscore')
require('dotenv').config()
// // For Swagger
// const swaggerJSDoc = require('swagger-jsdoc');

// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('../src/swagger/swagger');
// const swaggerDocument = require('../src/swagger/swagger.yaml');

const app = express()
const path = require('path')
const port = process.env.PORT || 3000

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

// Swagger UI endpoint
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
// Serve Swagger documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routing path
// Admin Router 
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter)

// User Router
const userRouter = require('./routes/userRoute')
app.use('/api', userRouter)


app.listen(port, () => {
    console.log(`my server is running at 'http://localhost:${port}`);
})