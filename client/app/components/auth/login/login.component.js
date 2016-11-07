/////////////////////////////////////////////
// ------ Register login component ----------
//////////////////////////////////////////////

function loginComponent(app){
    app.component("loginView",{
        templateUrl:"/login/login.component.html"
    });
}

//export component
module.exports = loginComponent;