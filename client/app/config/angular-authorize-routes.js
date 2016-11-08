////////////////////////////////////////////////////////////////////////
// ------- Function to authorize route changes if not on login/register -------
//////////////////////////////////////////////////////////////////////////////

function authorizeRouteFunction(app){

    function authorizeRoute($rootScope,AuthService,$state){

        //on change state check if user is logged and redirect to login if it isnt
        $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams,options){
            if(!toState.name.startsWith("auth") && !AuthService.IsAuthorized())
            {
                event.preventDefault(); //prevent default route

                $state.go("auth.login"); //go to login
            }
        });
        
        
    }
    authorizeRoute.$inject=["$rootScope","AuthService","$state"];

    //set this on ap run
    app.run(authorizeRoute);

}
module.exports = authorizeRouteFunction;