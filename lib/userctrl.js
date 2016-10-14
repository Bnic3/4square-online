/**
 * Created by john.nana on 10/6/2016.
 */
var userctrl= function(User){
    var jwt= require('jsonwebtoken');


    var userSignup = function(req,res,next){
        //var User = DB.model("User");

        console.log("testing ")
        //initialize user
        var user = new User(req.body);
        user.setPassword(req.body.password);
        user.role.push("member");
        var username =  user.firstname+"."+user.lastname;
        user.username=username.toLowerCase();
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
                        error: err

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

    var editUser = function editUser(req, res) {
        User.update({_id: req.params.id}, req.body)
            .then(function(user) {
                return res.status(200).send({
                    success: true,
                    message: 'Account Updated!'
                });
            })
            .catch(function(err) {
                return res.status(403).send({
                    success: false,
                    message: 'An error occured.',
                    error: err
                });
            });
    }; //end editUser

    var editUserPassword = function editUserPassword(req, res) {
        if (!req.body.password) {
            return res.status(401).send({
                success: false,
                message: 'Please enter your new password.'
            });
        }
        User.findOne({_id: req.params.id})
            .then(function(user) {
                user.setPassword(req.body.password);

                    User.update({_id: req.params.id}, {$set: {passwdhash: user.passwdhash}})
                        .then(function(user) {
                            return res.status(200).send({
                                success: true,
                                message: 'Password successfully changed.'
                            });
                        })
                        .catch(function(err) {
                            return res.status(403).send({
                                success: false,
                                message: 'An error occured.',
                                error: err
                            });
                        });
                })
            .catch(function(err) {
                return res.status(403).send({
                    success: false,
                    message: 'An error occured.',
                    error: err
                })
            })
    }; //end editUserPassword

    var deleteUser = function deleteUser(req, res) {
        User.remove({_id: req.params.id})
            .then(function(user) {
                return res.status(200).send({
                    success: true,
                    message: 'Account Deleted'
                });
            })
            .catch(function(err) {
                return res.status(403).send({
                    success: false,
                    message: 'An error occured.',
                    error: err
                });
            });
    }; //end deleteUser

    var getUser = function getUser(req, res) {
        User.findById(req.params.id)
            .then(function(user) {
                if (!user) {
                    return res.status(401).send({
                        success: false,
                        message: 'User not found.'
                    });
                }
                else {
                    return res.status(200).send(user);
                }
            })
            .catch(function(err) {
                return res.status(403).send({
                    success: false,
                    message: 'An error occured.',
                    error: err
                });
            });
    }; //end getUser










    return {
        signup: userSignup,
        editUser: editUser,
        editPassword:editUserPassword,
        deleteUser:deleteUser,
        getUser: getUser
    }
}//end of user controller



module.exports= userctrl;
