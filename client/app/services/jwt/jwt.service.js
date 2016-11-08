function jwtServiceFunction(app){

    function jwtServiceController($window){

        ////////////////////////////////////
        // ------ Privates ---------
        //////////////////////////////////

        //token name in local storage
        const tokenStorageName = "jwt";

        //private functions that get and set token
        function getToken(){
            return $window.localStorage.getItem(tokenStorageName);
        }
        function setToken(value){
            $window.localStorage.setItem(tokenStorageName,value);
        }
        function removeToken(){
            if(getToken())
            {
                $window.localStorage.removeItem(tokenStorageName);
            }
        }


        //returned singleton

        let jwtFactory = {};

        //checks if token exists
        jwtFactory.TokenExists = ()=>{
            let token = getToken();
            if(token){
                return true;
            }
            return false;
        };

        //saves token value
        jwtFactory.SaveToken = (value)=>{
            setToken(value);
        };

        //removes token
        jwtFactory.RemoveToken = ()=>{
            removeToken();
        };

        jwtFactory.GetToken = ()=>{
            getToken();
        };

        //return singleton
        return jwtFactory;


    }
    //needed injected services
    jwtServiceController.$inject = ["$window"];

    //register factory
    app.factory("JwtService",jwtServiceController);
}

module.exports = jwtServiceFunction;