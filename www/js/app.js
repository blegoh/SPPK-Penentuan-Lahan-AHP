// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngMessages','starter.controllers','satellizer','starter.services','chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

  .run(function($rootScope) {
    $rootScope.typeOf = function(value) {
      return typeof value;
    };
  })

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
})

.config(function($stateProvider, $urlRouterProvider,$authProvider) {
  $authProvider.loginUrl = 'http://be.com/api/authenticate';

  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.decision', {
      url: '/decision',
      views: {
        'menuContent': {
          templateUrl: 'templates/decision.html',
          controller: 'DecisionCtrl'
        }
      }
    })
    .state('app.lahan', {
      url: '/lahan',
      views: {
        'menuContent': {
          templateUrl: 'templates/lahan.html',
          controller: 'LahanCtrl'
        }
      }
    })
    .state('app.tambah', {
      url: '/tambah',
      views: {
        'menuContent': {
          templateUrl: 'templates/tambah.html',
          controller: 'TambahCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
  })

  .state('app.detail', {
    url: '/detail/:lahanId',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail-lahan.html',
        controller: 'DetailCtrl'
      }
    }
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
