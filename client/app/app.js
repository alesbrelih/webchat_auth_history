(function(window,angular){


    //////////////////////////////////////
    // ------- main angular module -------
    //////////////////////////////////////

    const app = angular.module("webChat",["ui.router"]);

    /////////////////////////////////////
    // ------- state config module ------
    /////////////////////////////////////

    const states = require("./config/angular-routes.js");


    /////////////////////////////////////
    // ----- Components -----------------
    ////////////////////////////////////

    const components = require("./components/components");

    //register states
    states(app);

    //register components
    components(app);


})(window,window.angular);