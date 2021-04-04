const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
            
    auth: {
        user: 'dario.jast@ethereal.email',
        pass: 'Fx8rhFmdjvEfAZTMG1'
    }
};


module.exports = nodemailer.createTransport(mailConfig);