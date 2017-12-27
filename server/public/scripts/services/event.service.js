myApp.service('EventService', ['$http', function($http, $location, calendarConfig){
    console.log('Event Serivice loaded');
    var vm = this;

vm.events = [];
vm.newEvent = {};

vm.getEvents = function () {
    vm.events = [];
    $http({
        method: 'GET',
        url: '/events'
    }).then(function (response) {
        console.log('response', response);
        for (var i = 0; i<response.data.length; i++){
            vm.events.push({
                title: `${response.data[i].title}`,
                startsAt: new Date(2017,11,26),
                endsAt: new Date(2017,11,26),
                date: new Date(2017,11,26),
                color: { 
                    primary: '#e3bc08', // the primary event color (should be darker than secondary)
                    secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                  },
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
 
    });
};


}]);

