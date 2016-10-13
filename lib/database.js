var mongoose = require("mongoose");

if(process.env.ENV == "Test"){mongoose.connect('mongodb://localhost/4square_TEST');}
else {mongoose.connect(process.env.DATABASEDEV);}


var db = mongoose.connection;
db.on("error",function(errMsg){
    console.log("Error Connecting to Mongo: " + errMsg);
});
mongoose.set('debug', true);


module.exports = mongoose;