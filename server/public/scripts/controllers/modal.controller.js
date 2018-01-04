myApp.controller('ModalController',['UserService', 'EventService',function(UserService, EventService ) {
    console.log('ModalController created');
    var vm = this;
    vm.userService = UserService;
    vm.EventService = EventService;
    vm.events = EventService.events;
    vm.userObject = UserService.userObject;
    vm.getUserEvents = UserService.getUserEvents;
    vm.userEvents = UserService.userEvents;
    vm.saveEventToProfile = EventService.saveEventToProfile; 
    vm.action = alert.action;
    vm.event = alert.event;
    UserService.getUserEvents();
    UserService.getUserOrgs();
  
  
  
  }]);