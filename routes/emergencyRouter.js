const router = require('express').Router();
const Fir = require('../schemas/firSchema.js');


var isVerified = false;


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

router.get('/', (req, res) => {
    res.render('emergency')
});

router.get('/fir', (req,res) =>{
    res.render("report")
})

router.post('/fir', async (req, res) =>{
    const date = new Date();
    var dataArr = date.toDateString().split(' ');
    var datetime = dataArr[2] + ' ' + dataArr[1] + ' ' + dataArr[3];
    firId = makeid(10);
    await Fir.create({
        name: req.body.name ,
        crime: req.body.crime , 
        location: req.body.location ,
        suspect:req.body.suspect ,
        suspectNum: req.body.suspectNum ,
        email: req.body.email ,
        firId: firId ,
        createdOn: datetime,
  }).then((doc) =>{
    console.log(doc);
    res.redirect('/emergency/fir/track/'+firId)
})
})

router.get('/fir/track/:firId', (req, res) =>{
    firId = req.params.firId;
    res.render("admin",{firId: firId})
    console.log(firId)

})

router.get('/callForm', (req,res) =>{
    res.render("callForm")
})

router.post('/callForm', (req,res) =>{
    apikey = process.env.IPQUAL_API_KEY;
    num = req.body.phNumber;
    console.log(typeof(num))
    fetch("https://www.ipqualityscore.com/api/json/phone/"+apikey+"/"+num+"?country[]=IN")
    .then(response => response.text())
    .then(result => {
        console.log(result[21])
        console.log(result)
        if(result[22] == "v"){
            res.redirect(301, "https://police-platform.onrender.com/2bd3200e-7177-4081-9a6c-f32d8a13f485");
            isVerified = true;
        }
        else if(result.message == "Phone is valid." && result.spammer == true){
            res.redirect('/')
        }
        else{
            res.render("errorCallForm")
        }
        
    })
    .catch(error => console.log('error', error));                                                                     
})

module.exports = router;