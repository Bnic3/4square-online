/**
 * Created by john.nana on 10/6/2016.
 */
var rek = require("rekuire"),
    _ = require("lodash"),
    DB= rek("database"),
    jwt= require('jsonwebtoken');

var userSignup = function(req,res,next){
    var User = DB.model("User");

 /*var sampleUser= {
        "firstname": "Siripen",
        "lastname": "Freeburg",
        "phoneNo": "(529)836-9153",
        "address": "6725 Mattis Ave",
        "city": "Lewiston",
        "email": "FEricarisus.com",
        "state": "OK",
        "zip": 49805
    }*/
    //initialize user
 var user = new User(req.body);
    user.setPassword(req.body.password);
    user.role.push("member");
    user.username= user.firstname+"."+user.lastname
    //save to database
    user.save()
    .then((user)=>{
            //Todo: send welcome message
            //create token
            var token= jwt.sign(user, process.env.secret, {
                expiresIn: 1440*31 // expires in one month
            });

            //sendmessage to client
            return res.status(200).send({
                success: true,
                token: token,
                message: 'Welcome ' + user.username,
                id: user._id

            });

        })
    .catch((err)=>{
            if (err.name === 'ValidationError') {
                return res.status(401).send({
                    success: false,
                    message: 'Please fill the required field(s)!',

                });
            }
            else if (err.code === 11000) {
                return res.status(401).send({
                    success: false,
                    message: 'Username Already Exists!',

                });
            }
            else {
                return res.status(403).send({
                    success: false,
                    message: 'An error occured.',
                    error: err
                })
            }//endelse

        });//end catch


} //end userSignup



module.exports= {
    signup: userSignup

}
