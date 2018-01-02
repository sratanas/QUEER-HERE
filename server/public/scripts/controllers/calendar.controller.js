
  myApp.controller('KitchenSinkCtrl', function(moment, alert, calendarConfig, EventService, CalendarService) {
    console.log('KitchenSink created');
    var vm = this;
    vm.EventService = EventService;
    vm.getEvents = EventService.getEvents;
    vm.addEvent = EventService.addEvent;
    vm.events = EventService.events;
    vm.saveEventToProfile = EventService.saveEventToProfile;
    vm.eventToSave = EventService.eventToSave;
    vm.newEventClicked = CalendarService.newEventClicked; 
    vm.getEvents();
 



    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
   
  

    vm.cellIsOpen = true;

    // vm.addEvent = function() {
    //   vm.events.push({
    //     title: 'New event',
    //     startsAt: moment().startOf('day').toDate(),
    //     endsAt: moment().endOf('day').toDate(),
    //     color: calendarConfig.colorTypes.important,
    //     draggable: true,
    //     resizable: true
    //   });
    // };

    
    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.newEventClicked = function(event){
      alert.show('NewEventClicked', event)
    }

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

  });
