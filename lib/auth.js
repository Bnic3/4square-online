/**
 * Created by john.nana on 9/28/2016.
 */

var rek = require("rekuire"),
    jwt= require('jsonwebtoken'),
    DB= rek("database");

exports.authenticate = function(req,res,next){

    // find the user
    var User = DB.model("User");
    console.log(req.body.name);
    console.log(req.body.password);

    User.findOne({name: req.body.name}).exec()
        .then(function(user){
            if (!user) {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (user.password != req.body.password) {
                    res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    console.log("i am here ")
                    var token = jwt.sign(user, process.env.secret, {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    res.status(200)
                        .json({
                            success:true,
                            message:"Enjoy Your Token",
                            token:token
                        });
                 }//end inner else


            }//end elseif
})
        .catch(function(err) {

            return res.status(403).send({
                success: false,
                message: 'An error occured.',
                error: err

            });
        })};





