/////////////////////////////////////////////
// ------ profile view component module -----
////////////////////////////////////////////

function profileViewComponentModule(app){

    //profileView controller
    function profileViewController(AuthService){
        var vm = this;
        
        vm.profile = AuthService.Profile;

    }

    profileViewController.$inject = ["AuthService"];


    //define component ab-profile-view
    app.component("abProfileView",{
        templateUrl:"/profile/view/profile.view.component.html",
        controller: profileViewController,
        controllerAs: "vm"
    });

}

//export module
module.exports = profileViewComponentModule;