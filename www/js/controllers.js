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

.controller('LahanCtrl', function($rootScope,$scope,$state) {
  $scope.tambah = function(){
    $state.go('app.tambah');
  };
})

.controller('TambahCtrl', function($scope,$state, Lahan){

  $scope.data = {};
  $scope.tambahLahan = function () {
    var data = {
      nama: $scope.data.email,
      tinggi: $scope.data.tinggi,
      suhu: $scope.data.suhu,
      curah_hujan: $scope.data.hujan,
      bulan_kering: $scope.data.bulan,
      ph: $scope.data.ph,
      bo: $scope.data.bo,
      kedalaman: $scope.data.kedalaman,
      kemiringan: $scope.data.kemiringan,
    }

    Lahan.tambah(data).success(function (data) {

    }, function (error) {
      console.log(error)
    });
  }
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
