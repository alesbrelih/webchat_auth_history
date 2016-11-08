function angularInterceptorFunction(app){


    function configInterceptor($httpProvider){
        $httpProvider.interceptors.push("HttpInterceptor");
    }
    configInterceptor.$inject = ["$httpProvider"];

    app.config(configInterceptor);

}

module.exports = angularInterceptorFunction;