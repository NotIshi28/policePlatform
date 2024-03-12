const { ensureAuthenticated } = require('../utils/auth');
const fir = require('../schemas/firSchema.js');


const router = require('express').Router();

router.get('/', ensureAuthenticated, async(req, res) => {
    const firData = await fir.find();
    console.log(firData);
    res.render('admin', {firData:firData})

});

router.get('/:firId', ensureAuthenticated, async(req, res) => {
    firId = req.params.firId;
    const firData = await fir.find({_id:firId});
    console.log(firData);
    res.render('firView', {firData:firData[0]})

});

router.post('/:firId', ensureAuthenticated, async(req, res) => {
    let firId = req.params.firId;
    await fir.updateOne({_id:firId}, {
        $set:{
            isComplete:true
        }
    }).then(console.log('done'));
    res.redirect('/admin')

});

//export router
module.exports = router;