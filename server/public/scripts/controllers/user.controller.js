myApp.controller('UserController', function(UserService, OrganizationService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.OrganizationService = OrganizationService;
  vm.newOrgs = OrganizationService.newOrgs;
  vm.getUserOrgs = OrganizationService.getUserOrgs;
  OrganizationService.getUserOrgs();

});
