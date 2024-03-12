const router = require('express').Router()
const User = require('../schemas/userSchema.js')
const bcrypt = require('bcrypt')
const { forwardAuthenticated } = require('../utils/auth.js');

router.get("/", forwardAuthenticated, async (req, res) => {
    res.render('register', {errors: []});
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const email = req.body.email
        const name = req.body.name
        let errors = []
        const date = new Date();
        var chatDateArr = date.toDateString().split(' ');
        var dateAndTime = chatDateArr[2] + ' ' + chatDateArr[1] + ' ' + chatDateArr[3];
        if (!req.body.email || !req.body.name || !req.body.password) {
            errors.push({msg: "Please fill all the credentials."})
        }
        await User.findOne({ email: email }).then((user) => {
            if (user) {
                errors.push({ msg: "Email already exists, try again." })
            }
        })
        await User.findOne({ name: name }).then((user) => {
            if (user) {
            errors.push({ msg: "Name already exists, try again." })
            }
        })
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            createdOn: dateAndTime
        });

        if (errors.length > 0) {
            return res.render('register', {errors})
        }
        
        await newUser.save();
        console.log(newUser);
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
})



module.exports = router;