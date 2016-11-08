/////////////////////////////////////////////////
// ---------- http interceptor function ---------
////////////////////////////////////////////////

function httpInterceptorFunction(app){

    function httpInterceptorController($q,JwtService){

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
                    console.log("error 401");
                }
                return $q.reject(err);
            }
            
        };

    }

    httpInterceptorController.$inject = ["$q","JwtService"];

    app.factory("HttpInterceptor",httpInterceptorController);

    
}

module.exports = httpInterceptorFunction;