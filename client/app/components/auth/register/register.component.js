/////////////////////////////////////////
// -------- Register view component -----
//////////////////////////////////////////

//app is angular.module to which this will be appended
function registerViewComponent(app){


    function registerController(AuthService){
        let vm = this;

        vm.user={
            email:"",
            pwd:"",
        };

        vm.registerUser=()=>{
            console.log(vm.user);
            AuthService.Register(vm.user);
        };

    }
    registerController.$inject = ["AuthService"];

    app.component("registerView",{
        templateUrl:"/register/register.component.html",
        controller:registerController,
        controllerAs:"vm"
    });

}

//export register register component function
module.exports = registerViewComponent;