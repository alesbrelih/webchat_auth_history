function profileServiceModule(app){

    // define profile service
    function profileService(AuthService,$http,AppConfig,ToasterService,$state){
        var profileService = {}; //define returned singleton
        //////////
        // --- privates ---
        //////////
        var url = AppConfig.url;
        var profile = {
            _id:"",
            name:"",
            surname:"",
            country:"",
            email:"",
            pictureUrl:"",
            picture: null

        };

        //function
        function createFormData(profile){
            var fd = new FormData();
            for(let prop in profile){
                if(prop!="pictureUrl")
                {
                    fd.append(prop,profile[prop]);
                }
            }

            return fd;
        }



        //methods
        profileService.Profile = profile;

        //gets logged person personal info
        profileService.GetProfile = ()=>{
            //get data from server
            $http.get(`${url}/api/users/profile`)
                .then(function(success){

                    //set object representing profle
                    profile._id = success.data._id;
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

        //edits profile
        profileService.EditProfile = (edited)=>{
            
            //create form data for multitype-dataform content type
            let formData = createFormData(edited);

            //send updated user
            $http.post(`${url}/api/users/profile`,formData,{
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
            }).then(
                function(){
                    //user updated
                    ToasterService.Add("success","User successfully updated");
                    profileService.GetProfile();
                    $state.go("main.profile.view");
                },function(err){
                    ToasterService.Add("warning",err.data);
                }
            );
        };






        return profileService;
    }

    profileService.$inject = ["AuthService","$http","AppConfig","ToasterService","$state"];

    app.factory("ProfileComponentsService",profileService);
}


module.exports = profileServiceModule;