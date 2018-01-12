myApp.service('OrganizationService', ['$http','$routeParams', 'UserService', function($http, $location, $routeParams, UserService){
    console.log('OrganizationService loaded');
    var vm = this;

console.log('routeParams is', $routeParams);


vm.organizations = [];
vm.orgDetails = [];



vm.getOrgs = function () {

    $http({
        method: 'GET',
        url: '/organizations'
    }).then(function (response) {
        console.log('response', response);
        vm.organizations = response.data;
    
        

    });
};


vm.addOrg = function (newOrg) {
    console.log('Add org button clicked');
    $http({
        method: 'POST',
        url: '/organizations',
        data: newOrg
    }).then(function (response) {
        console.log('response', response);

        
        swal("Thank you for adding an organization!","","success")
        newOrg.org_name = '';
        newOrg.website = '';
        newOrg.email ='';
        newOrg.address ='';
        newOrg.phone = ''; 
        newOrg.about = ''; 
        newOrg.lesbian = '';
        newOrg.gay = ''; 
        newOrg.bi = '';
        newOrg.trans = '';
        newOrg.entertainment = ''; 
        newOrg.literary = '';
        newOrg.activism = ''; 
        newOrg.healthcare = '';
        newOrg.mental_health = '';
        newOrg.youth = '';
        newOrg.political = ''; 
        newOrg.legal  = ''; 
        newOrg.support_group = ''; 
        newOrg.other = '';
    

    });
};

vm.editOrg = function(orgToEdit){
    console.log('edit Org button clicked');
    
    $http({
        method: 'PUT',
        url:'/organizations',
        data: orgToEdit
    }).then(function(response){
        console.log('response', response);
        console.log('org to edit', orgToEdit);
        
        // UserService.getUserOrgs();
        
    });
};

// Working on changing routeparams to a get request
vm.getOrgDetails = function(orgId){
    console.log('in getOrgDetails');
    $http({
        method: 'GET',
        url: '/organizations/orgDetails',
        params: orgId
    }).then(
        function (response) {
        console.log('response', response);
        vm.orgDetails = response.data
    })
}




}]);