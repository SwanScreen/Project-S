var dashboardControllers = angular.module('dashboardControllers', ['ngAnimate']);

//Main page controller
dashboardControllers.controller('MainController', ['$scope', '$http', '$timeout',

    function($scope, $http, $timeout) {

        //get the user settings from the server
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/js/user_settings.json').success(function(data) {
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
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/js/user_tags.json').success(function(data) {
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

    }
]);

//Hashtag validation controller
dashboardControllers.controller('HashtagVerificationController', ['$scope',
    function($scope) {
        //Hashtag validation
        $scope.specialchars = function(str) {
            var regex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?*$]/g;
            //console.log(regex.test(str));
            return regex.test(str);
        }
        $scope.twitter_regex = (function() {
            // Twitter's official hashtag verifier.
            // Ported from https://github.com/twitter/twitter-text-rb/blob/master/lib/twitter-text/regex.rb

            // Creates a Unicode Regular Expression range
            function regexRange(from, to) {
                to = to || 0;

                from = from.toString(16);
                fromLen = (from.length > 4) ? from.length : 4;
                to = to.toString(16);
                toLen = (to.length > 4) ? to.length : 4;

                if (to !== "0") {
                    return "\\u" + ("0000" + from).slice(-fromLen) + "-\\u" + ("0000" + to).slice(-toLen) + "";
                } else {
                    "\\u{" + ("0000" + from).slice(-fromLen) + "}";
                }
            }

            LATIN_ACCENTS = [
                regexRange(0xc0, 0xd6),
                regexRange(0xd8, 0xf6),
                regexRange(0xf8, 0xff),
                regexRange(0x0100, 0x024f),
                regexRange(0x0253, 0x0254),
                regexRange(0x0256, 0x0257),
                regexRange(0x0259),
                regexRange(0x025b),
                regexRange(0x0263),
                regexRange(0x0268),
                regexRange(0x026f),
                regexRange(0x0272),
                regexRange(0x0289),
                regexRange(0x028b),
                regexRange(0x02bb),
                regexRange(0x0300, 0x036f),
                regexRange(0x1e00, 0x1eff)
            ].join("")

            NON_LATIN_HASHTAG_CHARS = [
                // Cyrillic (Russian, Ukrainian, etc.)
                regexRange(0x0400, 0x04ff), // Cyrillic
                regexRange(0x0500, 0x0527), // Cyrillic Supplement
                regexRange(0x2de0, 0x2dff), // Cyrillic Extended A
                regexRange(0xa640, 0xa69f), // Cyrillic Extended B
                regexRange(0x0591, 0x05bf), // Hebrew
                regexRange(0x05c1, 0x05c2),
                regexRange(0x05c4, 0x05c5),
                regexRange(0x05c7),
                regexRange(0x05d0, 0x05ea),
                regexRange(0x05f0, 0x05f4),
                regexRange(0xfb12, 0xfb28), // Hebrew Presentation Forms
                regexRange(0xfb2a, 0xfb36),
                regexRange(0xfb38, 0xfb3c),
                regexRange(0xfb3e),
                regexRange(0xfb40, 0xfb41),
                regexRange(0xfb43, 0xfb44),
                regexRange(0xfb46, 0xfb4f),
                regexRange(0x0610, 0x061a), // Arabic
                regexRange(0x0620, 0x065f),
                regexRange(0x066e, 0x06d3),
                regexRange(0x06d5, 0x06dc),
                regexRange(0x06de, 0x06e8),
                regexRange(0x06ea, 0x06ef),
                regexRange(0x06fa, 0x06fc),
                regexRange(0x06ff),
                regexRange(0x0750, 0x077f), // Arabic Supplement
                regexRange(0x08a0), // Arabic Extended A
                regexRange(0x08a2, 0x08ac),
                regexRange(0x08e4, 0x08fe),
                regexRange(0xfb50, 0xfbb1), // Arabic Pres. Forms A
                regexRange(0xfbd3, 0xfd3d),
                regexRange(0xfd50, 0xfd8f),
                regexRange(0xfd92, 0xfdc7),
                regexRange(0xfdf0, 0xfdfb),
                regexRange(0xfe70, 0xfe74), // Arabic Pres. Forms B
                regexRange(0xfe76, 0xfefc),
                regexRange(0x200c, 0x200c), // Zero-Width Non-Joiner
                regexRange(0x0e01, 0x0e3a), // Thai
                regexRange(0x0e40, 0x0e4e), // Hangul (Korean)
                regexRange(0x1100, 0x11ff), // Hangul Jamo
                regexRange(0x3130, 0x3185), // Hangul Compatibility Jamo
                regexRange(0xA960, 0xA97F), // Hangul Jamo Extended-A
                regexRange(0xAC00, 0xD7AF), // Hangul Syllables
                regexRange(0xD7B0, 0xD7FF), // Hangul Jamo Extended-B
                regexRange(0xFFA1, 0xFFDC) // Half-width Hangul
            ].join("");

            CJ_HASHTAG_CHARACTERS = [
                regexRange(0x30A1, 0x30FA), regexRange(0x30FC, 0x30FE), // Katakana (full-width)
                regexRange(0xFF66, 0xFF9F), // Katakana (half-width)
                regexRange(0xFF10, 0xFF19), regexRange(0xFF21, 0xFF3A), regexRange(0xFF41, 0xFF5A), // Latin (full-width)
                regexRange(0x3041, 0x3096), regexRange(0x3099, 0x309E), // Hiragana
                regexRange(0x3400, 0x4DBF), // Kanji (CJK Extension A)
                regexRange(0x4E00, 0x9FFF), // Kanji (Unified)
                regexRange(0x20000, 0x2A6DF), // Kanji (CJK Extension B)
                regexRange(0x2A700, 0x2B73F), // Kanji (CJK Extension C)
                regexRange(0x2B740, 0x2B81F), // Kanji (CJK Extension D)
                regexRange(0x2F800, 0x2FA1F), regexRange(0x3003), regexRange(0x3005), regexRange(0x303B) // Kanji (CJK supplement)
            ].join("");

            // A hashtag must contain latin characters, numbers and underscores, but not all numbers.
            HASHTAG_ALPHA = "[a-z_" + LATIN_ACCENTS + NON_LATIN_HASHTAG_CHARS + CJ_HASHTAG_CHARACTERS + "]";
            HASHTAG_ALPHANUMERIC = "[a-z0-9_" + LATIN_ACCENTS + NON_LATIN_HASHTAG_CHARS + CJ_HASHTAG_CHARACTERS + "]";

            return new RegExp("(#|＃)(" + HASHTAG_ALPHANUMERIC + "*" + HASHTAG_ALPHA + HASHTAG_ALPHANUMERIC + "*)", "ig");
        }());
        $scope.validate_tag = function(tag) {
            //WHY WHY WHY WAS IT UNDEFINED!?!? I SPENT 3 HOURS ON THIS LOUSY LINE!!!!
            if (tag == undefined) {
                tag = "";
            }
            console.log(tag);

            $scope.isvalidTag = false;
            if (tag == "") {
                if ($("#error_message").hasClass('ng-dirty')) {
                    $("#error_message").text('You must enter a hashtag for it to work :)');
                    $("#error_message").addClass('active');
                }
                $scope.isvalidTag = false;
            } else if (tag.length > 20 || tag.length < 3) {
                $("#error_message").text('The hashtag must be 3-20 characters long');
                $("#error_message").addClass('active');
                $scope.isvalidTag = false;
            } else if (tag.indexOf(' ') >= 0) {
                $("#error_message").text('The hashtag cannot have spaces in it :)');
                $("#error_message").addClass('active');
                $scope.isvalidTag = false;
            } else if ($scope.specialchars(tag)) {
                $("#error_message").text('The hashtag cannot have special characters in it :)');
                $("#error_message").addClass('active');
                $scope.isvalidTag = false;
            }
            //Y U NO WORK???
            //            else if (!$scope.twitter_regex.test("#" + tag)) {
            //                console.log(tag + "regex checked")
            //                $("#error_message").text('Invalid hashtag :)');
            //                $("#error_message").addClass('active');
            //                $scope.isvalidTag = false;
            //
            //            }
            else {
                //$("#error_message").text("");
                $("#error_message").removeClass('active');
                $scope.isvalidTag = true;
            }
        }

    }
]);

//Create page controller
dashboardControllers.controller('CreateController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/user_tags.json').success(function(data) {
            //console.log(data);
            $scope.editItem_obj = {
                "tag_value": "",
                "config": {
                    "use_twitter": true,
                    "use_instagram": true,
                    "animation_id": 1
                }
            }
            $scope.save_tag = function() {
                console.log("edited and saved:");
                console.log($scope.editItem_obj);
            }

        });

    }
]);

//Edit page controller - Under construction
dashboardControllers.controller('EditController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/js/user_tags.json').success(function(data) {

            $scope.editItem_id = $routeParams.itemId;
            $scope.tags = data;
            $scope.autocheck = false;

            angular.forEach($scope.tags, function(tag, i) {
                if (tag.tag_id == $scope.editItem_id) {
                    $scope.editItem_obj = tag;
                    //$scope.editItem_obj = hashtag tag object to process
                    $scope.editItem_obj.config.use_twitter = ($scope.editItem_obj.config.use_twitter === "true");
                    $scope.editItem_obj.config.use_instagram = ($scope.editItem_obj.config.use_instagram === "true");
                    $scope.editItem_obj.config.animation_id = Number($scope.editItem_obj.config.animation_id);
                    console.log($scope.editItem_obj.config.use_instagram);
                    console.log($scope.editItem_obj.config.use_twitter);
                    console.log($scope.editItem_obj.config.animation_id);
                    console.log($scope.editItem_obj);
                }
            });

            $scope.save_tag = function() {
                console.log("edited and saved:");
                console.log($scope.editItem_obj);
            }

        });
    }
]);

//Print page controller - Under construction
dashboardControllers.controller('PrintController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/js/user_tags.json').success(function(data) {

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





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//From demo - remove before going to production
dashboardControllers.controller('ListController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/js/data.json').success(function(data) {
            $scope.artists = data;
            $scope.artistOrder = 'name';
        });
    }
]);

//From demo - remove before going to production
dashboardControllers.controller('DetailsController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('http://stage.swanscreen.com/admin/application/views/dashboard/js/data.json').success(function(data) {
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
