////////////////////////////////////////////////////////////////////////
// ------- Function to authorize route changes if not on login/register -------
//////////////////////////////////////////////////////////////////////////////

function authorizeRouteFunction(app){

    function authorizeRoute($rootScope,AuthService,$state,ToasterService,JwtService){

        //on change state check if user is logged and redirect to login if it isnt
        $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams,options){
            if(!toState.name.startsWith("auth") && !AuthService.IsAuthorized())
            {
                event.preventDefault(); //prevent default route

                $state.go("auth.login"); //go to login
            }

            //remove token once redirecting from auth recover pwd
            //so user has to relog once pwd changed
            if(fromState.name === "auth.recoverpwd"){
                JwtService.RemoveToken();
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
            //when accessing auth recovery need to verify token for possible injection
            if(toState.name === "auth.recoverpwd"){

                JwtService.SaveToken(toParams.jwt);
                AuthService.ValidateJwt().then(function(){
                    //jwt valid so we let it access

                },function(){
                    //jwt injected
                    $state.go("auth.login");

                });

            }
            
        });

        //on authorized error return user to login page
        $rootScope.$on("unauthorized",()=>{
            $state.go("auth.login");
        });
        
        
    }
    authorizeRoute.$inject=["$rootScope","AuthService","$state","ToasterService","JwtService"];

    //set this on ap run
    app.run(authorizeRoute);

}
module.exports = authorizeRouteFunction;