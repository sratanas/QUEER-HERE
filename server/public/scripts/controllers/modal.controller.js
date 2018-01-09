myApp.controller('ModalController',['UserService', 'EventService', 'alert','OrganizationService','modalData',
function(UserService, EventService, alert, OrganizationService, modalData) {
    console.log('ModalController created');
    var vm = this;
    vm.userService = UserService;
    vm.EventService = EventService;
    vm.events = EventService.events;
    vm.userObject = UserService.userObject;
    vm.getUserEvents = UserService.getUserEvents;
    vm.userEvents = UserService.userEvents;
    vm.saveEventToProfile = EventService.saveEventToProfile;
    vm.editOrg = OrganizationService.editOrg;
    vm.action = alert.action;
    vm.event = alert.event;
    vm.modalData = modalData;


   
    UserService.getUserEvents();
    UserService.getUserOrgs();

  
  
  
  }]);