require('dotenv').config()
const express = require('express');
// const app = express();
const session = require('express-session');
const passport = require('passport');
const passportInit = require('./utils/passportConfig.js')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const mongoose = require('mongoose');
const multer = require('multer');
const landingRouter = require('./routes/landingRouter.js'),
    loginRouter = require('./routes/loginRouter.js'),
    regRouter = require('./routes/regRouter.js'),
    emergencyRouter = require('./routes/emergencyRouter.js'),
    reportRouter = require('./routes/reportRouter.js'),
    adminRouter = require('./routes/adminRouter.js')


const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
  }));

const dbUri = process.env.MONGO_URI
mongoose.connect(process.env.MONGO_URI, console.log('MONGODB CONNECTED'))

app.use(express.static('public'))
app.use('/', express.static('public'))
app.use(express.static('uploads'))
app.use('/', express.static('uploads'))
app.set('view engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: '1mb'}))

app.use(passport.initialize())
app.use(passport.session())
passportInit(passport)

//routers
app.use('/', landingRouter)
app.use('/register', regRouter)
app.use('/login', loginRouter)
app.use('/emergency', emergencyRouter)
app.use('/report', reportRouter)
app.use('/admin', adminRouter)

app.get('/cybersecurity', (res,req)=>{
    res.render('cybersecurity');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});