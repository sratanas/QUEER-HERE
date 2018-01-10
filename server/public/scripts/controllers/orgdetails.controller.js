myApp.controller('OrgdetailsController',['OrganizationService',"UserService", '$routeParams','$http', 'EventService', 
function(OrganizationService, UserService, $routeParams, $http, EventService) {
    console.log('Orgdetails Controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.EventService = EventService;
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    vm.userOrgs = UserService.userOrgs;
    vm.events = EventService.events
    vm.orgDetails = OrganizationService.orgDetails;
    vm.getOrgEvents = EventService.getOrgEvents;
    vm.orgEvents = EventService.orgEvents;
    // vm.getOrgDetails.OrganizationService.getOrgDetails;
    

    EventService.getOrgEvents($routeParams);

    OrganizationService.getOrgDetails($routeParams);

    OrganizationService.getOrgs();
    

  }]);


