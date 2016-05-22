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

.controller('LahanCtrl', function($rootScope,$scope,$state,Lahan) {
  $scope.tambah = function(){
    $state.go('app.tambah');
  };
  $rootScope.$on('todo:lahanChanged', function() {
    $scope.showLahan();
  });
  $scope.showLahan = function(){
    Lahan.getAll().success(function (data) {
      $scope.lahans = data;
    },function(error){
      console.log(error)
    });
  };
  $scope.showLahan();
})

.controller('DetailCtrl', function($rootScope,$scope,$stateParams,$state,Lahan) {

  $scope.update = function(){
    var data = {
      name: $scope.lahan.name,
      tinggi_tempat: $scope.lahan.tinggi_tempat,
      suhu: $scope.lahan.suhu,
      curah_hujan: $scope.lahan.curah_hujan,
      jumlah_bulan_kering: $scope.lahan.jumlah_bulan_kering,
      ph: $scope.lahan.ph,
      bo: $scope.lahan.bo,
      kedalaman: $scope.lahan.kedalaman,
      kemiringan: $scope.lahan.kemiringan,
    }

    Lahan.update($stateParams.lahanId,data).success(function () {
      $scope.$emit('todo:lahanChanged');
      $state.go('app.lahan');
    });
  };

  $scope.delete = function(){
    Lahan.delete($stateParams.lahanId).success(function () {
      $scope.$emit('todo:lahanChanged');
      $state.go('app.lahan');
    });
  };

  Lahan.detail($stateParams.lahanId).success(function (data) {
    $scope.lahan = data;
  },function(error){
    console.log(error)
  });
})

.controller('TambahCtrl', function($scope,$state, Lahan){

  $scope.data = {};
  $scope.tambahLahan = function () {
    var data = {
      nama: $scope.data.nama,
      tinggi: $scope.data.tinggi,
      suhu: $scope.data.suhu,
      curah_hujan: $scope.data.hujan,
      bulan_kering: $scope.data.bulan,
      ph: $scope.data.ph,
      bo: $scope.data.bo,
      kedalaman: $scope.data.kedalaman,
      kemiringan: $scope.data.kemiringan,
    }

    Lahan.tambah(data).success(function () {
      $scope.$emit('todo:lahanChanged');
      $state.go('app.lahan');
    });
  }
})

.controller('LoginCtrl', function($scope, $ionicPopup, $state,$auth) {
  $scope.showAlert = function () {
    var alert = $ionicPopup.alert({
      title: 'Warning',
      template: 'Username atau Password salah'
    });
  }
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
      $scope.showAlert();
      console.log(error);
    });
  }
});
