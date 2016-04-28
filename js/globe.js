//Control visibility of member functions with closure
//Globe Renderer

var tWorld = angular.module('tWorld', []);

tWorld.controller('mainCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {

    //Google Maps API calls
    //Will only be called once on page load so doesn't need to be in $scope

    var MAX_TWEETS = 10;
    $scope.searchTrend = '';
	$scope.lastClickedLoc;
	
    var tWorldStyle = [
    {
        featureType: "administrative.country",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }];

    var map = new google.maps.Map(document.getElementById('mapContainer'), {
        //College Station
        center: {
            lat: 30.6280,
            lng: -96.3344
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 5,
        styles: tWorldStyle
    });

  

    function placeMarker(location) {

        var tweetTemplate = "";
        for (var i = 0; i < MAX_TWEETS; i++) {
            var user = "User" + i;
            var status = "Bitch bitch bitch bitch" + i;
            var tweet = "<div><blockquote class='twitter-tweet'><p>" + status + "</p>-" + user + "</blockquote></div>";
            tweetTemplate += tweet;
        }
        

        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        var infowindow = new google.maps.InfoWindow({
            content: tweetTemplate
        });
        infowindow.open(map, marker);
    }

    google.maps.event.addDomListener(map, 'click', function (event) {
		$scope.lastClickedLoc = event.latLng;
        placeMarker(event.latLng);
    });
    //end of google maps api calls

    $scope.search = function (trend) {
        console.log(trend);
    }


}]);




   
