myApp.controller('EventController',['CalendarService', 'EventService', function(CalendarService, EventService) {
    console.log('EventController created');
    var vm = this;
    vm.CalendarService = CalendarService;
    vm.getEvents = CalendarService.getEvents;
    vm.saveEventToProfile = EventService.saveEventToProfile;
    vm.eventToSave = EventService.eventToSave;

    getEvents();
  }]);