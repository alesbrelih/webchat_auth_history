///////////////////////////////////
// ----- Auth service -------------
//////////////////////////////////

function authServiceFunction(app){

    function authServiceController($http,JwtService){

        //returned singleton
        let authFactory = {};

        //login function
        authFactory.Login=(user)=>{
            $http.post("http://localhost:8001/api/users/login",user)
                .then(function(data){
                    JwtService.SaveToken(data.token);
                },function(){
                    //removed token if failed login
                    JwtService.RemoveToken();
                });
        };

        //register function
        authFactory.Register=(user)=>{
            $http.post("http://localhost:8001/api/users/register",user)
                .then(function(data){
                    JwtService.SaveToken(data.token);
                },function(){
                    //remove token if failed register
                    JwtService.RemoveToken();
                });
        };

        //checks if user already authorized
        authFactory.IsAuthorized=()=>{
            return JwtService.TokenExists();
        };

        //TODO: authfactory.ProfileInfo AND make localhost address saved in angular constants


        //return singleton
        return authFactory;

    }

    //services needed
    authServiceController.$inject = ["$http","JwtService"];

    app.factory("AuthService",authServiceController);
}

module.exports = authServiceFunction;