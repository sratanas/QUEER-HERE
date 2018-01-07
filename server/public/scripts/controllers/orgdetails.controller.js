myApp.controller('OrgdetailsController',['OrganizationService',"UserService", '$routeParams','$http', 'EventService', function(OrganizationService, UserService, $routeParams, $http, EventService) {
    console.log('Orgdetails Controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.EventService = EventService;
    // vm.UserService = UserService;
    // vm.userObject = UserService.userObject
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    vm.userOrgs = UserService.userOrgs;
    vm.events = EventService.events
    vm.getOrgDetails = OrganizationService.getOrgDetails;
    vm.orgDetails = OrganizationService.orgDetails;
    vm.getOrgEvents = EventService.getOrgEvents;
    vm.orgEvents = EventService.orgEvents;

    EventService.getOrgEvents($routeParams);




    angular.forEach(vm.organizations, function(organizations){
        if (organizations.id == $routeParams.id){
            vm.organizations = organizations;
        }

    })


    OrganizationService.getOrgs();
    

  }]);


