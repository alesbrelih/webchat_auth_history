function profilePwdComponentModule(app){

    function profilePwdComponentController(ProfileComponentsService){
        var vm = this;

        //password
        vm.pwd = null;


        //check password confirm
        vm.changePwd = ()=>{
            //console.log("PWD CHANGEINC");
            ProfileComponentsService.ChangePassword(vm.pwd);
        };

        //resets form
        vm.resetForm = () =>{
            vm.pwd = null;
        };
    }
    profilePwdComponentController.$inject = ["ProfileComponentsService"];

    app.component("abProfilePwd",{
        controller: profilePwdComponentController,
        controllerAs: "vm",
        templateUrl: "/profile-pwd/profile.pwd.component.html",
        bindings:{
            recovery:"<"
        }
    });
}

module.exports = profilePwdComponentModule;