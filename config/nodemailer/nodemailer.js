////////////////////////////////////////////////////////////////////////////////////
// ----- module using nodemailer to send mails, takes email and token and cb function for params----
////////////////////////////////////////////////////////////////////////////////////

//import transporter personal module
var transporter = require("./nm.transporter");

//mailoptions
var mailOptions = {
    from:"'WebChat' krneki07@gmail.com",
    to:"",
    subject:"Account recovery.",
    html:""
};

//exported function
function sendEmail(email,token,cb){
    //sets html for recovery email
    var text = "<h2>Recovery email</h2> <br>"
                +"<hr>"
                +"Click on this link to recover your account "
                +"<a href='http://localhost:8001/validate/"+token+"'>Link</a>"+
                "<hr>"
                +"<i>WebChat</i>";
    
    //sets reciever
    mailOptions.to = email;
    mailOptions.html = text;

    //sends mail with callback
    return transporter.sendMail(mailOptions,cb);
}

//export module
module.exports = sendEmail;