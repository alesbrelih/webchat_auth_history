////////////////////////////////////////////////////////////////////////
// ------- Function to authorize route changes if not on login/register -------
//////////////////////////////////////////////////////////////////////////////

function authorizeRouteFunction(app){

    function authorizeRoute($rootScope,AuthService,$state,ToasterService){

        //on change state check if user is logged and redirect to login if it isnt
        $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams,options){
            if(!toState.name.startsWith("auth") && !AuthService.IsAuthorized())
            {
                event.preventDefault(); //prevent default route

                $state.go("auth.login"); //go to login
            }
            if(toState.name.startsWith("auth")  && AuthService.IsAuthorized()){
                //if token exists prevent default state change
                event.preventDefault();

                //save destination
                let to = toState.name;

                //validate token promise, on succes end, if validation fails go to auth page
                AuthService.ValidateJwt().then(()=>
                    ToasterService.Add("alert","You are already logged in.")
                ,()=>
                    $state.go(to)
                );

            }
        });

        //on authorized error return user to login page
        $rootScope.$on("unauthorized",()=>{
            $state.go("auth.login");
        });
        
        
    }
    authorizeRoute.$inject=["$rootScope","AuthService","$state","ToasterService"];

    //set this on ap run
    app.run(authorizeRoute);

}
module.exports = authorizeRouteFunction;