(function(window){

    const angular = require("angular");
    const router = require("angular-ui-router");

    angular.module("web_chat",[]).controller("MainCtrl",["$scope",function($scope){
        $scope.title = "Waw browserify";
        $scope.title2 = "wawawaw";
    }]);

})(window);