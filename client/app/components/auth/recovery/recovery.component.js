/////////////////////////////////////////////////
// ------- recover password component module ----
//////////////////////////////////////////////////
function recoveryComponentModule(app){

    //recovery component controller
    function recoveryComponentController(AuthService){

        let vm = this;
        vm.email = ""; //email in form

        //method on form submit that calls RecoverAcc in AuthService
        vm.recoverAccount = ()=>{
            AuthService.RecoverAccount(vm.email);
        };


    }
    //inject auth service
    recoveryComponentController.$inject = ["AuthService"];

    //component register
    app.component("recoveryView",{
        templateUrl:"/recovery/recovery.component.html",
        controller:recoveryComponentController,
        controllerAs: "vm"
    });

}

//export module
module.exports = recoveryComponentModule;