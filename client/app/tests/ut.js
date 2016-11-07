////////////////////////////////////////////////
// ------- dependencies for karma testing ----- 
////////////////////////////////////////////////
const angular = require("angular");  //need to pass angular reference
require("angular-mocks");
require("angular-ui-router");
require("../app");

/////////////////////////////////////////
// --- Tests -------------------
//////////////////////////////////////

// ------- statetesting --------
require("./states/states.tests")(angular);