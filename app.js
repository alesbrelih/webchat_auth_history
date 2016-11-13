const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const server = require("http").Server(app);
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const passport_jwt = require("./config/jwt/jwt.strategy");
const dbConnect = require("./db/db.connect");
const jwt = require("jsonwebtoken");
const props = require("./config/properties");


/////////////////////////////////
// ---- route models ----------
////////////////////////////////

const userRouter = require("./routes/user.routes")(express,passport);

//////////////////////////////////
//----bodyparser middleware---- /
////////////////////////////////

//connect to db test.
dbConnect();

//configure jwt strategy for passport
passport_jwt(passport);

//implement cross origin requests middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json());


///////////////////////////////////////////
// ----- Static folder for CSS/JS/FONT ----
///////////////////////////////////////////

app.use(express.static(path.join(__dirname,"public")));
app.use("/auth",express.static(path.join(__dirname,"client/app/components/auth")));
app.use("/login",express.static(path.join(__dirname,"client/app/components/auth/login")));
app.use("/register",express.static(path.join(__dirname,"client/app/components/auth/register")));
app.use("/toaster",express.static(path.join(__dirname,"client/app/components/toaster")));
app.use("/recovery",express.static(path.join(__dirname,"client/app/components/auth/recovery")));
app.use("/main",express.static(path.join(__dirname,"client/app/components/main")));
app.use("/profile",express.static(path.join(__dirname,"client/app/components/main/profile")));
app.use("/img",express.static(path.join(__dirname,"img")));





////////////////////////////////////
// ---- views & render engine -----
///////////////////////////////////

//render engine
app.engine("html",ejs.renderFile);
//set view folder
app.set("views",path.join(__dirname,"views"));

/////////////////////////////////
// ----------- ROUTES ----------
////////////////////////////////
app.use("/api/users",userRouter);

//routes default for now
//testing authentication with jwt
app.get("/",(req,res)=>{
    res.render("index.html");

});
app.get("/restricted",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.send("restricted area");
});

//for forget password
app.get("/validate/:jwt",(req,res)=>{
    var jwt_body = req.params.jwt;
    jwt.verify(jwt_body,props.secret,function(err,decoded){
        if(err){
            res.status(401).send("Unauthorized");
        }
        else{
            res.redirect("/#/recover/"+decoded);
        }
    });
});



//start server
server.listen(8001,()=>{
    console.log("Server is runing");
});


