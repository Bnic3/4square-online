/**
 * Created by john.nana on 9/28/2016.
 */

var rekuire = require("rekuire"),
    mongoose = rekuire("database"),
    crypto = require("crypto"),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

//create schema
var UserSchema = new Schema({
   firstname: {
        type: String,
        required: true,
       lowerCase:true
   },
    lastname: {
        type: String,
        required:true,
        lowerCase:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase:true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    gender: String,
    branch: String,
    dob: Date,
    group: [String],
    role:[String],
    lastlogin: { type: Date, default: Date.now },
    username: { type: String, lowerCase:true },
    passwdhash: String,
    salt: { type: String, required: true, default: uuid.v1 }


});

/*UserSchema.pre('save', (next)=>{
    /!*this.username= this.firstname+"."+this.lastname;*!/
    console.log("pre hook here");
    next();
});*/

var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

UserSchema.methods.setPassword = function(passwordString) {
    this.passwdhash = hash(passwordString, this.salt);
};
UserSchema.methods.isValidPassword = function(passwordString) {
    var w = hash(passwordString, this.salt);
    //return w;
    return this.passwdhash === hash(passwordString, this.salt);
};


module.exports = mongoose.model('User', UserSchema);