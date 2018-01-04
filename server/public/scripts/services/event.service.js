myApp.service('EventService', ['$http','$location','calendarConfig','alert', function($http, $location, calendarConfig, alert){
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
                id: `${response.data[i].id}`,
                title: `${response.data[i].title}`,
                startsAt: moment(new Date(`${response.data[i].datetime}`)),
                endsAt: new Date(`${response.data[i].enddate}`),
                starttime: (`${response.data[i].starttime}`),
                color: { 
                    primary: '#e3bc08', // the primary event color (should be darker than secondary)
                    secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                  },
                draggable: true,
                resizable: true,
                description: `${response.data[i].description}`
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
//Saves an event to a table with associated ID. Error, will only save first one.
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

vm.deleteEventFromProfile = function(eventToDelete){
    console.log('delete event clicked');
    $http({
        method: 'DELETE',
        url: '/events/deleteEventFromProfile',
        params: eventToDelete
        
    }).then(function(response){
        console.log('response', response);
        
    })
    
}



}]);

// new Date(`${response.data[i].date}`),

