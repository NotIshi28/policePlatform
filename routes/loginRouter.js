const router = require('express').Router();
const {loginUser, forwardAuthenticated} = require('../utils/auth.js')

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login', { user: req.user, errors: [] })
});

router.post('/', async (req, res, next) => {
    await loginUser(req, res, next);
})

//export router
module.exports = router;