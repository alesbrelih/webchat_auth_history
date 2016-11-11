function profileViewComponentModule(app){

    function profileViewController(AuthService){
        var vm = this;
        vm.profile = AuthService.GetProfile();
    }


}