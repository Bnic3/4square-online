/**
 * Created by john.nana on 10/10/2016.
 */
require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect,
    mongoose= require('mongoose'),
    Promise = require('bluebird');


Promise.promisifyAll(mongoose);

const connectDB = Promise.promisify(mongoose.connect, mongoose);



describe("User login test", ()=>{

    before(()=>{
        connectDB("mongodb://localhost/4square").then(()=>{ console.log("asyncworked")})
 });//end before

   it('test database', ()=>{

   });//end it

});
