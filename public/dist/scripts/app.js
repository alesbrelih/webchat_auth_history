!function t(e,n,o){function r(c,a){if(!n[c]){if(!e[c]){var s="function"==typeof require&&require;if(!a&&s)return s(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[c]={exports:{}};e[c][0].call(l.exports,function(t){var n=e[c][1][t];return r(n?n:t)},l,l.exports,t,e,n,o)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(t,e,n){"use strict";!function(e,n){var o=n.module("webChat",["ui.router","ngAnimate"]),r=t("./config/constants/app.config");r(o);var i=t("./config/angular-routes.js");i(o);var c=t("./config/angular-interceptor");c(o);var a=t("./config/angular-authorize-routes");a(o);var s=t("./components/components");s(o);var u=t("./services/all.services");u(o);var l=t("./directives/directives");l(o)}(window,window.angular)},{"./components/components":6,"./config/angular-authorize-routes":11,"./config/angular-interceptor":12,"./config/angular-routes.js":13,"./config/constants/app.config":14,"./directives/directives":16,"./services/all.services":17}],2:[function(t,e,n){"use strict";function o(t){t.component("authView",{templateUrl:"/auth/auth.component.html"})}e.exports=o},{}],3:[function(t,e,n){"use strict";function o(t,e){var n=this;n.user={email:"",password:""},n.loginUser=function(){e.Login(n.user)}}function r(t){t.component("loginView",{controller:o,controllerAs:"vm",templateUrl:"/login/login.component.html"})}o.$inject=["$http","AuthService"],e.exports=r},{}],4:[function(t,e,n){"use strict";function o(t){function e(t){var e=this;e.email="",e.recoverAccount=function(){t.RecoverAccount(e.email)}}e.$inject=["AuthService"],t.component("recoveryView",{templateUrl:"/recovery/recovery.component.html",controller:e,controllerAs:"vm"})}e.exports=o},{}],5:[function(t,e,n){"use strict";function o(t){function e(t){var e=this;e.user={email:"",pwd:""},e.registerUser=function(){console.log(e.user),t.Register(e.user)}}e.$inject=["AuthService"],t.component("registerView",{templateUrl:"/register/register.component.html",controller:e,controllerAs:"vm"})}e.exports=o},{}],6:[function(t,e,n){"use strict";function o(e){var n=t("./auth/auth.component");n(e);var o=t("./auth/login/login.component");o(e);var r=t("./auth/register/register.component");r(e);var i=t("./auth/recovery/recovery.component");i(e);var c=t("./main/main.component");c(e);var a=t("./main/profile/profile.component");a(e);var s=t("./toaster/toaster.component");s(e);var u=t("./toaster/toaster-message/toaster.message");u(e)}e.exports=o},{"./auth/auth.component":2,"./auth/login/login.component":3,"./auth/recovery/recovery.component":4,"./auth/register/register.component":5,"./main/main.component":7,"./main/profile/profile.component":8,"./toaster/toaster-message/toaster.message":9,"./toaster/toaster.component":10}],7:[function(t,e,n){"use strict";function o(t){function e(t,e){var n=this;n.title=t.title,n.sidebar=!1,n.toggleSidebar=function(){n.sidebar=!n.sidebar},n.logout=function(){e.Logout()}}e.$inject=["AppConfig","AuthService"],t.component("abMainView",{templateUrl:"/main/main.component.html",controller:e,controllerAs:"vm"})}e.exports=o},{}],8:[function(t,e,n){"use strict";function o(t){function e(t){}e.$inject=["AuthService"],t.component("abProfile",{templateUrl:"/profile/profile.component.html",controller:e,controllerAs:"vm"})}e.exports=o},{}],9:[function(t,e,n){"use strict";function o(t){function e(t){var e=this;e.removeToaster=function(e){t.Remove(e)}}e.$inject=["ToasterService"],t.component("abToastMsg",{templateUrl:"/toaster/toaster-message/toaster.message.html",controller:e,controllerAs:"vm",bindings:{toastCfg:"<"}})}e.exports=o},{}],10:[function(t,e,n){"use strict";function o(t){function e(t){var e=this;e.toasters=t.Toasters}e.$inject=["ToasterService"],t.component("abToasters",{templateUrl:"/toaster/toaster.component.html",controller:e,controllerAs:"vm"})}e.exports=o},{}],11:[function(t,e,n){"use strict";function o(t){function e(t,e,n,o){t.$on("$stateChangeStart",function(t,r,i,c,a,s){r.name.startsWith("auth")||e.IsAuthorized()||(t.preventDefault(),n.go("auth.login")),r.name.startsWith("auth")&&e.IsAuthorized()&&!function(){t.preventDefault();var i=r.name;e.ValidateJwt().then(function(){return o.Add("alert","You are already logged in.")},function(){return n.go(i)})}()}),t.$on("unauthorized",function(){n.go("auth.login")})}e.$inject=["$rootScope","AuthService","$state","ToasterService"],t.run(e)}e.exports=o},{}],12:[function(t,e,n){"use strict";function o(t){function e(t){t.interceptors.push("HttpInterceptor")}e.$inject=["$httpProvider"],t.config(e)}e.exports=o},{}],13:[function(t,e,n){"use strict";function o(t){function e(t,e){t.state("home",{url:"/",template:"<home-view></home-view>"}).state("auth",{abstract:!0,template:"<auth-view></auth-view>"}).state("auth.login",{url:"/login",template:"<login-view></login-view>"}).state("auth.register",{url:"/register",template:"<register-view></register-view>"}).state("auth.recovery",{url:"/recovery",template:"<recovery-view></recovery-view>"}).state("main",{abstract:!0,url:"/main",template:"<ab-main-view></ab-main-view>"}).state("main.profile",{url:"/profile",template:"<ab-profile></ab-profile>"}).state("main.profile.view",{url:"/",template:"<ab-profile-view></ab-profile-view>"}).state("main.profile.edit",{url:"/edit",template:"<ab-profile-edit></ab-profile-edit>"}).state("main.profile.pwd",{url:"/password",template:"<ab-profile-pwd></ab-profile-pwd>"}),e.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],t.config(e)}e.exports=o},{}],14:[function(t,e,n){"use strict";function o(t){t.constant("AppConfig",{title:"WebApp Sugoi",url:"http://localhost:8001"})}e.exports=o},{}],15:[function(t,e,n){"use strict";function o(t){function e(t,e,n,o){o.$validators.pwdMatch=function(e){return e==t.abPwdMatch},t.$watch("abPwdMatch",function(){o.$validate()})}function n(){return{restrict:"A",require:"ngModel",scope:{abPwdMatch:"<"},link:e}}t.directive("abPwdMatch",n)}e.exports=o},{}],16:[function(t,e,n){"use strict";function o(e){var n=t("./a/ab.pwd.match");n(e)}e.exports=o},{"./a/ab.pwd.match":15}],17:[function(t,e,n){"use strict";function o(e){var n=t("./auth/auth.service");n(e);var o=t("./jwt/jwt.service");o(e);var r=t("./http-interceptor/http.interceptor.service");r(e);var i=t("./toasters/tosters.service");i(e)}e.exports=o},{"./auth/auth.service":18,"./http-interceptor/http.interceptor.service":19,"./jwt/jwt.service":20,"./toasters/tosters.service":21}],18:[function(t,e,n){"use strict";function o(t){function e(t,e,n,o,r){var i=r.url,c={};return c.Login=function(r){t.post(i+"/api/users/login",r).then(function(t){o.Add("success",t.data.msg),e.SaveToken(t.data.token),n.go("home")},function(t){o.Add("warning",t.data),e.RemoveToken()})},c.Logout=function(){e.RemoveToken(),o.Add("alert","Logged out."),n.go("auth.login")},c.Register=function(r){t.post(i+"/api/users/register",r).then(function(t){o.Add("success",t.data.msg),e.SaveToken(t.data.token),n.go("home")},function(t){o.Add("warning",t.data),e.RemoveToken()})},c.IsAuthorized=function(){return e.TokenExists()},c.RecoverAccount=function(e){t.post(i+"/api/users/recover",{email:e}).then(function(){o.Add("success","Recovery email sent.")},function(t){o.Add("warning",t.data)})},c.ValidateJwt=function(){return t.get(i+"/api/users/validate")},c}e.$inject=["$http","JwtService","$state","ToasterService","AppConfig"],t.factory("AuthService",e)}e.exports=o},{}],19:[function(t,e,n){"use strict";function o(t){function e(t,e,n){return{request:function(t){return e.TokenExists()&&(t.headers.token=e.GetToken()),t},responseError:function(o){return 401==o.status&&(e.RemoveToken(),n.$broadcast("unauthorized")),t.reject(o)}}}e.$inject=["$q","JwtService","$rootScope"],t.factory("HttpInterceptor",e)}e.exports=o},{}],20:[function(t,e,n){"use strict";function o(t){function e(t){function e(){return t.localStorage.getItem(r)}function n(e){t.localStorage.setItem(r,e)}function o(){e()&&t.localStorage.removeItem(r)}var r="jwt",i={};return i.TokenExists=function(){var t=e();return!!t},i.SaveToken=function(t){n(t)},i.RemoveToken=function(){o()},i.GetToken=function(){return e()},i}e.$inject=["$window"],t.factory("JwtService",e)}e.exports=o},{}],21:[function(t,e,n){"use strict";function o(t){function e(t){function e(e,i){var c=++o;r.push({index:c,type:e,message:i,visible:!1}),t(function(){n(c)},2e3)}function n(t){var e=r.filter(function(e){return e.index==t});if(e.length>0){e=e[0];var n=r.indexOf(e);r.splice(n,1)}}var o=0,r=[];return{Toasters:r,Add:e,Remove:n}}e.$inject=["$timeout"],t.factory("ToasterService",e)}e.exports=o},{}]},{},[1]);