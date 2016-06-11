angular.module('starter.services',[])

  .factory('Lahan', function($http) {
    return {
      getAll: function() {
        return $http.get('http://be.com/api/lahan').success(function(data) {
          return data;
        }).error(function(err) {
          console.log(err)
          return err;
        });
      },
      tambah: function (data){
        return $http.post('http://be.com/api/lahan', data).success(function(response) {
          return response;
        }).error(function(){
          console.log("error");
        });
      },
      detail: function (id) {
        return $http.get('http://be.com/api/lahan/'+id).success(function(data) {
          return data;
        }).error(function(err) {
          console.log(err)
          return err;
        });
      },
      update: function (id,data) {
        return $http.put('http://be.com/api/lahan/'+id, data).success(function(response) {
          return response;
        }).error(function(){
          console.log("error");
        });
      },
      delete: function (id) {
        return $http.delete('http://be.com/api/lahan/'+id).success(function(response) {
          return response;
        }).error(function(){
          console.log("error");
        });
      },
    };
  })

  .factory('Auth', function($http,$rootScope,$auth) {
    return {
      login: function(credentials) {
        return $auth.login(credentials).then(function() {
          $http.get('http://be.com/api/authenticate/user').success(function(response){
            var user = JSON.stringify(response.user);
            localStorage.setItem('user', user);
            //$rootScope.currentUser = response.user;
          }).error(function(error){
              console.log("asu");
          })
        }, function(error) {
          console.log(error);
        });
      },
      getAuthUser: function () {
        return localStorage.getItem('user');
      },
      register: function (data) {
        return $http.post('http://be.com/api/register',data);
      }
    };
  })
