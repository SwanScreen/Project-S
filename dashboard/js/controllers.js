var dashboardControllers = angular.module('dashboardControllers', ['ngAnimate']);

//From demo - remove before going to production
dashboardControllers.controller('ListController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('js/data.json').success(function(data) {
            $scope.artists = data;
            $scope.artistOrder = 'name';
        });
    }
]);

//Main page controller
dashboardControllers.controller('MainController', ['$scope', '$http', '$timeout',

    function($scope, $http, $timeout) {

        //get the user settings from the server
        $http.get('js/user_settings.json').success(function(data) {
            $scope.user_settings = data;

            $scope.$watch('$viewContentLoaded', function() {
                var width_percent = Number($scope.user_settings.remaining_seconds) / 36 / Number($scope.user_settings.total_hours);

                //animate the hours bar
                //console.log("remaining time: " + Number($scope.user_settings.remaining_seconds) + " / 36 /" + Number($scope.user_settings.total_hours) + " , " + width_percent);
                $timeout(function() {
                    document.getElementById('meter_inner').style.width = width_percent + "%";
                }, 200);

            });

            function timeFromSecs(seconds) {
                return (
                    Math.floor(((seconds / 86400)) * 24) + ' hours and ' +
                    Math.floor(((seconds / 3600) % 1) * 60) + ' minutes');
            }
            $scope.remaining_time_string = timeFromSecs(Number($scope.user_settings.remaining_seconds));
            //console.log($scope.remaining_time_string);

        });

        //get the list of tags for the users
        $http.get('js/user_tags.json').success(function(data) {
            $scope.user_tags = data;
        });

        //remove item from JSON helper -
        $scope.removeFromArray = function(array, property, value) {
            angular.forEach(array, function(index, result) {
                if (index[property] == value) {
                    //Remove from array
                    array.splice(result, 1);
                }
            });
            $scope.$apply();
        }

        //delete a tag
        $scope.delete_tag = function(tag) {
            window.setTimeout(function() {
                $scope.removeFromArray($scope.user_tags, 'tag_id', tag);
                console.log('deleted tag #' + tag + ' succssfully');
            }, 100);
        };

        //create a tag
        $scope.create_tag = function(tag) {
            window.setTimeout(function() {
                console.log('created tag #' + tag + ' succssfully');

            }, 200);
        };

        //update a tag
        $scope.update_tag = function(tag) {
            window.setTimeout(function() {
                console.log('edited tag #' + tag + ' succssfully');

            }, 200);
        };

        //save a tag
        $scope.save_tag = function(tag) {
            window.setTimeout(function() {
                console.log('saved tag #' + tag + ' succssfully');

            }, 200);
        };

    }
]);

//Create page controller
dashboardControllers.controller('CreateController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('js/user_tags.json').success(function(data) {
            console.log(data);
        });
    }
]);

//Edit page controller - Under construction
dashboardControllers.controller('EditController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('js/user_tags.json').success(function(data) {
            $scope.artists = data;
            $scope.whichItem = $routeParams.itemId;

            if ($routeParams.itemId > 0) {
                $scope.prevItem = Number($routeParams.itemId) - 1;
            } else {
                $scope.prevItem = $scope.artists.length - 1;
            }

            if ($routeParams.itemId < $scope.artists.length - 1) {
                $scope.nextItem = Number($routeParams.itemId) + 1;
            } else {
                $scope.nextItem = 0;
            }

        });
    }
]);

//Print page controller - Under construction
dashboardControllers.controller('PrintController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('js/user_tags.json').success(function(data) {

            $scope.printItem_id = $routeParams.itemId;
            $scope.printItem_value = null;
            $scope.tags = data;

            angular.forEach($scope.tags, function(tag, i) {
                if (tag.tag_id == $scope.printItem_id) {
                    $scope.printItem_value = tag.tag_value;
                    //$scope.printItem_value = hashtag to print
                    console.log('printed tag #' + $scope.printItem_value + ' succssfully');
                }
            });

        });
    }
]);

//From demo - remove before going to production
dashboardControllers.controller('DetailsController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('js/data.json').success(function(data) {
            $scope.artists = data;
            $scope.whichItem = $routeParams.itemId;

            if ($routeParams.itemId > 0) {
                $scope.prevItem = Number($routeParams.itemId) - 1;
            } else {
                $scope.prevItem = $scope.artists.length - 1;
            }

            if ($routeParams.itemId < $scope.artists.length - 1) {
                $scope.nextItem = Number($routeParams.itemId) + 1;
            } else {
                $scope.nextItem = 0;
            }

        });
    }
]);
