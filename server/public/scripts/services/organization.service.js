myApp.service('OrganizationService', ['$http','$routeParams', 'UserService', function($http, $location, $routeParams, UserService){
    console.log('OrganizationService loaded');
    var vm = this;


vm.organizations = [];
vm.orgDetails = [];
vm.newOrg = []
vm.orgImg = {}


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

vm.uploadOrgLogo = function(){
    var fsClient = filestack.init('AufWFCyjkTHCHrYYMIuDyz');
    console.log('uploadOrgLogo clicked');
    
    function openPicker() {
      fsClient.pick({
        fromSources:["local_file_system","imagesearch","facebook","instagram","dropbox"],
        transformations:{
        crop:{      force:true,
        aspectRatio:1},
        circle:true}
      }).then(function(response) {
        vm.newOrg.url = response.filesUploaded[0].url;
        vm.newOrg.orgImg = vm.newOrg.url;
        console.log('org_logo', vm.newOrg.orgImg);
        

        // handleFilestack(response);
      });
    }
    openPicker();
}



vm.editOrg = function(orgToEdit){
    console.log('edit Org button clicked');
    
    $http({
        method: 'PUT',
        url:'/organizations',
        data: orgToEdit
    }).then(function(response){
        console.log('response', response);
        swal("Edits Saved!","","success")
        
        // UserService.getUserOrgs();
        
    });
};

//Gets the details for the individual organization page
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



//Deletes an entire organization
vm.deleteOrg = function(orgToDelete){
    console.log('delete org clicked');
    swal({
        title: "Are you sure?",
        text: "Once deleted, this organization and all its events will be gone.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $http({
                method: 'DELETE',
                url: '/organizations/deleteOrg',
                params: orgToDelete
                
            }).then(function(response){
                console.log('response', response);
                
            })
          swal("Organization deleted", {
            icon: "success",
          });

        } else {
          swal("Organization not deleted");
        }
      });
    

    
}


}]);