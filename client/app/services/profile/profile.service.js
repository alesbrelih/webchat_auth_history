function profileServiceModule(app){

    // define profile service
    function profileService(AuthService,$http,AppConfig,ToasterService,$state){
        var profileService = {}; //define returned singleton
        //////////
        // --- privates ---
        //////////
        var url = AppConfig.url;
        var profile = {
            name:"",
            surname:"",
            country:"",
            email:"",
            pictureUrl:"",
            picture: null

        };


        //methods
        profileService.Profile = profile;

        //gets logged person personal info
        profileService.GetProfile = ()=>{
            //get data from server
            $http.get(`${url}/api/users/profile`)
                .then(function(success){

                    //set object representing profle
                    profile.name = success.data.name;
                    profile.surname = success.data.surname;
                    profile.country = success.data.country;
                    profile.email=success.data.email;
                    profile.pictureUrl = success.data.pictureUrl;

                },function(err){

                    //show err
                    ToasterService.Add("warning",err.data);
                    //go home
                    $state.go("home");

                });
        };






        return profileService;
    }

    profileService.$inject = ["AuthService","$http","AppConfig","ToasterService","$state"];

    app.factory("ProfileComponentsService",profileService);
}


module.exports = profileServiceModule;