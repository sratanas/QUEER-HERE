myApp.service('EventService', ['$http', function($http, $location){
    console.log('Event Serivice loaded');
    var vm = this;

vm.events = []
vm.newEvent = {};

vm.getEvents = function () {
    $http({
        method: 'GET',
        url: '/events'
    }).then(function (response) {
        console.log('response', response);
        for (var i = 0; i<response.data.length; i++){
            vm.events.push({
                title: `${response.data[i].title}`,
                startsAt: moment().subtract(1, 'day').toDate(),
                endsAt: new Date(2017,11,26),
                color: '#000000',
                draggable: true,
                resizable: true
            })
        }
        

    });
};


vm.addEvent = function (newEvent) {
    console.log('Add event button clicked');
    $http({
        method: 'POST',
        url: '/events',
        data: newEvent
    }).then(function (response) {
        console.log('response', response);
        vm.response.push({
          title:'New event',
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: true,
          resizable: true
        })
 
    });
};

// vm.events = [
//     {
        // title: 'An event',
        // color: {primary: '#e3bc08'},
        // startsAt: new Date(2017,11,1,1), // A javascript date object for when the event starts
        // endsAt: new Date(2017,11,4,1),
        // draggable: true,
        // resizable: true,
//       //   actions: actions
//       }, {
//         title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
//         color: {primary: '#e3bc08'},
//         startsAt: moment().subtract(1, 'day').toDate(),
//         endsAt: moment().add(5, 'days').toDate(),
//         draggable: true,
//         resizable: true,
//       //   actions: actions
//       }, {
//         title: 'This is a really long event title that occurs on every year',
//         color: {primary: '#e3bc08'},
//         startsAt: moment().startOf('day').add(7, 'hours').toDate(),
//         endsAt: moment().startOf('day').add(19, 'hours').toDate(),
//         recursOn: 'year',
//         draggable: true,
//         resizable: true,
//       //   actions: actions
//       }];
    

}]);

