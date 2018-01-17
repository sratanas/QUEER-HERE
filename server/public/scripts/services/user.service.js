myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.userOrgs = [];
  self.eventToSave = {};
  self.userEvents = [];
  self.orgAdmins = {list:[]};
  

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.bio = response.data.bio
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      self.userObject = {};
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  // for getting orgs associated with one user
self.getUserOrgs = function () {
    
        $http({
            method: 'GET',
            url: '/user/userorgs'
        }).then(function (response) {
            console.log('response', response);
            self.userOrgs = response.data;
        
            
    
        });
    };

     // for getting events associated with one user
 self.getUserEvents = function () {
    
        $http({
            method: 'GET',
            url: '/user/userevents'
        }).then(function (response) {
            console.log('response', response);
            self.userEvents = response.data;
        
            
    
        });
    };

    self.getUsers = function () {
        
            $http({
                method: 'GET',
                url: '/user/getUsers'
            }).then(function (response) {
                console.log('response', response);
                self.users = response.data;
            
                
        
            });
        };

    self.getOrgAdmins = function (orgId){

        $http({
            method: 'GET',
            url: '/user/getOrgAdmins',
            params: {orgId: orgId}
        }).then(function(response){
            console.log('response from getOrgAdmins', response);
            self.orgAdmins.list = response.data;
            
        })
    }
});

