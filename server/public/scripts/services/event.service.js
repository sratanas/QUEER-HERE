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
                startsAt: moment(new Date(`${response.data[i].datetime}`)).format('MMM-DD-YYYY, hh:mm A'),
                endsAt: moment(new Date(`${response.data[i].enddatetime}`)).format('MMM-DD-YYYY, hh:mm A'),
                color: { 
                    primary: `${response.data[i].color}`, // the primary event color (should be darker than secondary)
                    secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                  },
                location: `${response.data[i].location}`,
                draggable: true,
                resizable: true,
                description: `${response.data[i].description}`,
                org_id:`${response.data[i].org_id}`
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
        swal("Thank you for adding an event!","","success")
        newEvent.title = '';
        newEvent.datetime = '';
        newEvent.enddatetime ='';
        newEvent.location ='';
        newEvent.description= ''; 
        newEvent.color = ''; 
        newEvent.lesbian = '';
        newEvent.gay = ''; 
        newEvent.bi = '';
        newEvent.trans = '';
        newEvent.entertainment = ''; 
        newEvent.literary = '';
        newEvent.activism = ''; 
        newEvent.healthcare = '';
        newEvent.mental_health = '';
        newEvent.youth = '';
        newEvent.political = ''; 
        newEvent.legal  = ''; 
        newEvent.support_group = ''; 
        newEvent.other = '';
 
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
        swal("Event added!","Find your event listings on your home page.","success")
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

