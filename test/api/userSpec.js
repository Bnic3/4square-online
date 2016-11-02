/**
 * Created by john.nana on 10/10/2016.
 */
process.env.NODE_ENV = 'test'
var request = require('supertest');
var expect = require('chai').expect,
    mongoose= require('mongoose'),
    Promise = require('bluebird'),
    rek= require('rekuire'),
    app = rek("app"),
   agent = request.agent(app),
    User = rek("User");

Promise.promisifyAll(mongoose);

const connectDB = Promise.promisify(mongoose.connect, mongoose);

describe("User feature test ", function(){

/*    before(function(){
       /!* connectDB("mongodb://localhost/4square").then(()=>{ console.log("asyncworked")})*!/
 });//end before*/

    var user = {
        "firstname": "John",
        "lastname": "Nana",
        "email": "a@gmail.com",
        "phoneNo": "096735353",
        "address": "marryland, lagos",
        "gender": "Male",
        "password":"member"
    };
   it.skip("it should allow user sign up if validated", function(done){
       agent.post('/signup')
       .send(user)
       .expect(200)
       .expect(function(res){expect(res.body).to.have.property("token")})
       .end(done)



   });

    it("it should return available users", function(done){
        agent.get('/users')
        .expect(200,done)
    });

   /*afterEach(function(done){
       User.remove().exec();
       done();

   })
*/
});
