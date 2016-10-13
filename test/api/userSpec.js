/**
 * Created by john.nana on 10/10/2016.
 */
const request = require('supertest');
const expect = require('chai').expect,
    mongoose= require('mongoose'),
    Promise = require('bluebird'),
    rek= require('rekuire'),
    app = rek("app"),
   agent = request.agent(app),
    User = rek("User");


Promise.promisifyAll(mongoose);

const connectDB = Promise.promisify(mongoose.connect, mongoose);



describe("User login test", ()=>{

    before(()=>{
       /* connectDB("mongodb://localhost/4square").then(()=>{ console.log("asyncworked")})*/
 });//end before

    var user = {
        "firstname": "John",
        "lastname": "Nana",
        "email": "bnicemagnolia@gmail.com",
        "phoneNo": 8039704763,
        "address": "37,akinola,Bariga, Lagos",
        "gender": "Male",
        "role":"member"
    };
   it("it should allow user sign up if validated", ()=>{
       agent.post('/signup')
       .send(user)
       .expect(200)
       .end((err, results)=>{
               if(err) console.log(err);
               results.body.to.have.property('token');
           })



   })
   afterEach((done)=>{
       User.remove().exec();
       done();

   })

});
