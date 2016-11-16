///////////////////////////////////////
// ----- Users Api Router ------------
/////////////////////////////////////

// needed modules for users router
var User = require("./../db/models/user.model");
var sendMail = require("../config/nodemailer/nodemailer");
var multiForm = require("../config/multer/multer.config")();
var fs = require("fs");

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
    router.post("/profile",passport.authenticate("jwt",{session:false}),function(req,res){

        //save previous profile photo
        var previousPhoto = ".";

            //readmultiform data
            multiForm(req,res,function(err){
                //err reading data
                if(err){
                    res.status(400).send("Error reading data. Please check your data.");
                }
                else{
                    //data read
                    User.findById(req.body._id,function(err,user){
                        //get user and give it new info
                        user.name = req.body.name;
                        user.surname = req.body.surname;
                        user.country = req.body.country;
                        previousPhoto += user.pictureUrl;

                        //new file was saved and it exists
                        if(req.file){

                            //save url to photo
                            user.pictureUrl = "/img/"+req.file.filename;

                        }

                        //save new profile data
                        user.save(function(err){

                            //err saving to db
                            if(err){
                                res.status(400).send("Error saving information to database. Please try later.");
                            }
                            else{

                                //delete previous picture
                                var previousImg = previousPhoto;

                                //if its not default profile pic
                                if(previousImg != "./img/no-profile-pic.jpg")
                                {   
                                    //remove pic
                                    fs.unlink(previousImg,function(err){
                                        if(err){
                                            console.error("Error deleting file from server");
                                        }                              
                                    });
                                }
                                
                                //profile was updated
                                res.status(200).send("User updated");
                            }
                        });

                    });
                }
            });
            
    });
    
    //change password route

    router.post("/changepassword",passport.authenticate("jwt",{session:false}),function(req,res){
        
        //new pwd and confirm pwd do not match
        if(req.body.new !== req.body.confirm){
            res.status(400).send("Passwords do not match");
        }
        else{
            //pwds match

            User.getIdFromJwt(req.headers.token).then(function(result){
                //find user by id
                User.findById(result,function(err,user){

                    if(err){
                        //err with db
                        res.status(400).send("Error connecting to DB");
                    }
                    else{
                        //no user matches criteria
                        if(!user){
                            res.status(400).send("Error searching for user information in DB");
                        }
                        else{
                            //verify that current pwd matches one in db
                            if(user.verifyPassword(req.body.current))
                            {
                                //hash pwd
                                user.setPassword(req.body.confirm);

                                //save to db
                                user.save(function(err){

                                    if(err){
                                        res.status(400).send("Error saving new password");
                                    }
                                    else{
                                        res.status(200).send("Password successfuly changed.");
                                    }

                                });
                            }
                            else{

                                //invalid current pwd
                                res.status(400).send("Invalid current password.");

                            }

                            
                        }
                    }

                });


            });

            
        }
    });
    
    //recover password route
    router.post("/recoverpassword",passport.authenticate("jwt",{session:false}),function(req,res){
        //check for form validation failure
        if(req.body.new !== req.body.confirm){
            res.status(400).send("Passwords do not match!");
        }
        else{
            User.getIdFromJwt(req.headers.token).then(function(id){

                //get user from id
                User.findById(id,function(err,user){

                    if(err){
                        res.status(400).send("Error connecting to database");
                    }
                    else{
                        //bad id
                        if(!user){
                            res.status(400).send("Error getting user information from database.")
                        }
                        else{
                            //user found
                            user.setPassword(req.body.new);
                            
                            //save pwd
                            user.save(function(err){
                                if(err)
                                {
                                    res.status(400).send("Error saving new password");
                                }
                                else{
                                    res.status(200).send("Password successfuly saved.")
                                }
                            });

                        }   
                    }

                });

            },function(){
                //bad jwt token
                res.status(401).send("Not authenticated.");
            }); 
        }
    });
    
    
    //return router
    return router;
}

module.exports = usersApiRouter;