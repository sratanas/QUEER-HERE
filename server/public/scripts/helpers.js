myApp.factory('alert', function($uibModal) {
  
      function show(action, event) {
        if (action === 'NewEventClicked') {
        return $uibModal.open({
          templateUrl: '/views/templates/newModalContent.html',
          controller: function() {
            var vm = this;
            vm.action = action;
            vm.event = event;
        
          },
          controllerAs: 'vm'
        });
        } else {
        return $uibModal.open({
          templateUrl: '/views/templates/modalContent.html',
          controller: function() {
            var vm = this;
            vm.action = action;
            vm.event = event;
          },
          controllerAs: 'vm'
        });
      }
      }
  
      return {
        show: show
      };

      vm.saveEventToProfile = function(eventToSave){
        console.log('save event to profile button clicked');
        $http({
            method: 'POST',
            url: '/events/saveEventToProfile',
            data: eventToSave
        }).then(function (response){
            console.log('response', response);
            
        })
    }
  
});