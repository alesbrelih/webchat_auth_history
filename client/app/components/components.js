/////////////////////////////////////////////
// ----- Registers all components on app ----
/////////////////////////////////////////////
function useComponents(app){

    /////////////////////////////////////////////
    // -------- auth compoenents ---------------
    ////////////////////////////////////////////
    
    //registers auth component, that serves as wrapper for login/register component
    const authComponent = require("./auth/auth.component");
    authComponent(app);

    //registers login component
    const loginComponent = require("./auth/login/login.component");
    loginComponent(app);

    //registers register component
    const registerComponent = require("./auth/register/register.component");
    registerComponent(app);

    //recover account component
    const recoverComponent = require("./auth/recovery/recovery.component");
    recoverComponent(app);


    //////////////////////////////////
    // ---- main window components ---
    ///////////////////////////////////

    //main window wrapper
    const mainWrapperComponent = require("./main/main.component");
    mainWrapperComponent(app);

    /////////////////////////////////
    // ----- profile componens ------
    ////////////////////////////////

    // profile components wrapper
    const profileWrapperComponent = require("./main/profile/profile.component");
    profileWrapperComponent(app);

    //profile view component
    const profileViewComponent = require("./main/profile/view/profile.view.component");
    profileViewComponent(app);

    //profile edit component
    const profileEditComponent = require("./main/profile/edit/profile.edit.component");
    profileEditComponent(app);



    //////////////////////////////////////
    // --- helper components ------------
    /////////////////////////////////////

    //toaster container
    const toasterContainerComponent = require("./toaster/toaster.component");
    toasterContainerComponent(app);

    //toaster msg
    const toasterMsgComponent = require("./toaster/toaster-message/toaster.message");
    toasterMsgComponent(app);
}

//exporting registering function for use in app.js
module.exports = useComponents;