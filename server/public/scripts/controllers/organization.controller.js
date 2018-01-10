myApp.controller('OrganizationController',['OrganizationService', '$routeParams','alert', 'modalData', 'UserService', 'EventService', 
function(OrganizationService, $routeParams, alert, modalData, UserService, EventService) {
    console.log('Organization controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.addOrg = OrganizationService.addOrg;
    vm.newOrg = OrganizationService.newOrg;
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    vm.userOrgs = OrganizationService.userOrgs;
    vm.editOrg = OrganizationService.editOrg;
    vm.getUserOrgs = UserService.getUserOrgs;
    vm.orgEvents = EventService.orgEvents;
    vm.action = alert.action;
    vm.event = alert.event;
    vm.modalData = modalData;
    

    OrganizationService.getOrgs();
    UserServicer.getUserOrgs();

    
  }]);