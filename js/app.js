var app = angular.module('myApp', ['ui.router']);
app.controller('parkingsCtrl', function($scope, $http) {
    //var config = {headers: { 'Content-type': 'application/json' }};
    $http.get("https://jsonp.afeld.me/?url=http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json").then(function(response) {
    	var groupes_packings = response.data.opendata.answer.data.Groupes_Parking.Groupe_Parking;
/*
		$('#placesDispos').on('submit', function(e){
	    	for (var i=0;i<groupes_packings.length;i++){
	    		if ()
	    		console.log(groupes_packings[i].Grp_nom);
	    	}
		});
*/
    });
    
    $http.get("http://localhost:3000/db").then(function(response) {
    	console.log(response);
    	parkings = response.data.parking;
    		var longlats = [];
	    	for (var i=0;i<parkings.length;i++){
	    		longlats.push({lat: parkings[i].lat,lng: parkings[i].long});
	    		//longlats[i] = {parkings[i].lat,parkings[i].long};
	    		//console.log(parkings[i]);
	    	}
			var zoneMarqueurs = new google.maps.LatLngBounds();
			
			var optionsCarte = {
				zoom: 10,
				center: { lat: 47.218549, lng: -1.544561 }
			}
			var maCarte = new google.maps.Map( document.getElementById("googleMap"), optionsCarte );
			
			for( var i = 0, I = longlats.length; i < I; i++ ) {

				//**********************************							************************************
				// Si tableau d'objets litérraux   *							*     Si tableau de tableaux       *
				//**********************************							************************************

				var latlng = longlats[i],							//	var latlng = tableauMarqueurs[i],
					latitude = latlng["lat"],								//		latitude = latlng[0],
					longitude = latlng["lng"];								//		longitude = latlng[1];
			
				var optionsMarqueur = {
					map: maCarte,
					position: new google.maps.LatLng( latitude, longitude )	
				};
				var marqueur = new google.maps.Marker( optionsMarqueur );
				zoneMarqueurs.extend( marqueur.getPosition() );
			}
			maCarte.fitBounds( zoneMarqueurs );

		});
});
/*
var lat = 47.218549;
var lng = -1.544561;
var myLatlng = new google.maps.LatLng(lat, lng);
var mapProp=[];
var map = {};

function maPosition(position) {
  myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  mapProp = {
    center:myLatlng,
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var marker = new google.maps.Marker({
  	position: myLatlng,
    title:"Vous êtes ici !"
  });

  marker.setMap(map);
}

function initialize() {
  mapProp = {
    center:myLatlng,
    zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var marker = new google.maps.Marker({
  	position: myLatlng,
    title:"Vous êtes ici !"
  });

  marker.setMap(map);
}

if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);

google.maps.event.addDomListener(window, 'load', initialize);*/