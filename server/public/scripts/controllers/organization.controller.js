myApp.controller('OrganizationController',['OrganizationService', function(OrganizationService, $routeParams) {
    console.log('Organization controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.addOrg = OrganizationService.addOrg;
    vm.newOrg = OrganizationService.newOrg;
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    vm.userOrgs = OrganizationService.userOrgs;
    vm.oneOrg = OrganizationService.oneOrg;
    // vm.organizations=OrganizationService.organizations[$routeParams.id]


    OrganizationService.getOrgs();

    
  }]);