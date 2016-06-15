angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $auth,$rootScope) {

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
  console.log($rootScope.currentUser);
  $scope.showLahan = function(){
    Lahan.getAll().success(function (data) {
      $scope.lahans = data;
    },function(error){
      console.log(error)
    });
  };
  $scope.showLahan();
})

.controller('DecisionCtrl', function($rootScope,$scope,$state) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

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

.controller('LoginCtrl', function($scope,$rootScope,$ionicPopup, $state,$auth,$http) {
  $scope.showAlert = function () {
    var alert = $ionicPopup.alert({
      title: 'Warning',
      template: 'Username atau Password salah'
    });
  }
  $scope.data = {};
  $scope.register = function () {
    $state.go('register');
  }
  $scope.login = function() {

    var credentials = {
      email: $scope.data.email,
      password: $scope.data.password
    }

    $auth.login(credentials).then(function () {
      $http.get('http://be.com/api/authenticate/user').success(function(response){
        var user = JSON.stringify(response.user);
        localStorage.setItem('user', user);
        $rootScope.authenticated = true;
        $rootScope.currentUser = response.user;
        console.log($rootScope.currentUser);
        $state.go('app.lahan');
      }).error(function(error){
        console.log("asu");
      })
    }, function (error) {
      $scope.showAlert();
    });
  }

})

.controller('RegisterCtrl', function($scope, $ionicPopup, $state,Auth) {
  $scope.data = {};
  $scope.register = function () {
    var data = {
      email: $scope.data.email,
      name: $scope.data.name,
      password: $scope.data.password
    }

    Auth.register(data).success(function () {
      $state.go('login');
    })
  }
  $scope.back= function () {
    $state.go('login');
  }
})

.controller('AccountCtrl', function($scope, $rootScope, $state,Auth,$auth) {
  $scope.data = {};
  $scope.update = function () {
    var data = {
      email: $scope.user.email,
      name: $scope.user.name
    };

    Auth.register(data).success(function () {
      $state.go('login');
    })
  };
  $scope.user = $rootScope.currentUser;
  $scope.logout = function () {
    $auth.logout().then(function() {

      // Remove the authenticated user from local storage
      localStorage.removeItem('user');

      // Flip authenticated to false so that we no longer
      // show UI elements dependant on the user being logged in
      $rootScope.authenticated = false;

      // Remove the current user info from rootscope
      $rootScope.currentUser = null;
    });
  }
});
