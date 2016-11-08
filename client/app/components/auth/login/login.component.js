/////////////////////////////////////////////
// ------ Register login component ----------
//////////////////////////////////////////////

function loginController($http,ToasterService){
    var vm = this;

    vm.Test = function(){
        $http.get("http://localhost:8001/restricted").then(function(ok){
            console.log(ok);
        });

    };
    vm.newToaster = function(){
        ToasterService.Add("warning","warning");
        ToasterService.Add("alert","alert");
        ToasterService.Add("success","success");
    };
}
loginController.$inject = ["$http","ToasterService"];

function loginComponent(app){
    app.component("loginView",{
        controller:loginController,
        controllerAs:"vm",
        templateUrl:"/login/login.component.html",
        
    });
}

//export component
module.exports = loginComponent;