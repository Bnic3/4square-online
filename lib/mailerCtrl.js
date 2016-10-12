/**
 * Created by john.nana on 10/12/2016.
 */
require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}));

transporter.sendMail({
    from: process.env.MAIL_USER+'@gmail.com',
    to: "johnnana005@gmail.com",
    subject: 'Welcome ',
    html: '<p>Thank you for signing up!</p>'
});
