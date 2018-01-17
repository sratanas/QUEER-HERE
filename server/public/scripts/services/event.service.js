myApp.service('EventService', ['$http','$location','calendarConfig','alert', 'UserService','filterFilter', 
function($http, $location, calendarConfig, alert, UserService, filterFilter){
    console.log('Event Serivice loaded');
    var vm = this;

vm.events = [];
vm.orgEvents = {list:[]};


vm.getEvents = function () {
    vm.events = [];
    $http({
        method: 'GET',
        url: '/events'
    }).then(function (response) {
        console.log('response', response);
        for (var i = 0; i<response.data.length; i++){
            vm.events.push({
                id: response.data[i].id,
                title: response.data[i].title,
                startsAt: new Date(response.data[i].datetime),
                endsAt: new Date(response.data[i].enddatetime),
                color: { 
                    primary: response.data[i].color, // the primary event color (should be darker than secondary)
                    secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                  },
                location: response.data[i].location,
                draggable: true,
                resizable: true,
                description: response.data[i].description,
                org_id:response.data[i].org_id,
                gay: response.data[i].gay,
                lesbian: response.data[i].lesbian,
                bi :response.data[i].bi,
                trans: response.data[i].trans,
                entertainment: response.data[i].entertainment, 
                literary: response.data[i].literary,
                activism: response.data[i].activism, 
                healthcare: response.data[i].healthcare,
                mental_health: response.data[i].mental_health,
                youth: response.data[i].youth,
                political: response.data[i].political,
                legal: response.data[i].legal, 
                support_group: response.data[i].support_group, 
                other: response.data[i].other,
            })
        }
     
        
    });
};

vm.newEvent

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
    console.log('orgid', orgid);
    return $http({
            method: 'GET',
            url: '/events/orgEvents',
            params: {orgid: orgid}
        }).then(function (response) {
            console.log('getOrgEvents response', response);
            vm.orgEvents.list = response.data;
            
            return response.data;
    
        });
    };



vm.editEvent = function(eventToEdit){
     console.log('edit event button clicked');
        
    $http({
        method: 'PUT',
        url:'/events',
        data: eventToEdit
    }).then(function(response){
        console.log('edit Event response', response);
        console.log('EventtoEdit', eventToEdit);
        
    });
};


vm.deleteEvent = function(eventToDelete){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this event",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $http({
                method: 'DELETE',
                url: '/events/deleteEvent',
                params: eventToDelete
                
            }).then(function(response){
                console.log('response', response);
                
            })
          swal("Event deleted", {
            icon: "success",
          });
        } 
      });
    

}



vm.criteriaChanged = function (criteria) {
    console.log(criteria);

    vm.filteredEvents = filterFilter(vm.events, criteria)
    // vm.getEvents();
    console.log('vm.events', vm.events);
    
    console.log('EVENTS', vm.filteredEvents);
        
 }


}]);

