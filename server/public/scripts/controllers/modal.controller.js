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

    //For getting and adding admins
    vm.getUsers = UserService.getUsers;
    vm.users = UserService.users;
    vm.getOrgAdmins = UserService.getOrgAdmins;
    vm.orgAdmins = UserService.orgAdmins;

    //delete and edit orgs and events
    vm.editOrg = OrganizationService.editOrg;
    vm.deleteOrg = OrganizationService.deleteOrg    
    vm.editEvent = EventService.editEvent;
    vm.deleteEvent = EventService.deleteEvent;

    //For adding/removing an admin
    vm.addAdmin = OrganizationService.addAdmin;
    vm.userToAdd = OrganizationService.userToAdd;
    vm.removeAdmin = OrganizationService.removeAdmin;

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
    UserService.getUsers();
    UserService.getOrgAdmins(modalData.event.id)

  
  
  
  }]);