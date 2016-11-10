///////////////////////////////////////
// ----- Users Api Router ------------
/////////////////////////////////////

// needed modules for users router
var User = require("./../db/models/user.model");
var sendMail = require("../config/nodemailer/nodemailer");

function usersApiRouter(express,passport){

    //create router using referenced express
    var router = express.Router();

    // API/USERS/LOGIN - POST
    router.post("/login",function(req,res){

        //get user and email from body
        var _email = req.body.email;
        var _password = req.body.password;

        //find user with that email in db
        User.findOne({email:_email},function(err,user){
            //error connecting to db
            if(err){
                res.status(400).send("Server error!");
            }
            else{
                //user was found
                if(user){
                    //check pwd
                    if(user.verifyPassword(_password)){
                        //return jwt if valid
                        var _token = user.generateJwt();
                        res.status(200).send({token:_token,msg:"Login successful."});
                    }
                    else{
                        //bad pwd
                        res.status(400).send("Invalid password.");
                    }
                    
                }
                else{
                    //bad email
                    res.status(400).send("Email does not exist.");
                }
            }
        });
    });

    // API/USERS/REGISTER - POST
    router.post("/register",function(req,res){

        //email and pwd from body
        var _email = req.body.email;
        var _password = req.body.password;

        //create new user schema with that data
        var confirmUser = new User();
        confirmUser.email = _email;
        //hash password
        confirmUser.setPassword(_password);
        confirmUser.save(function(err,user){
            //save user
            if(err){
                //err
                if(err.code==11000 || 11000 == err.code){
                    res.status(400).send("Email already exists.");
                }
                else
                {
                    res.status(400).send("Error saving user, please try later.");
                }
            }
            else{
                //generate jwt and send jwt if user successfully registered
                var jwt = user.generateJwt();
                res.status(200).send({token:jwt,msg:"Register successful."});
                
            }
        });


    });

     //route to validate jwt token
    router.get("/validate",passport.authenticate("jwt",{session:false}),function(req,res){
        
        res.status(200).send("Jwt validated");
    });

    //route to recover password
    router.post("/recover",function(req,res){
        var email = req.body.email;

        User.findOne({email:email},function(err,user){
            if(err){
                //server/db err
                res.status(500).send("Error with connection, try later.");
            }
            else{
                if(user){
                    
                    sendMail(user.email,user.generateJwt(true),function(err,success){
                        if(err){
                            res.status(400).send(err.response);
                        }
                        else{
                            //user was found
                            res.status(200).send("Email sent."+success.response);
                        }
                    });
                    
                }
                else{
                    //user wasnt foundr
                    res.status(400).send("There is no user with this email.");
                }
            }
        });

    });

    //return router
    return router;
}

module.exports = usersApiRouter;