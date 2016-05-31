var app = angular.module('myApp', ['ui.router']);
app.controller('parkingsCtrl', function($scope, $http) {
    //var config = {headers: { 'Content-type': 'application/json' }};
    $http.get("https://jsonp.afeld.me/?url=http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json").then(function(response) {

        $scope.myData = response;
    });
});