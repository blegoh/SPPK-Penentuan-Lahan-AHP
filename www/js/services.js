angular.module('starter.services',[])

  .factory('Lahan', function($http) {
    return {
      getAll: function() {
        return $http.get('http://be.com/api/lahan/').success(function(data) {
          console.log(data);
          return data;
        }).error(function(err) {
          console.log(err)
          return err;
        });
      },
      tambah: function (data){
        console.log(data);

        $http.post('http://be.com/api/lahan/', data).success(function(response) {
          console.log('asu');
        }).error(function(){
          console.log("error");
        });
      },
    };
  })
