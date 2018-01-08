myApp.controller('UserController',['UserService','EventService', 'OrganizationService','$routeParams',function(UserService, EventService, OrganizationService, $routeParams, ) {
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
  UserService.getUserEvents();
  UserService.getUserOrgs();



}]);
