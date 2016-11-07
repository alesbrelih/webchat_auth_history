/////////////////////////////////////////
// -------- Register view component -----
//////////////////////////////////////////

//app is angular.module to which this will be appended
function registerViewComponent(app){

    app.component("registerView",{
        templateUrl:"/register/register.component.html"
    });

}

//export register register component function
module.exports = registerViewComponent;