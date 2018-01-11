var myApp = angular.module('myApp', ['ngRoute', 'mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/organizations', {
      templateUrl: '/views/templates/organizations.html',
      controller: 'OrgdetailsController as oc' 
    })
    .when('/calendar', {
      templateUrl: '/views/templates/calendar.html',
      controller: 'LoginController as lc'
    })
    .when('/registerthankyou', {
      templateUrl: '/views/templates/registerthankyou.html',
      controller: 'LoginController as lc'
    })
    .when('/organizations/:id', {
      templateUrl:'/views/templates/orgdetails.html',
      controller:'OrgdetailsController as oc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    }).when('/createorg', {
      templateUrl: '/views/templates/createorg.html',
      controller: 'OrganizationController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
