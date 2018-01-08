myApp.service('alert', function($http, $uibModal) {
  console.log('alert loaded');
  
  
      function show(action, event) {
        if (action === 'NewEventClicked') {
        return $uibModal.open({
          templateUrl: '/views/templates/newModalContent.html',
          controller: 'ModalController as vm',
          resolve: {
            modalData:{
              action: action,
              event: event
            }
          }
          
        });
        } else if (action === 'EditOrgClicked'){
          return $uibModal.open({
            templateUrl: '/views/templates/editOrgModal.html',
            controller: 'ModalController as vm',
            resolve: {
              modalData:{
                action: action,
                event: event
              }
            }
            
          })
        }
        
        else {
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

  
});


// myApp.factory('alert', function($uibModal) {
  
//       function show(action, event) {
//         if (action === 'NewEventClicked') {
//         return $uibModal.open({
//           templateUrl: '/views/templates/newModalContent.html',
//           controller: function() {
//             var vm = this;
//             vm.action = action;
//             vm.event = event;
        
//           },
//           controllerAs: 'vm'
//         });
//         } else {
//         return $uibModal.open({
//           templateUrl: '/views/templates/modalContent.html',
//           controller: function() {
//             var vm = this;
//             vm.action = action;
//             vm.event = event;
//           },
//           controllerAs: 'vm'
//         });
//       }
//       }
  
//       return {
//         show: show
//       };

  
// });