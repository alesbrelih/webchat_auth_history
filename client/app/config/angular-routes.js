//function to be exported
//angular will be reference to window.angular module
function angularStateConfig(app){
    
    //configure states function
    function stateConfig($stateProvider,$urlRouterProvider){

        $stateProvider
            .state("home",{
                url:"/",
                template:"<home-view></home-view>"
            })
            //auth layer/wrapper for login/register components
            .state("auth",{
                abstract:true,
                template:"<auth-view></auth-view>"
            })
            .state("auth.login",{
                url:"/login",
                template:"<login-view></login-view>"
            })
            .state("auth.register",{
                url:"/register",
                template:"<register-view></register-view>"
            });
            
        $urlRouterProvider.otherwise("/");
    }

    stateConfig.$inject = ["$stateProvider","$urlRouterProvider"];

    //use stateConfig function to confiure main app
    app.config(stateConfig);
}


//export function for browserify
module.exports  =   angularStateConfig;