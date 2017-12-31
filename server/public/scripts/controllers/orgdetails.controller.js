myApp.controller('OrgdetailsController',['OrganizationService', '$routeParams','$http', function(OrganizationService, $routeParams, $http) {
    console.log('Orgdetails Controller created');
    var vm = this;
    vm.OrganizationService = OrganizationService;
    vm.getOrgs = OrganizationService.getOrgs;
    vm.organizations = OrganizationService.organizations;
    vm.getClickedOrg = OrganizationService.getClickedOrg;
    vm.userOrgs = OrganizationService.userOrgs;
    vm.oneOrg = OrganizationService.oneOrg;
    vm.message = OrganizationService.message;
    vm.org_name = OrganizationService.org_name;


    angular.forEach(vm.organizations, function(organizations){
        if (organizations.id == $routeParams.id){
            vm.organizations = organizations;
        }

    })

    // angular.forEach(vm.userOrgs, function(userOrgs){
    //     if(userOrgs.id == $routeParams.id){
    //         vm.userOrgs = userOrgs;
    //     }
    // })

    OrganizationService.getOrgs();
    

  }]);


