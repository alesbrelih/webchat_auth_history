//////////////////////////////////
// ------ TOASTER MESSAGE component MODULE----
////////////////////////////////////

function toasterMessageModule(app){

    //toaster message controller
    function toasterMessageController(ToasterService){

        const vm = this;

        //event that occures on toaster click
        vm.removeToaster = function(index){
            ToasterService.Remove(index);
        };

    }
    //need toaster service to gain access to toasters
    toasterMessageController.$inject = ["ToasterService"];

    //component definition
    app.component("abToastMsg",{
        templateUrl:"/toaster/toaster-message/toaster.message.html",
        controller:toasterMessageController,
        controllerAs:"vm",
        bindings:{
            "toastCfg":"<"
        }
    });
}

//Export module
module.exports = toasterMessageModule;