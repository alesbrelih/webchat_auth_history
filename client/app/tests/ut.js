////////////////////////////////////////////////
// ------- dependencies for karma testing -----
////////////////////////////////////////////////
const angular = require("angular");  //need to pass angular reference
require("angular-mocks");
require("angular-ui-router");
require("angular-animate");
require("../app");

/////////////////////////////////////////
// --- Tests -------------------
//////////////////////////////////////

// ------- statetesting --------
require("./states/states.tests")(angular);

// Service testing

//auth service
require("./services/auth/auth.tests")(angular);

//jwt service
require("./services/jwt/jwt.tests")(angular);

//toaster service tests
require("./services/toasters/toaster.tests")(angular);