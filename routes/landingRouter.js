const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/logout', (req, res) => {
    req.logout(()=>{
        console.log("logged out")
    });
    res.redirect('/login');
});

//export router
module.exports = router;