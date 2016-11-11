/////////////////////////////////////////////
// ------- profile component module --------
/////////////////////////////////////////////

function profileComponentModule(app){

    //profile component controller
    function profileComponentController(AuthService){


        //gets profile info from server
        AuthService.GetProfileInfo();
    }

    //Inject authservice
    profileComponentController.$inject = ["AuthService"];
    
    //declare component
    app.component("abProfile",{
        templateUrl:"/profile/profile.component.html",
        controller: profileComponentController,
        controllerAs: "profile"
    });
}

//export module
module.exports = profileComponentModule;