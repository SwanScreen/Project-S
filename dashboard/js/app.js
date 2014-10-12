var myApp = angular.module('myApp', [
    'ngRoute',
    'dashboardControllers'
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'ListController'
        }).
        when('/details/:itemId', {
            templateUrl: 'partials/details.html',
            controller: 'DetailsController'
        }).
        when('/edit/:itemId', {
            templateUrl: 'partials/create.html',
            controller: 'EditController' //need to create create + edit controller
        }).
        when('/create/', {
            templateUrl: 'partials/create.html',
            controller: 'CreateController' //need to create create + edit controller
        }).
        when('/print/:itemId', {
            templateUrl: 'partials/print.html',
            controller: 'PrintController' //need to create print controller
        }).
        when('/dashboard/', {
            templateUrl: 'partials/main.html',
            controller: 'MainController'
        }).
        otherwise({
            redirectTo: '/dashboard'
        });
    }
]);
