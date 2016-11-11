//////////////////////////////////////////////////////
// ----------- main component module ----------------
/////////////////////////////////////////////////////


function mainComponentModule(app){

    // main component controller
    function mainComponentController(AppConfig,AuthService){
        const vm = this;

        //title for app
        vm.title = AppConfig.title;

        //show sidebar
        vm.sidebar = false;

        //toggles sidebar
        vm.toggleSidebar = ()=>{
            vm.sidebar = !vm.sidebar;
        };

        //method to logout user
        vm.logout=()=>{
            AuthService.Logout();
        };
    }

    mainComponentController.$inject = ["AppConfig","AuthService"];

    //define component on app
    app.component("abMainView",{
        templateUrl: "/main/main.component.html",
        controller: mainComponentController,
        controllerAs: "vm"
    });

}

//export main module
module.exports = mainComponentModule;