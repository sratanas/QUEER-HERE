myApp.controller('OrgdetailsController',['OrganizationService',"UserService", '$routeParams','$http', 'EventService', 
function(OrganizationService, UserService, $routeParams, $http, EventService) {
    console.log('Orgdetails Controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.EventService = EventService;
    vm.orgDetails = OrganizationService.orgDetails;
    vm.getOrgEvents = EventService.getOrgEvents;
    vm.orgEvents = EventService.orgEvents;
    

    EventService.getOrgEvents($routeParams.id);

    OrganizationService.getOrgDetails($routeParams);

    OrganizationService.getOrgs();
    

  }]);


