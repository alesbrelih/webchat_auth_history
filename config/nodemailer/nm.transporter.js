/////////////////////////////////
// ----imported modules------
///////////////////////////////////

//nodemailer module
var nodemailer = require("nodemailer");

//smtpconfig with my email
var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL 
    auth: {
        user: "ab.develop07@gmail.com",
        pass: "E7x0j225.."
    }
};

//transporter to export
var transporter = nodemailer.createTransport(smtpConfig);

//exporting
module.exports = transporter;