!function t(e,o,n){function r(c,a){if(!o[c]){if(!e[c]){var s="function"==typeof require&&require;if(!a&&s)return s(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var l=o[c]={exports:{}};e[c][0].call(l.exports,function(t){var o=e[c][1][t];return r(o?o:t)},l,l.exports,t,e,o,n)}return o[c].exports}for(var i="function"==typeof require&&require,c=0;c<n.length;c++)r(n[c]);return r}({1:[function(t,e,o){"use strict";!function(e,o){var n=o.module("webChat",["ui.router","ngAnimate"]),r=t("./config/constants/app.config");r(n);var i=t("./config/angular-routes.js");i(n);var c=t("./config/angular-interceptor");c(n);var a=t("./config/angular-authorize-routes");a(n);var s=t("./components/components");s(n);var u=t("./services/all.services");u(n);var l=t("./directives/directives");l(n)}(window,window.angular)},{"./components/components":6,"./config/angular-authorize-routes":12,"./config/angular-interceptor":13,"./config/angular-routes.js":14,"./config/constants/app.config":15,"./directives/directives":17,"./services/all.services":18}],2:[function(t,e,o){"use strict";function n(t){t.component("authView",{templateUrl:"/auth/auth.component.html"})}e.exports=n},{}],3:[function(t,e,o){"use strict";function n(t,e){var o=this;o.user={email:"",password:""},o.loginUser=function(){e.Login(o.user)}}function r(t){t.component("loginView",{controller:n,controllerAs:"vm",templateUrl:"/login/login.component.html"})}n.$inject=["$http","AuthService"],e.exports=r},{}],4:[function(t,e,o){"use strict";function n(t){function e(t){var e=this;e.email="",e.recoverAccount=function(){t.RecoverAccount(e.email)}}e.$inject=["AuthService"],t.component("recoveryView",{templateUrl:"/recovery/recovery.component.html",controller:e,controllerAs:"vm"})}e.exports=n},{}],5:[function(t,e,o){"use strict";function n(t){function e(t){var e=this;e.user={email:"",pwd:""},e.registerUser=function(){console.log(e.user),t.Register(e.user)}}e.$inject=["AuthService"],t.component("registerView",{templateUrl:"/register/register.component.html",controller:e,controllerAs:"vm"})}e.exports=n},{}],6:[function(t,e,o){"use strict";function n(e){var o=t("./auth/auth.component");o(e);var n=t("./auth/login/login.component");n(e);var r=t("./auth/register/register.component");r(e);var i=t("./auth/recovery/recovery.component");i(e);var c=t("./main/main.component");c(e);var a=t("./main/profile/profile.component");a(e);var s=t("./main/profile/view/profile.view.component");s(e);var u=t("./toaster/toaster.component");u(e);var l=t("./toaster/toaster-message/toaster.message");l(e)}e.exports=n},{"./auth/auth.component":2,"./auth/login/login.component":3,"./auth/recovery/recovery.component":4,"./auth/register/register.component":5,"./main/main.component":7,"./main/profile/profile.component":8,"./main/profile/view/profile.view.component":9,"./toaster/toaster-message/toaster.message":10,"./toaster/toaster.component":11}],7:[function(t,e,o){"use strict";function n(t){function e(t,e){var o=this;o.title=t.title,o.sidebar=!1,o.toggleSidebar=function(){o.sidebar=!o.sidebar},o.logout=function(){e.Logout()}}e.$inject=["AppConfig","AuthService"],t.component("abMainView",{templateUrl:"/main/main.component.html",controller:e,controllerAs:"vm"})}e.exports=n},{}],8:[function(t,e,o){"use strict";function n(t){function e(t){t.GetProfile()}e.$inject=["ProfileComponentsService"],t.component("abProfile",{templateUrl:"/profile/profile.component.html",controller:e,controllerAs:"profile"})}e.exports=n},{}],9:[function(t,e,o){"use strict";function n(t){function e(t){var e=this;e.profile=t.Profile}e.$inject=["ProfileComponentsService"],t.component("abProfileView",{templateUrl:"/profile-view/profile.view.component.html",controller:e,controllerAs:"vm"})}e.exports=n},{}],10:[function(t,e,o){"use strict";function n(t){function e(t){var e=this;e.removeToaster=function(e){t.Remove(e)}}e.$inject=["ToasterService"],t.component("abToastMsg",{templateUrl:"/toaster-message/toaster.message.html",controller:e,controllerAs:"vm",bindings:{toastCfg:"<"}})}e.exports=n},{}],11:[function(t,e,o){"use strict";function n(t){function e(t){var e=this;e.toasters=t.Toasters}e.$inject=["ToasterService"],t.component("abToasters",{templateUrl:"/toaster/toaster.component.html",controller:e,controllerAs:"vm"})}e.exports=n},{}],12:[function(t,e,o){"use strict";function n(t){function e(t,e,o,n){t.$on("$stateChangeStart",function(t,r,i,c,a,s){r.name.startsWith("auth")||e.IsAuthorized()||(t.preventDefault(),o.go("auth.login")),r.name.startsWith("auth")&&e.IsAuthorized()&&!function(){t.preventDefault();var i=r.name;e.ValidateJwt().then(function(){return n.Add("alert","You are already logged in.")},function(){return o.go(i)})}()}),t.$on("unauthorized",function(){o.go("auth.login")})}e.$inject=["$rootScope","AuthService","$state","ToasterService"],t.run(e)}e.exports=n},{}],13:[function(t,e,o){"use strict";function n(t){function e(t){t.interceptors.push("HttpInterceptor")}e.$inject=["$httpProvider"],t.config(e)}e.exports=n},{}],14:[function(t,e,o){"use strict";function n(t){function e(t,e){t.state("home",{url:"/",template:"<home-view></home-view>"}).state("auth",{abstract:!0,template:"<auth-view></auth-view>"}).state("auth.login",{url:"/login",template:"<login-view></login-view>"}).state("auth.register",{url:"/register",template:"<register-view></register-view>"}).state("auth.recovery",{url:"/recovery",template:"<recovery-view></recovery-view>"}).state("main",{abstract:!0,url:"/main",template:"<ab-main-view></ab-main-view>"}).state("main.profile",{abstract:!0,url:"/profile",template:"<ab-profile></ab-profile>"}).state("main.profile.view",{url:"/",template:"<ab-profile-view></ab-profile-view>"}).state("main.profile.edit",{url:"/edit",template:"<ab-profile-edit></ab-profile-edit>"}).state("main.profile.pwd",{url:"/password",template:"<ab-profile-pwd></ab-profile-pwd>"}),e.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],t.config(e)}e.exports=n},{}],15:[function(t,e,o){"use strict";function n(t){t.constant("AppConfig",{title:"WebApp Sugoi",url:"http://localhost:8001"})}e.exports=n},{}],16:[function(t,e,o){"use strict";function n(t){function e(t,e,o,n){n.$validators.pwdMatch=function(e){return e==t.abPwdMatch},t.$watch("abPwdMatch",function(){n.$validate()})}function o(){return{restrict:"A",require:"ngModel",scope:{abPwdMatch:"<"},link:e}}t.directive("abPwdMatch",o)}e.exports=n},{}],17:[function(t,e,o){"use strict";function n(e){var o=t("./a/ab.pwd.match");o(e)}e.exports=n},{"./a/ab.pwd.match":16}],18:[function(t,e,o){"use strict";function n(e){var o=t("./profile/profile.service");o(e);var n=t("./auth/auth.service");n(e);var r=t("./jwt/jwt.service");r(e);var i=t("./http-interceptor/http.interceptor.service");i(e);var c=t("./toasters/tosters.service");c(e)}e.exports=n},{"./auth/auth.service":19,"./http-interceptor/http.interceptor.service":20,"./jwt/jwt.service":21,"./profile/profile.service":22,"./toasters/tosters.service":23}],19:[function(t,e,o){"use strict";function n(t){function e(t,e,o,n,r){var i=r.url,c={},a={};return a.Login=function(r){t.post(i+"/api/users/login",r).then(function(t){n.Add("success",t.data.msg),e.SaveToken(t.data.token),o.go("home")},function(t){n.Add("warning",t.data),e.RemoveToken()})},a.Logout=function(){e.RemoveToken(),n.Add("alert","Logged out."),o.go("auth.login")},a.Register=function(r){t.post(i+"/api/users/register",r).then(function(t){n.Add("success",t.data.msg),e.SaveToken(t.data.token),o.go("home")},function(t){n.Add("warning",t.data),e.RemoveToken()})},a.IsAuthorized=function(){return e.TokenExists()},a.RecoverAccount=function(e){t.post(i+"/api/users/recover",{email:e}).then(function(){n.Add("success","Recovery email sent.")},function(t){n.Add("warning",t.data)})},a.ValidateJwt=function(){return t.get(i+"/api/users/validate")},a.Profile=c,a}e.$inject=["$http","JwtService","$state","ToasterService","AppConfig"],t.factory("AuthService",e)}e.exports=n},{}],20:[function(t,e,o){"use strict";function n(t){function e(t,e,o){return{request:function(t){return e.TokenExists()&&(t.headers.token=e.GetToken()),t},responseError:function(n){return 401==n.status&&(e.RemoveToken(),o.$broadcast("unauthorized")),t.reject(n)}}}e.$inject=["$q","JwtService","$rootScope"],t.factory("HttpInterceptor",e)}e.exports=n},{}],21:[function(t,e,o){"use strict";function n(t){function e(t){function e(){return t.localStorage.getItem(r)}function o(e){t.localStorage.setItem(r,e)}function n(){e()&&t.localStorage.removeItem(r)}var r="jwt",i={};return i.TokenExists=function(){var t=e();return!!t},i.SaveToken=function(t){o(t)},i.RemoveToken=function(){n()},i.GetToken=function(){return e()},i}e.$inject=["$window"],t.factory("JwtService",e)}e.exports=n},{}],22:[function(t,e,o){"use strict";function n(t){function e(t,e,o,n,r){var i={},c=o.url,a={name:"",surname:"",country:"",email:"",picture:""};return i.Profile=a,i.GetProfile=function(){e.get(c+"/api/users/profile").then(function(t){a.name=t.data.name,a.surname=t.data.surname,a.country=t.data.country,a.email=t.data.email,a.picture=t.data.picture},function(t){n.Add("warning",t.data),r.go("home")})},i}e.$inject=["AuthService","$http","AppConfig","ToasterService","$state"],t.factory("ProfileComponentsService",e)}e.exports=n},{}],23:[function(t,e,o){"use strict";function n(t){function e(t){function e(e,i){var c=++n;r.push({index:c,type:e,message:i,visible:!1}),t(function(){o(c)},2e3)}function o(t){var e=r.filter(function(e){return e.index==t});if(e.length>0){e=e[0];var o=r.indexOf(e);r.splice(o,1)}}var n=0,r=[];return{Toasters:r,Add:e,Remove:o}}e.$inject=["$timeout"],t.factory("ToasterService",e)}e.exports=n},{}]},{},[1]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYXBwL2FwcC5qcyIsImNsaWVudC9hcHAvY29tcG9uZW50cy9hdXRoL2F1dGguY29tcG9uZW50LmpzIiwiY2xpZW50L2FwcC9jb21wb25lbnRzL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50LmpzIiwiY2xpZW50L2FwcC9jb21wb25lbnRzL2F1dGgvcmVjb3ZlcnkvcmVjb3ZlcnkuY29tcG9uZW50LmpzIiwiY2xpZW50L2FwcC9jb21wb25lbnRzL2F1dGgvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmpzIiwiY2xpZW50L2FwcC9jb21wb25lbnRzL2NvbXBvbmVudHMuanMiLCJjbGllbnQvYXBwL2NvbXBvbmVudHMvbWFpbi9tYWluLmNvbXBvbmVudC5qcyIsImNsaWVudC9hcHAvY29tcG9uZW50cy9tYWluL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuanMiLCJjbGllbnQvYXBwL2NvbXBvbmVudHMvbWFpbi9wcm9maWxlL3ZpZXcvcHJvZmlsZS52aWV3LmNvbXBvbmVudC5qcyIsImNsaWVudC9hcHAvY29tcG9uZW50cy90b2FzdGVyL3RvYXN0ZXItbWVzc2FnZS90b2FzdGVyLm1lc3NhZ2UuanMiLCJjbGllbnQvYXBwL2NvbXBvbmVudHMvdG9hc3Rlci90b2FzdGVyLmNvbXBvbmVudC5qcyIsImNsaWVudC9hcHAvY29uZmlnL2FuZ3VsYXItYXV0aG9yaXplLXJvdXRlcy5qcyIsImNsaWVudC9hcHAvY29uZmlnL2FuZ3VsYXItaW50ZXJjZXB0b3IuanMiLCJjbGllbnQvYXBwL2NvbmZpZy9hbmd1bGFyLXJvdXRlcy5qcyIsImNsaWVudC9hcHAvY29uZmlnL2NvbnN0YW50cy9hcHAuY29uZmlnLmpzIiwiY2xpZW50L2FwcC9kaXJlY3RpdmVzL2EvYWIucHdkLm1hdGNoLmpzIiwiY2xpZW50L2FwcC9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMuanMiLCJjbGllbnQvYXBwL3NlcnZpY2VzL2FsbC5zZXJ2aWNlcy5qcyIsImNsaWVudC9hcHAvc2VydmljZXMvYXV0aC9hdXRoLnNlcnZpY2UuanMiLCJjbGllbnQvYXBwL3NlcnZpY2VzL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC5pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwiY2xpZW50L2FwcC9zZXJ2aWNlcy9qd3Qvand0LnNlcnZpY2UuanMiLCJjbGllbnQvYXBwL3NlcnZpY2VzL3Byb2ZpbGUvcHJvZmlsZS5zZXJ2aWNlLmpzIiwiY2xpZW50L2FwcC9zZXJ2aWNlcy90b2FzdGVycy90b3N0ZXJzLnNlcnZpY2UuanMiXSwibmFtZXMiOlsiZSIsInQiLCJuIiwiciIsInMiLCJvIiwidSIsImEiLCJyZXF1aXJlIiwiaSIsImYiLCJFcnJvciIsImNvZGUiLCJsIiwiZXhwb3J0cyIsImNhbGwiLCJsZW5ndGgiLCIxIiwibW9kdWxlIiwid2luZG93IiwiYW5ndWxhciIsImFwcCIsImNvbnN0YW50cyIsInN0YXRlcyIsImludGVyY2VwdG9yIiwiYXV0aG9yaXplUm91dGVzIiwiY29tcG9uZW50cyIsInNlcnZpY2VzIiwiZGlyZWN0aXZlcyIsImF1dGhDb21wb25lbnQiLCJjb21wb25lbnQiLCJ0ZW1wbGF0ZVVybCIsImxvZ2luQ29udHJvbGxlciIsIiRodHRwIiwiQXV0aFNlcnZpY2UiLCJ2bSIsInRoaXMiLCJ1c2VyIiwiZW1haWwiLCJwYXNzd29yZCIsImxvZ2luVXNlciIsIkxvZ2luIiwibG9naW5Db21wb25lbnQiLCJjb250cm9sbGVyIiwiY29udHJvbGxlckFzIiwiJGluamVjdCIsInJlY292ZXJ5Q29tcG9uZW50TW9kdWxlIiwicmVjb3ZlcnlDb21wb25lbnRDb250cm9sbGVyIiwicmVjb3ZlckFjY291bnQiLCJSZWNvdmVyQWNjb3VudCIsInJlZ2lzdGVyVmlld0NvbXBvbmVudCIsInJlZ2lzdGVyQ29udHJvbGxlciIsInB3ZCIsInJlZ2lzdGVyVXNlciIsImNvbnNvbGUiLCJsb2ciLCJSZWdpc3RlciIsInVzZUNvbXBvbmVudHMiLCJyZWdpc3RlckNvbXBvbmVudCIsInJlY292ZXJDb21wb25lbnQiLCJtYWluV3JhcHBlckNvbXBvbmVudCIsInByb2ZpbGVXcmFwcGVyQ29tcG9uZW50IiwicHJvZmlsZVZpZXdDb21wb25lbnQiLCJ0b2FzdGVyQ29udGFpbmVyQ29tcG9uZW50IiwidG9hc3Rlck1zZ0NvbXBvbmVudCIsIm1haW5Db21wb25lbnRNb2R1bGUiLCJtYWluQ29tcG9uZW50Q29udHJvbGxlciIsIkFwcENvbmZpZyIsInRpdGxlIiwic2lkZWJhciIsInRvZ2dsZVNpZGViYXIiLCJsb2dvdXQiLCJMb2dvdXQiLCJwcm9maWxlQ29tcG9uZW50TW9kdWxlIiwicHJvZmlsZUNvbXBvbmVudENvbnRyb2xsZXIiLCJQcm9maWxlQ29tcG9uZW50c1NlcnZpY2UiLCJHZXRQcm9maWxlIiwicHJvZmlsZVZpZXdDb21wb25lbnRNb2R1bGUiLCJwcm9maWxlVmlld0NvbnRyb2xsZXIiLCJwcm9maWxlIiwiUHJvZmlsZSIsInRvYXN0ZXJNZXNzYWdlTW9kdWxlIiwidG9hc3Rlck1lc3NhZ2VDb250cm9sbGVyIiwiVG9hc3RlclNlcnZpY2UiLCJyZW1vdmVUb2FzdGVyIiwiaW5kZXgiLCJSZW1vdmUiLCJiaW5kaW5ncyIsInRvYXN0Q2ZnIiwidG9hc3RlckNvbXBvbmVudE1vZHVsZSIsInRvYXN0ZXJDb21wb25lbnRDb250cm9sbGVyIiwidG9hc3RlcnMiLCJUb2FzdGVycyIsImF1dGhvcml6ZVJvdXRlRnVuY3Rpb24iLCJhdXRob3JpemVSb3V0ZSIsIiRyb290U2NvcGUiLCIkc3RhdGUiLCIkb24iLCJldmVudCIsInRvU3RhdGUiLCJ0b1BhcmFtcyIsImZyb21TdGF0ZSIsImZyb21QYXJhbXMiLCJvcHRpb25zIiwibmFtZSIsInN0YXJ0c1dpdGgiLCJJc0F1dGhvcml6ZWQiLCJwcmV2ZW50RGVmYXVsdCIsImdvIiwidG8iLCJWYWxpZGF0ZUp3dCIsInRoZW4iLCJBZGQiLCJydW4iLCJhbmd1bGFySW50ZXJjZXB0b3JGdW5jdGlvbiIsImNvbmZpZ0ludGVyY2VwdG9yIiwiJGh0dHBQcm92aWRlciIsImludGVyY2VwdG9ycyIsInB1c2giLCJjb25maWciLCJhbmd1bGFyU3RhdGVDb25maWciLCJzdGF0ZUNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZSIsImFic3RyYWN0Iiwib3RoZXJ3aXNlIiwiYXBwQ29uZmlnQ29uc3RhbnRzTW9kdWxlIiwiY29uc3RhbnQiLCJhYlB3ZE1hdGNoTW9kdWxlIiwiYWJQd2RMaW5rIiwic2NvcGUiLCJlbGVtZW50IiwiYXR0ciIsIm5nQ3RybCIsIiR2YWxpZGF0b3JzIiwicHdkTWF0Y2giLCJtb2RlbFZhbHVlIiwiYWJQd2RNYXRjaCIsIiR3YXRjaCIsIiR2YWxpZGF0ZSIsImFiUHdkTWF0Y2hGYWN0b3J5IiwicmVzdHJpY3QiLCJsaW5rIiwiZGlyZWN0aXZlIiwicmVnaXN0ZXJBbGxEaXJlY3RpdmVzIiwicHdkTWF0Y2hEaXJlY3RpdmUiLCJyZWdpc3RlckFsbFNlcnZpY2VzIiwicHJvZmlsZUNvbXBvbmVudFNlcnZpY2UiLCJhdXRoU2VydmljZSIsImp3dFNlcnZpY2UiLCJodHRwSW50ZXJjZXB0U2VydmljZSIsInRvYXN0ZXJTZXJ2aWNlIiwiYXV0aFNlcnZpY2VGdW5jdGlvbiIsImF1dGhTZXJ2aWNlQ29udHJvbGxlciIsIkp3dFNlcnZpY2UiLCJjdXJyZW50VXNlciIsImF1dGhGYWN0b3J5IiwicG9zdCIsInN1Y2Nlc3MiLCJkYXRhIiwibXNnIiwiU2F2ZVRva2VuIiwidG9rZW4iLCJlcnIiLCJSZW1vdmVUb2tlbiIsIlRva2VuRXhpc3RzIiwiZ2V0IiwiZmFjdG9yeSIsImh0dHBJbnRlcmNlcHRvckZ1bmN0aW9uIiwiaHR0cEludGVyY2VwdG9yQ29udHJvbGxlciIsIiRxIiwicmVxdWVzdCIsImhlYWRlcnMiLCJHZXRUb2tlbiIsInJlc3BvbnNlRXJyb3IiLCJzdGF0dXMiLCIkYnJvYWRjYXN0IiwicmVqZWN0Iiwiand0U2VydmljZUZ1bmN0aW9uIiwiand0U2VydmljZUNvbnRyb2xsZXIiLCIkd2luZG93IiwiZ2V0VG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidG9rZW5TdG9yYWdlTmFtZSIsInNldFRva2VuIiwidmFsdWUiLCJzZXRJdGVtIiwicmVtb3ZlVG9rZW4iLCJyZW1vdmVJdGVtIiwiand0RmFjdG9yeSIsInByb2ZpbGVTZXJ2aWNlTW9kdWxlIiwicHJvZmlsZVNlcnZpY2UiLCJzdXJuYW1lIiwiY291bnRyeSIsInBpY3R1cmUiLCJ0b2FzdGVyU2VydmljZU1vZHVsZSIsIlRvYXN0ZXJTZXJ2aWNlRnVuY3Rpb24iLCIkdGltZW91dCIsIl9jcmVhdGVOZXdUb2FzdGVyIiwiX3R5cGUiLCJfbWVzc2FnZSIsIm5ld0luZGV4IiwiX2luZGV4IiwiX3RvYXN0ZXJzIiwidHlwZSIsIm1lc3NhZ2UiLCJ2aXNpYmxlIiwiX3JlbW92ZVRvYXN0ZXIiLCJpdGVtIiwiZmlsdGVyIiwidG9hc3QiLCJpdGVtSW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiQ0FBQSxRQUFBQSxHQUFBQyxFQUFBQyxFQUFBQyxHQUFBLFFBQUFDLEdBQUFDLEVBQUFDLEdBQUEsSUFBQUosRUFBQUcsR0FBQSxDQUFBLElBQUFKLEVBQUFJLEdBQUEsQ0FBQSxHQUFBRSxHQUFBLGtCQUFBQyxVQUFBQSxPQUFBLEtBQUFGLEdBQUFDLEVBQUEsTUFBQUEsR0FBQUYsR0FBQSxFQUFBLElBQUFJLEVBQUEsTUFBQUEsR0FBQUosR0FBQSxFQUFBLElBQUFLLEdBQUEsR0FBQUMsT0FBQSx1QkFBQU4sRUFBQSxJQUFBLE1BQUFLLEdBQUFFLEtBQUEsbUJBQUFGLEVBQUEsR0FBQUcsR0FBQVgsRUFBQUcsSUFBQVMsV0FBQWIsR0FBQUksR0FBQSxHQUFBVSxLQUFBRixFQUFBQyxRQUFBLFNBQUFkLEdBQUEsR0FBQUUsR0FBQUQsRUFBQUksR0FBQSxHQUFBTCxFQUFBLE9BQUFJLEdBQUFGLEVBQUFBLEVBQUFGLElBQUFhLEVBQUFB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akIsU0FBU2EsR0FBcUI3SyxHQUcxQixRQUFTOEssR0FBZWpLLEVBQVlELEVBQU1rQyxFQUFVZ0IsRUFBZWEsR0FDL0QsR0FBSW1HLE1BSUF0RSxFQUFNMUQsRUFBVTBELElBQ2hCOUMsR0FDQXlCLEtBQUssR0FDTDRGLFFBQVEsR0FDUkMsUUFBUSxHQUNSL0osTUFBTSxHQUNOZ0ssUUFBUSxHQW9DWixPQTlCQUgsR0FBZW5ILFFBQVVELEVBR3pCb0gsRUFBZXZILFdBQWEsV0FFeEIzQyxFQUFNd0ksSUFBTzVDLEVBQWIsc0JBQ0tkLEtBQUssU0FBU2tELEdBR1hsRixFQUFReUIsS0FBT3lELEVBQVFDLEtBQUsxRCxLQUM1QnpCLEVBQVFxSCxRQUFVbkMsRUFBUUMsS0FBS2tDLFFBQy9CckgsRUFBUXNILFFBQVVwQyxFQUFRQyxLQUFLbUMsUUFDL0J0SCxFQUFRekMsTUFBTTJILEVBQVFDLEtBQUs1SCxNQUMzQnlDLEVBQVF1SCxRQUFVckMsRUFBUUMsS0FBS29DLFNBRWpDLFNBQVNoQyxHQUdQbkYsRUFBZTZCLElBQUksVUFBVXNELEVBQUlKLE1BRWpDbEUsRUFBT1ksR0FBRyxXQVVmdUYsRUFHWEEsRUFBZXRKLFNBQVcsY0FBYyxRQUFRLFlBQVksaUJBQWlCLFVBRTdFeEIsRUFBSXFKLFFBQVEsMkJBQTJCeUIsR0FJM0NqTCxFQUFPSixRQUFVb0wsdUNDdkRqQixTQUFTSyxHQUFxQmxMLEdBRzFCLFFBQVNtTCxHQUF1QkMsR0FLNUIsUUFBU0MsR0FBa0JDLEVBQU1DLEdBRzdCLEdBQUlDLEtBQWFDLENBR2pCQyxHQUFVekYsTUFDTmpDLE1BQU93SCxFQUNQRyxLQUFNTCxFQUNOTSxRQUFTTCxFQUNUTSxTQUFTLElBR2JULEVBQVMsV0FFTFUsRUFBZU4sSUFDakIsS0FNTixRQUFTTSxHQUFlMU0sR0FFcEIsR0FBSTJNLEdBQU9MLEVBQVVNLE9BQU8sU0FBU0MsR0FDakMsTUFBT0EsR0FBTWpJLE9BQVM1RSxHQUcxQixJQUFHMk0sRUFBS3BNLE9BQU8sRUFBRSxDQUVib00sRUFBT0EsRUFBSyxFQUNaLElBQUlHLEdBQVlSLEVBQVVTLFFBQVFKLEVBQ2xDTCxHQUFVVSxPQUFPRixFQUFVLElBcENuQyxHQUFJVCxHQUFTLEVBQ1RDLElBd0NKLFFBQ0luSCxTQUFVbUgsRUFDVi9GLElBQUkwRixFQUNKcEgsT0FBUTZILEdBR2hCWCxFQUF1QjNKLFNBQVcsWUFFbEN4QixFQUFJcUosUUFBUSxpQkFBaUI4QixHQUdqQ3RMLEVBQU9KLFFBQVV5TCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiZmlsZTovLy9FOi9Wc0NvZGVfUHJvamVjdHMvU2FuZGJveC8wNV9XZWJDaGF0X0F1dGgifQ==
