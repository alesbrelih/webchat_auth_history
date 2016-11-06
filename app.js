const express = require("express");
const app = express();
const body_parser = require("body-parser");
const server = require("http").Server(app);
const path = require("path");
const ejs = require("ejs");

//////////////////////////////////
//----bodyparser middleware---- /
////////////////////////////////

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json());


///////////////////////////////////////////
// ----- Static folder for CSS/JS/FONT ----
///////////////////////////////////////////

app.use(express.static(path.join(__dirname,"public")));


////////////////////////////////////
// ---- views & render engine -----
///////////////////////////////////

//render engine
app.engine("html",ejs.renderFile);
//set view folder
app.set("views",path.join(__dirname,"views"));


//routes default for now
app.get("/",(req,res)=>{
    res.render("index.html");

});

//start server
server.listen(8001,()=>{
    console.log("Server is runing");
});


