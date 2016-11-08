function toasterComponentModule(app){


    function toasterComponentController(ToasterService){
        var vm = this;

        vm.toasters = ToasterService.Toasters;
    }
    toasterComponentController.$inject = ["ToasterService"];

    app.component("abToasters",{
        templateUrl: "/toaster/toaster.component.html",
        controller: toasterComponentController,
        controllerAs: "vm"
    });

}
module.exports = toasterComponentModule;