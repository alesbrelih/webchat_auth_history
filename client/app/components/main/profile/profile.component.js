/////////////////////////////////////////////
// ------- profile component module --------
/////////////////////////////////////////////

function profileComponentModule(app){

    //profile component controller
    function profileComponentController(AuthService){

        var vm = this;

        //get profile info
        // vm.profile=AuthService.GetProfileInfo();

        // //edit info when called upon
        // vm.editProfile=(editedProfile)=>{
        //     AuthService.EditProfile(editedProfile);
        // };

        // //change user pwd when called upon
        // vm.changePwd = (pwd)=>{
        //     AuthService.ChangePwd(pwd);
        // };
    }


    //Inject authservice
    profileComponentController.$inject = ["AuthService"];
    
    //declare component
    app.component("abProfile",{
        templateUrl:"/profile/profile.component.html",
        controller: profileComponentController,
        controllerAs: "vm"
    });

}

//export module
module.exports = profileComponentModule;