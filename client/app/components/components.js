/////////////////////////////////////////////
// ----- Registers all components on app ----
/////////////////////////////////////////////
function useComponents(app){

    //registers auth component, that serves as wrapper for login/register component
    const authComponent = require("./auth/auth.component");
    authComponent(app);

    //registers login component
    const loginComponent = require("./auth/login/login.component");
    loginComponent(app);

    //registers register component
    const registerComponent = require("./auth/register/register.component");
    registerComponent(app);

    //toaster container
    const toasterContainerComponent = require("./toaster/toaster.component");
    toasterContainerComponent(app);

    //toaster msg
    const toasterMsgComponent = require("./toaster/toaster-message/toaster.message");
    toasterMsgComponent(app);
}

//exporting registering function for use in app.js
module.exports = useComponents;