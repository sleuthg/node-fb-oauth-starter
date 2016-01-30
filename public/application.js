
//'use strict';

// A very simple "starter kit" application for doing token-based authentication
var appName = 'tbauth';

// Defines the AngularJS main application module with all top-level direct injection (DI) dependencies
var mainAppModule = angular.module(appName, ['satellizer']);

// used for SEO: tell search engine crawlers that this is a single-page application
mainAppModule.config(['$locationProvider',
  function($locationProvider) {$locationProvider.hashPrefix('!');
  }
]);

// Solve Facebook redirect bug
if (window.location.hash === '#_=_') window.location.hash = '#!';

// Satellizer token-based authentication module for AngularJS
// https://github.com/sahat/satellizer
mainAppModule.config(['$authProvider',function($authProvider) {
  $authProvider.facebook({

    // The client Id is assigned when you Add a New App from the facebook developer webiste
    clientId: '936630229766068',

    // The authorization endpoint tells facebook which version of their oauth implementation to use
    // It's v2.5 in this case
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth'
  });
}]);

//// Service for managing the user Account
//angular.module(appName)
//  .factory('Account', function($http) {
//    return {
//      getProfile: function() {
//        return $http.get('/api/me');
//      },
//      updateProfile: function(profileData) {
//        return $http.put('api/me', profileData);
//      }
//    };
//  });

// Controller for user login function and data
// (see .config above that uses Satellizer for authentication)
mainAppModule.controller('LoginCtrl', [
  '$scope',
  '$auth',
  '$http',
  function($scope, $auth, $http) {

    // Authentication function for login
    $scope.authenticate = function authenticate(provider) {
      $auth.authenticate(provider)
        .then(function(res) {  // You could do something here if authentication succeeded
          $http.get('/api/me')
            .then(function(profile) {
              $scope.picture = profile.data.picture;
            });
        })
        .catch(function(err) {  // You could do something here if authentication failed
          if (err.status === 409) {  // This is an "email already used" error
          }
        });
    };

    // A function to check to see if there is an authenticated user logged in
    $scope.isAuthenticated = function isAuthenticated() {
      return $auth.isAuthenticated()
    };

    // Log out the user
    $scope.logout = function logout() {
      if (!$auth.isAuthenticated()) { return; }
      return $auth.logout();
    }

  }]
);


