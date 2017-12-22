myApp.service('CalendarService', ['$http', function($http){
    console.log('CalendarService loaded');
    var vm = this;

    vm.events = { list: [] };
    
    vm.getEvents = function () {
      $http({
          method: 'GET',
          url: '/events/all'
      }).then(function (response) {
          console.log('response', response);
          vm.events.list = response.data;

      });
  };
  vm.getEvents();





  }]);
  