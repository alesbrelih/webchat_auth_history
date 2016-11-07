//////////////////////////////////////////////
// --- needed modules for connection to db ---
/////////////////////////////////////////////

const props = require("./../config/properties");
const mongoose = require("mongoose"); //Node.Js ORM

//connects to db info stored in properties
function connectToDb(){
    mongoose.connect(props.db);
}
//export connection usage
module.exports = connectToDb;
