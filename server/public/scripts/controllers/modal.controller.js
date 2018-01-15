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

    //delete and edit orgs and events
    vm.editOrg = OrganizationService.editOrg;
    vm.deleteOrg = OrganizationService.deleteOrg    
    vm.editEvent = EventService.editEvent;
    vm.deleteEvent = EventService.deleteEvent;

    //for filestack
    vm.uploadOrgLogo = OrganizationService.uploadOrgLogo;
    vm.org_logo = OrganizationService.org_logo;  
    vm.newOrg = OrganizationService.newOrg;

    vm.modalData = modalData;

    if (vm.modalData.event && vm.modalData.event.datetime && vm.modalData.event.enddatetime) {
      vm.modalData.event.datetime = new Date(vm.modalData.event.datetime);
      vm.modalData.event.enddatetime = new Date(vm.modalData.event.enddatetime);
    }
       
    UserService.getUserEvents();
    UserService.getUserOrgs();

  
  
  
  }]);