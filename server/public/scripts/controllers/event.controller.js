myApp.controller('EventController',['CalendarService', 'EventService', 'UserService', function(CalendarService, EventService, UserService) {
    console.log('EventController created');
    var vm = this;
    vm.CalendarService = CalendarService;
    vm.UserService = UserService;
    vm.EventService = EventService;
    vm.getEvents = CalendarService.getEvents;
    vm.saveEventToProfile = EventService.saveEventToProfile;
    vm.eventToSave = EventService.eventToSave;
    vm.eventToDelete = EventService.eventToDelete;
    vm.userEvents = UserService.userEvents;
    vm.deleteEventFromProfile = EventService.deleteEventFromProfile;  
    
  
  }]);