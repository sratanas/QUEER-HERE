myApp.service('EventService', ['$http', function($http, $location, calendarConfig){
    console.log('Event Serivice loaded');
    var vm = this;

vm.events = [];
vm.newEvent = {};
// vm.eventToSave = {};
// vm.userEvents = [];

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
                startsAt: new Date(`${response.data[i].date}`),
                endsAt: new Date(`${response.data[i].enddate}`),
                starttime: new Date(2017,11,26),
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

//  // for getting events associated with one user
//  vm.getUserEvents = function () {
    
//         $http({
//             method: 'GET',
//             url: '/events/userevents'
//         }).then(function (response) {
//             console.log('response', response);
//             vm.userEvents = response.data;
        
            
    
//         });
//     };



}]);

