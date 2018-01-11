myApp.controller('UserController',['UserService','EventService', 'OrganizationService','$routeParams','alert',
function(UserService, EventService, OrganizationService, $routeParams, alert) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.EventService = EventService;
  vm.userObject = UserService.userObject;
  vm.OrganizationService = OrganizationService;
  vm.newOrgs = OrganizationService.newOrgs;
  vm.getUserOrgs = UserService.getUserOrgs;
  vm.userOrgs = UserService.userOrgs;
  vm.getUserEvents = UserService.getUserEvents;
  vm.userEvents = UserService.userEvents;
  vm.deleteEventFromProfile = EventService.deleteEventFromProfile;
  vm.saveEventToProfile = EventService.saveEventToProfile;
  vm.editEvent = EventService.editEvent;

  vm.getOrgEvents = function (orgid, userOrg){
    EventService.getOrgEvents(orgid).then(function(eventList){
      userOrg.events = eventList;
    });
  };

  vm.orgEvents = EventService.orgEvents;
  UserService.getUserEvents();
  UserService.getUserOrgs();

  
  



}]);
