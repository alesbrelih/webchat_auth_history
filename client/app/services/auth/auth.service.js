///////////////////////////////////
// ----- Auth service -------------
//////////////////////////////////

function authServiceFunction(app){

    function authServiceController($http,JwtService,$state,ToasterService,AppConfig){
        //url from config
        var url = AppConfig.url;


        /////////////////////////////////
        ///////////////////////////////77

        var currentUser = {};

        //returned singleton
        let authFactory = {};

        //login function
        authFactory.Login=(user)=>{
            $http.post(`${url}/api/users/login`,user)
                .then(function(success){

                    ToasterService.Add("success",success.data.msg);
                    JwtService.SaveToken(success.data.token);
                    $state.go("home"); 

                },function(err){

                    ToasterService.Add("warning",err.data);
                    //removed token if failed login
                    JwtService.RemoveToken();

                });
        };

        //logout function
        authFactory.Logout=()=>{

            //remove token, show toaster and redirect to auth.login
            JwtService.RemoveToken();
            ToasterService.Add("alert", "Logged out.");
            $state.go("auth.login");

        };

        //register function
        authFactory.Register=(user)=>{
            $http.post(`${url}/api/users/register`,user)
                .then(function(success){
                    ToasterService.Add("success",success.data.msg);
                    JwtService.SaveToken(success.data.token);
                    $state.go("home");
                },function(err){

                    ToasterService.Add("warning",err.data);
                    //remove token if failed register
                    JwtService.RemoveToken();
                    
                });
        };
        
        //gets user info from DB
        // authFactory.GetProfileInfo=()=>{
        //     $http.get(`${url}/api/users/profile`)
        //         .then(function(success){

        //             currentUser.email=success.data.email;

        //         },function(err){

        //             ToasterService.Add("warning",err.data);
        //             $state.go("home");

        //         });
        // };

        //checks if user already authorized
        authFactory.IsAuthorized=()=>{
            return JwtService.TokenExists();
        };

        //sends recovery request to api, with email provided
        authFactory.RecoverAccount=(email)=>{
            $http.post(`${url}/api/users/recover`,{email:email})
                .then(function(){
                    //toaster message sent
                    ToasterService.Add("success","Recovery email sent.");
                },
                function(err){
                    //toaster message err data
                    ToasterService.Add("warning",err.data);
                });
        };

        //TODO: authfactory.ProfileInfo AND make localhost address saved in angular constants

        //validates jwt
        authFactory.ValidateJwt=()=>{

            return $http.get(`${url}/api/users/validate`);

        };
        
        //current profile
        authFactory.Profile = currentUser;

        //return singleton
        return authFactory;

    }

    //services needed
    authServiceController.$inject = ["$http","JwtService","$state","ToasterService","AppConfig"];

    app.factory("AuthService",authServiceController);
}

module.exports = authServiceFunction;