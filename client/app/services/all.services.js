//////////////////////////////////////////////////
// ------------ Registers all services ----------
//////////////////////////////////////////////////

function registerAllServices(app){

    // Auth service
    const authService = require("./auth/auth.service");
    authService(app);

    // Jwt service
    const jwtService = require("./jwt/jwt.service");
    jwtService(app);

    //http interceptor service
    const httpInterceptService = require("./http-interceptor/http.interceptor.service");
    httpInterceptService(app);

}

module.exports = registerAllServices;