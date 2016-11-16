/////////////////////////////////////////////////
// ---------- http interceptor function ---------
////////////////////////////////////////////////

function httpInterceptorFunction(app){

    function httpInterceptorController($q,JwtService,$rootScope){

        return {
            //add token to header on every request
            "request":function(config){

                //append token to every request
                if(JwtService.TokenExists()){
                    config.headers.token = JwtService.GetToken();
                }
                
                return config;
            },


            //if 401 error remove token
            "responseError":function(err){
                if(err.status==401){
                    JwtService.RemoveToken();
                    $rootScope.$broadcast("unauthorized");
                }
                return $q.reject(err);
            }
            
        };

    }

    httpInterceptorController.$inject = ["$q","JwtService","$rootScope"];

    app.factory("HttpInterceptor",httpInterceptorController);

    
}

module.exports = httpInterceptorFunction;