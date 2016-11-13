///////////////////////////////////////
// ----- Users Api Router ------------
/////////////////////////////////////

// needed modules for users router
var User = require("./../db/models/user.model");
var sendMail = require("../config/nodemailer/nodemailer");
var pictureUploader = require("../config/multer/multer.config")();
var fs = require("fs");
var path = require("path");

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

    //get user profile data
    router.get("/profile",passport.authenticate("jwt",{session:false}),function(req,res){

        //route needs authorization

        User.getIdFromJwt(req.headers.token).then(function(success){
            
            //finds user from verified JWT
            User.findOne({_id:success},function(err,user){
                //err
                if(err){
                    res.status(500).send("Error retrieving user data from DB.");
                }
                else{
                    if(user){
                        res.status(200).send(user);
                    }
                    else{
                        res.status(400).send("No such user in DB.");
                    }
                }
            });
        }).catch(function(err){
            //err verifying JWT
            res.status(400).send(err);
        });

    });
    
    //updating user info
    router.put("/profile",passport.authenticate("jwt",{session:false}),function(req,res){
        //find current user
        User.findById(req.body._id,function(err,user){
            //error finding user
            if(err){
                res.send(500).Send("Error connecting to DB / Cannot find current user.");
            }
            else{
                //user found in db
                
                //change data
                user.name = req.body.name;
                user.surname = req.body.surname;
                user.country = req.body.country;

                //check if profile picture was changed
                if(user.picture!=req.body.profile_photo){
                    pictureUploader(req,res,function(err){
                        //save img to server
                        if(err){
                            //error saving img
                            res.status(400).send("Error saving selected photo. Please check photo size and format and try again.");
                        }
                        //img saved
                        else{

                            //Set img path to user picture prop in DB
                            user.picture = req.file.path;

                            //update user
                            user.save(function(err,updatedUser){
                                if(err){

                                    //err updating
                                    res.status(400).Send("Error connecting to DB / Cannot save user info.");
                                }
                                else{
                                    //success updating

                                    //delete previous picture
                                    var previousImg = path.join(__dirname,user.picture);

                                    fs.unlink(previousImg,function(err){
                                        if(err){
                                            console.error("Error deleting file from server");
                                        }
                                        res.status(200).Send(updatedUser);
                                    });
                                    
                                }
                            });
                        }

                    });

                }
                else{
                    //picture wasnt changed

                    //update user
                    user.save(function(err,updatedUser){
                        if(err){
                            res.status(400).Send("Error connecting to DB / Cannot save user info.");
                        }
                        else{
                            res.status(200).Send(updatedUser);
                        }
                    });
                }
                

            }
        });
    });

    //return router
    return router;
}

module.exports = usersApiRouter;