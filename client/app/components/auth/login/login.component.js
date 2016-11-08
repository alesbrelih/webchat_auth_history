/////////////////////////////////////////////
// ------ Register login component ----------
//////////////////////////////////////////////

function loginController($http){
    var vm = this;

    vm.Test = function(){
        $http.get("http://localhost:8001/restricted").then(function(ok){
            console.log(ok);
        });

    };
}
loginController.$inject = ["$http"];

function loginComponent(app){
    app.component("loginView",{
        controller:loginController,
        controllerAs:"vm",
        templateUrl:"/login/login.component.html",
        
    });
}

//export component
module.exports = loginComponent;