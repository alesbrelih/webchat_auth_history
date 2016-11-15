////////////////////////////////////////////
// ----- profile edit component module -----
////////////////////////////////////////////

function profileEditComponentModule(app){

    //profile edit controller
    function profileEditController(ProfileComponentsService){
        const vm = this;

        //get and copy profileInfo
        vm.editedProfile = Object.create(ProfileComponentsService.Profile);
        
        //call service to edit profile
        vm.editProfile=()=>{
            ProfileComponentsService.EditProfile(vm.editedProfile);
        };
        vm.consoleLog=()=>{
            console.log(vm.editedProfile);
        };
        
    }

    profileEditController.$inject = ["ProfileComponentsService"];

    //register component
    app.component("abProfileEdit",{
        templateUrl:"/profile-edit/profile.edit.component.html",
        controller: profileEditController,
        controllerAs: "vm"
    });

}

//export module to register it on app
module.exports = profileEditComponentModule;