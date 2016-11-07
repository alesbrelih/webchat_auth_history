////////////////////////////////////////////
// ------------ models for user schema -----
///////////////////////////////////////////
const mongoose = require("mongoose");
const crypto = require("crypto");
const props = require("../../config/properties");
const jwt = require("jsonwebtoken");

//access schema class
const schema = mongoose.Schema;

//create new schema
const User = new schema({
    email:{
        type:String,
        unique:true //its gonna be used as uusername
    },
    hash:{
        type:String
    },
    salt:{
        type:String
    }
});

//sets hashed password for user
User.methods.setPassword = function(password){
    //random string for salt
    const salt = crypto.randomBytes(16).toString("hex");
    //crypted key
    const key = crypto.pbkdf2Sync(password, salt, 100000, 512, "sha512");
    //crypted key to string
    const pwd = key.toString("hex");

    //save salt and cryped key into db
    this.salt = salt;
    this.hash = pwd;

};
//verify password
User.methods.verifyPassword = function(password){
    //create password with inputed password and stored salt
    const pwd = crypto.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
    
    //check if it matches
    return(pwd===this.hash);
};

//generate jwt
User.methods.generateJwt = function(){
    var token = jwt.sign({
        _id:this._id //only data passing in jwt is id
    },
    props.secret,
    {
        expiresIn:"7d"
    });
    return token;
};

//export user schema
module.exports = mongoose.model("User",User);