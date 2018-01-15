
  myApp.controller('KitchenSinkCtrl',['moment', 'alert', 'calendarConfig', 'EventService', 'UserService', 
  function(moment, alert, calendarConfig, EventService, UserService) {
    console.log('KitchenSink created');
    var vm = this;
    vm.EventService = EventService;
    vm.UserService = UserService;
    vm.getEvents = EventService.getEvents;
    vm.addEvent = EventService.addEvent;
    vm.events = EventService.events;
    vm.saveEventToProfile = EventService.saveEventToProfile;
    vm.eventToSave = EventService.eventToSave;
    vm.deleteEventFromProfile = EventService.deleteEventFromProfile;   
    vm.getOrgEvents = EventService.getOrgEvents;
    vm.orgEvents = EventService.orgEvents; 
    vm.includeEvent = EventService.includeEvent;
    vm.eventFilter = EventService.eventFilter;

   
    // vm.filteredEvents = EventService.filteredEvents;
    vm.criteriaChanged = EventService.criteriaChanged;

    vm.getEvents();
    vm.criteriaChanged();

    vm.checklist = {gay: false};
    vm.filteredEvents = [];

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.cellIsOpen = true;

    
    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.newEventClicked = function(event){
      alert.show('NewEventClicked', event)
      console.log('newEventClicked', event);
      
    };

    vm.editOrgClicked = function(event) {
      alert.show('EditOrgClicked', event);
    };

    vm.editEventClicked = function(event){
      alert.show('EditEventClicked', event)
    };


    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    
    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  }]);
