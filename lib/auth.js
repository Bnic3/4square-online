/**
 * Created by john.nana on 9/28/2016.
 */

var rek = require("rekuire"),
    jwt= require('jsonwebtoken'),
    DB= rek("database");

exports.authenticate = function(req,res,next){

    // find the user
    var User = DB.model("User");


    User.findOne({username: req.body.username}).exec()
        .then(function(user){
            if (!user) {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if ( !user.isValidPassword(req.body.password)) {
                    res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    console.log("i am here ");
                    var token = jwt.sign(user, process.env.secret, {
                        expiresIn: 1440 * 31 // expires in 24 hours
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


exports.authorization= function(req,res,next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}





