myApp.service('OrganizationService', ['$http','$routeParams', 'UserService', function($http, $location, $routeParams, UserService){
    console.log('OrganizationService loaded');
    var vm = this;


vm.organizations = [];
vm.orgDetails = [];
vm.newOrg = {}
vm.orgImg = {};
// vm.userToAdd = {};


vm.getOrgs = function () {

    $http({
        method: 'GET',
        url: '/organizations'
    }).then(function (response) {
        console.log('response', response);
        vm.organizations = response.data;
    
        

    });
};


vm.addOrg = function () {
    console.log('Add org button clicked');
    $http({
        method: 'POST',
        url: '/organizations',
        data: vm.newOrg
    }).then(function (response) {
        console.log('response', response);

        
        swal("Thank you for adding an organization!","","success")
        vm.newOrg.org_name = '';
        vm.newOrg.website = '';
        vm.newOrg.email ='';
        vm.newOrg.address ='';
        vm.newOrg.phone = ''; 
        vm.newOrg.about = ''; 
        vm.newOrg.lesbian = '';
        vm.newOrg.gay = ''; 
        vm.newOrg.bi = '';
        vm.newOrg.trans = '';
        vm.newOrg.entertainment = ''; 
        vm.newOrg.literary = '';
        vm.newOrg.activism = ''; 
        vm.newOrg.healthcare = '';
        vm.newOrg.mental_health = '';
        vm.newOrg.youth = '';
        vm.newOrg.political = ''; 
        vm.newOrg.legal  = ''; 
        vm.newOrg.support_group = ''; 
        vm.newOrg.other = '';
    

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
        vm.newOrg.org_logo = vm.newOrg.url;
        console.log('org_logo', vm.newOrg.org_logo);

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

vm.addAdmin = function(userToAdd,orgToAdd){
    console.log('in addAdmin');
    $http({
        method: 'POST',
        url: '/organizations/addAdmin',
        data: {
            userId: userToAdd,
            orgId: orgToAdd
        }
    }).then(
        function (response) {
        swal("You added " + userToAdd + " as an Admin!","","success") 
        console.log('response from addAdmin', response);
    })
}

//Removes and admin from an organization
vm.removeAdmin = function(adminToRemove, orgFrom){
    console.log('delete org clicked');
    swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $http({
                method: 'DELETE',
                url: '/organizations/removeAdmin',
                params: {
                    adminToRemove,
                    orgFrom
                }
                
            }).then(function(response){
                console.log('response', response);
                
            })
          swal("Admin deleted", {
            icon: "success",
          });

        } else {
          swal("Admin not deleted");
        }
      });
      
}

}]);