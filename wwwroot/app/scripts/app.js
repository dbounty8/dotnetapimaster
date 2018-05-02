'use strict';
angular.module('CustomerApp', ['ngRoute'])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    // disable IE ajax request caching
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $routeProvider.when("/Home", {
        controller: "CustomerListCtrl",
        templateUrl: "/App/Views/CustomerList.html",
    }).otherwise({ redirectTo: "/Home" });

    }]);