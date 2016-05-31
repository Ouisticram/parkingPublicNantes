	var angularExample =angular.module('myApp',['ui.router','restangular'])
	angularExample.config(function($stateProvider, $urlRouterProvider,RestangularProvider) {
	RestangularProvider.setDefaultHeaders({'Accept': "application/json"});

	$urlRouterProvider.otherwise("/map");
	$stateProvider
		.state('map', {
		 url: "/map",
		 resolve: {
			promiseObj:  function(Restangular){
				RestangularProvider.setBaseUrl('http://localhost:3000/db');
				return Restangular.all('').getList().get(0).then(function (results) {
					console.log(results);
					getCoordonnee(results,'5');
					return results;
				});
			 }
		  },
		 controller: function($scope,promiseObj){
			$scope.message = promiseObj;
		  },
		  template: "<div>json <div ui-view><h1>{{message}}</h1></div></div>"
		})
	});


	var x = document.getElementById("demo");

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
			x.innerHTML = "Geolocation is not supported by this browser.";
		}

	function showPosition(position) {
		x.innerHTML = "Latitude: " + position.coords.latitude + 
		"<br>Longitude: " + position.coords.longitude;
	}
	var a ="FEYDEAU Nantes";
	var b = "DECRE-BOUFFAY Nantes";
	function returnTime(a,b){
		var origin = a;
		var destination = b;
		var service = new google.maps.DistanceMatrixService();
		var service = new google.maps.DistanceMatrixService;
		service.getDistanceMatrix({
		origins: [origin],
		destinations: [destination],
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: false,
		avoidTolls: false
	  }, function(response, status) {
		if (status !== google.maps.DistanceMatrixStatus.OK) {
		  alert('Error was: ' + status);
		} else {
		  var originList = response.originAddresses;
		  var destinationList = response.destinationAddresses;

		  for (var i = 0; i < originList.length; i++) {
			var results = response.rows[i].elements;
			for (var j = 0; j < results.length; j++) {
			  console.log( originList[i] + ' to ' + destinationList[j] +
				  ': ' + results[j].distance.text + ' in ' +
				  results[j].duration.text + '<br>');
			}
		  }
		}
	  });
	}

	function getCoordonnee(listParking,id){
		return new google.maps.LatLng(listParking[id]['lat'],listParking[id]['long']);
		/*console.log(listParking[id]['lat']);
		console.log(listParking[id]['long']);
		returnTime(new google.maps.LatLng(listParking[id]['lat'],listParking[id]['long']),new google.maps.LatLng(listParking['6']['lat'],listParking['6']['long']));*/

	}
