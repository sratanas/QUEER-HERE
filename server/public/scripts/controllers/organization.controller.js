myApp.controller('OrganizationController',['OrganizationService', '$routeParams','alert', 'UserService', 'EventService', 
function(OrganizationService, $routeParams, alert, UserService, EventService) {
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

    //For filestack
    vm.uploadOrgLogo = OrganizationService.uploadOrgLogo;
    vm.org_logo = OrganizationService.org_logo;  
    vm.newOrg = OrganizationService.newOrg;

    OrganizationService.getOrgs();
    UserService.getUserOrgs();

    
  }]);