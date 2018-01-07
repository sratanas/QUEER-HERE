myApp.service('EventService', ['$http','$location','calendarConfig','alert', 'UserService', function($http, $location, calendarConfig, alert, UserService){
    console.log('Event Serivice loaded');
    var vm = this;

vm.events = [];
vm.newEvent = {};
vm.orgEvents = [];


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
                startsAt: moment(new Date(`${response.data[i].datetime}`)).format('MMM-DD-YYYY, hh:mm'),
                endsAt: moment(new Date(`${response.data[i].enddatetime}`)).format('MMM-DD-YYYY, hh:mm'),
                color: { 
                    primary: `${response.data[i].color}`, // the primary event color (should be darker than secondary)
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
//Saves an event to a table with associated ID. Not working in modals now
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
        UserService.getUserEvents();
       
        
    })
    
}

vm.getOrgEvents = function (orgid) {
    
        $http({
            method: 'GET',
            url: '/events/orgEvents',
            params: orgid
        }).then(function (response) {
            console.log('response', response);
            vm.orgEvents = response.data;
        
            
    
        });
    };




}]);

// new Date(`${response.data[i].date}`),

