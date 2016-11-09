/////////////////////////////////////////////
// ------ Register login component ----------
//////////////////////////////////////////////

function loginController($http,AuthService){
    var vm = this;
    vm.user={
        email:"",
        password:""
    };
    vm.loginUser = ()=>{
        AuthService.Login(vm.user);
    };

}
loginController.$inject = ["$http","AuthService"];

function loginComponent(app){
    app.component("loginView",{
        controller:loginController,
        controllerAs:"vm",
        templateUrl:"/login/login.component.html",
        
    });
}

//export component
module.exports = loginComponent;