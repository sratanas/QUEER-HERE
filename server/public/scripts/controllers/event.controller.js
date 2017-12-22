myApp.controller('EventController',['CalendarService', function(CalendarService) {
    console.log('EventController created');
    var vm = this;
    vm.CalendarService = CalendarService;
    vm.getEvents = CalendarService.getEvents;
    
  }]);