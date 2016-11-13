//////////////////////////////////////////////////
// ------------ Registers all services ----------
//////////////////////////////////////////////////

function registerAllServices(app){

    //profile component service
    const profileComponentService = require("./profile/profile.service");
    profileComponentService(app);


    // Auth service
    const authService = require("./auth/auth.service");
    authService(app);

    // Jwt service
    const jwtService = require("./jwt/jwt.service");
    jwtService(app);

    //http interceptor service
    const httpInterceptService = require("./http-interceptor/http.interceptor.service");
    httpInterceptService(app);

    //toaster service
    const toasterService = require("./toasters/tosters.service");
    toasterService(app);
}

module.exports = registerAllServices;