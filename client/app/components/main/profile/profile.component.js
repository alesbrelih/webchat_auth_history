/////////////////////////////////////////////
// ------- profile component module --------
/////////////////////////////////////////////

function profileComponentModule(app){

    //profile component controller
    function profileComponentController(ProfileComponentsService){


        //gets profile info from server when profile routes are selected
        ProfileComponentsService.GetProfile();
    }

    //Inject authservice
    profileComponentController.$inject = ["ProfileComponentsService"];
    
    //declare component
    app.component("abProfile",{
        templateUrl:"/profile/profile.component.html",
        controller: profileComponentController,
        controllerAs: "profile"
    });
}

//export module
module.exports = profileComponentModule;