///////////////////////////////////
// ----- Auth service -------------
//////////////////////////////////

function authServiceFunction(app){

    function authServiceController($http,JwtService,$state,ToasterService){

        //returned singleton
        let authFactory = {};

        //login function
        authFactory.Login=(user)=>{
            $http.post("http://localhost:8001/api/users/login",user)
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

        //register function
        authFactory.Register=(user)=>{
            $http.post("http://localhost:8001/api/users/register",user)
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

        //checks if user already authorized
        authFactory.IsAuthorized=()=>{
            return JwtService.TokenExists();
        };

        //sends recovery request to api, with email provided
        authFactory.RecoverAccount=(email)=>{
            $http.post("http://localhost:8001/api/users/recover",{email:email})
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

            return $http.get("http://localhost:8001/api/users/validate");

        };

        //return singleton
        return authFactory;

    }

    //services needed
    authServiceController.$inject = ["$http","JwtService","$state","ToasterService"];

    app.factory("AuthService",authServiceController);
}

module.exports = authServiceFunction;