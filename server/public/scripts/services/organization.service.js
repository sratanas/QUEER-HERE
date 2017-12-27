myApp.service('OrganizationService', ['$http', function($http, $location, calendarConfig){
    console.log('OrganizationService loaded');
    var vm = this;

vm.organizations = []
vm.newOrg = {};

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

        
        alert('Thank you for adding an organization!')
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


}]);