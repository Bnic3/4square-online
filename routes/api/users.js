var express = require('express');
var router = express.Router();

var rek = require("rekuire"),
    DB= rek("database"),
    auth = rek("auth"),
    userCtrl = rek("userctrl");




/* GET users listing. */
router.get('/users', function(req, res, next) {
  var User = DB.model("User");
  User.find({}).exec().then(function(data){
    res.json(data);
  })
});

//signup
router.post('/signup', userCtrl.signup);

router.post("/login", auth.authenticate);

router.get("/protected", auth.authorization, function(req,res){
  res.send(req.decoded._doc)

})

router.get('/setup', function(req,res){
  // create a sample user
  var User = DB.model("User");
  var nick = new User({
    name: 'Nick',
    password: 'password',
    admin: true

  });

// save the sample user
nick.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully');
  res.json({ success: true });
});

});


module.exports = router;
