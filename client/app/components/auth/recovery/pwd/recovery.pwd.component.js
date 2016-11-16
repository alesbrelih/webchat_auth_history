//////////////////////////////////////////////////
// ------- recovery pwd component module -----------------
//////////////////////////////////////////////

function recoveryPwdComponentModule(app){

    //recovery pwd controller
    function recoveryPwdControlller(AuthService){
        const vm = this;
        
        //new password
        vm.pwd = {
            new:"",
            confirm:""
        };

        //calls authservice to recover password
        vm.setPassword = ()=>{
            AuthService.RecoverPassword(vm.pwd);
        };

    }
    recoveryPwdControlller.$inject = ["AuthService"];

    //register component
    app.component("recoveryPwdView",{
        controller: recoveryPwdControlller,
        controllerAs: "vm",
        templateUrl: "/recovery-pwd/recovery.pwd.component.html"
    });
}

//export module
module.exports = recoveryPwdComponentModule;