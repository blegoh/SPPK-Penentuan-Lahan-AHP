angular.module('starter.services',[])

  .factory('Lahan', function($http) {
    return {
      getAll: function() {
        return $http.get('http://be.com/api/lahan').success(function(data) {
          console.log(data)
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
    };
  })
