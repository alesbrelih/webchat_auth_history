(function(window,angular){


    //////////////////////////////////////
    // ------- main angular module -------
    //////////////////////////////////////

    const app = angular.module("webChat",["ui.router","ngAnimate"]);


    /////////////////////////////////////
    // ------ angular constants -------
    /////////////////////////////////////

    const constants = require("./config/constants/app.config");
    constants(app);

    /////////////////////////////////////
    // ------- state config module ------
    /////////////////////////////////////

    const states = require("./config/angular-routes.js");

    //register states
    states(app);

    /////////////////////////////////////////////
    // ------ Configure http interceptor -----------
    /////////////////////////////////////////////////

    const interceptor = require("./config/angular-interceptor");
    interceptor(app);

    /////////////////////////////////////////////////
    // ----- Authorize routes --------------------
    ////////////////////////////////////////////

    const authorizeRoutes = require("./config/angular-authorize-routes");
    authorizeRoutes(app);

    /////////////////////////////////////
    // ----- Components -----------------
    ////////////////////////////////////

    const components = require("./components/components");

    //register components
    components(app);

    ///////////////////////////////////////
    // ------ Services ------------------
    //////////////////////////////////////

    const services = require("./services/all.services");
    
    //register all services
    services(app);

    ////////////////////////////////////
    // ------ Directives -------------
    /////////////////////////////////////

    const directives = require("./directives/directives");
    directives(app);




})(window,window.angular);