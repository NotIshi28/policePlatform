const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('report')
});

//export router
module.exports = router;