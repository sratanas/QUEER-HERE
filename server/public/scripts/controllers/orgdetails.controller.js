myApp.controller('OrgdetailsController',['OrganizationService',"UserService", '$routeParams','$http', function(OrganizationService, UserService, $routeParams, $http) {
    console.log('Orgdetails Controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    vm.userOrgs = UserService.userOrgs;



    angular.forEach(vm.organizations, function(organizations){
        if (organizations.id == $routeParams.id){
            vm.organizations = organizations;
        }

    })


    OrganizationService.getOrgs();
    

  }]);


