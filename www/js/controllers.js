angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope, $ionicPopup, $state,$auth) {

  $scope.data = {};
  $scope.login = function() {

    var credentials = {
      email: $scope.data.email,
      password: $scope.data.password
    }

    // Use Satellizer's $auth service to login
    $auth.login(credentials).then(function(data) {

      // If login is successful, redirect to the users state
      $state.go('app.lahan');
    }, function(error) {
      //console.log(credentials);
      console.log(error);
    });
  }
});
