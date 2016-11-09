function abPwdMatchModule(app){

    //link function for directive when its created
    function abPwdLink(scope,element,attr,ngCtrl){

        //validator for item
        ngCtrl.$validators.pwdMatch = (modelValue)=>{
            //check if value matches to watched input
            if(modelValue == scope.abPwdMatch)
            {
                return true;
            }
            return false;
        };

        //if watched input changes, it need to revalidate
        scope.$watch("abPwdMatch",()=>{
            ngCtrl.$validate();
        });

    }

    //ab match factory
    function abPwdMatchFactory(){
        return{
            restrict:"A", //attribute
            require:"ngModel",
            scope:{
                abPwdMatch:"<" //scope
            },
            link:abPwdLink
        };
    }
    app.directive("abPwdMatch",abPwdMatchFactory);
}

module.exports = abPwdMatchModule;