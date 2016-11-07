///////////////////////////////////////
// ----- Users Api Router ------------
/////////////////////////////////////

// needed modules for users router
const User = require("./../db/models/user.model");

function usersApiRouter(express){

    //create router using referenced express
    const router = express.Router();

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
                        res.status(200).send({token:_token,msg:"User succesfully logged in!"});
                    }
                    else{
                        //bad pwd
                        res.status(400).send("Bad request");
                    }
                    
                }
                else{
                    //bad email
                    res.status(400).send("Bad request");
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
                res.status(400).send("Error saving user");
            }
            else{
                //generate jwt and send jwt if user successfully registered
                var jwt = user.generateJwt();
                res.status(200).send({token:jwt,msg:"User successfuly registered!"});
                
            }
        });


    });
    //return router
    return router;
}

module.exports = usersApiRouter;