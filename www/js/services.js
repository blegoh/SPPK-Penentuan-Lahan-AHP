/**
 * Created by blegoh on 18/05/16.
 */
angular.module('starter.services')

  .factory('Lahan', function($http) {
    return {
      getAll: function() {
        return $http.get('http://be.com/').success(function(data) {
          console.log(data);
          return data;
        }).error(function(err) {
          console.log(err)
          return err;
        });
      },
      tambah: function (data){
        $http.post('http://be.com/api/lahan/store', data).success(function(response) {
          
        }).error(function(){
          console.log("error");
        });
      },
    };
  })
