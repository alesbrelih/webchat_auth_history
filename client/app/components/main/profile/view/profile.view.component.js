/////////////////////////////////////////////
// ------ profile view component module -----
////////////////////////////////////////////

function profileViewComponentModule(app){

    //profileView controller
    function profileViewController(ProfileComponentsService){
        var vm = this;
        
        vm.profile = ProfileComponentsService.Profile;

    }

    profileViewController.$inject = ["ProfileComponentsService"];


    //define component ab-profile-view
    app.component("abProfileView",{
        templateUrl:"/profile/view/profile.view.component.html",
        controller: profileViewController,
        controllerAs: "vm"
    });

}

//export module
module.exports = profileViewComponentModule;