myApp.controller('OrganizationController',['OrganizationService', function(OrganizationService) {
    console.log('Organization controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.addOrg = OrganizationService.addOrg;
    vm.newOrg = OrganizationService.newOrg;
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    OrganizationService.getOrgs();
  }]);