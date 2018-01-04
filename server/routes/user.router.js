var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      id : req.user.id,
      username : req.user.username,
      bio: req.user.bio
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

//For getting orgs associated with one user for profile page
router.get('/userorgs', function (req, res) {
 console.log('Users ID from userorgs',req.user);
 if(req.isAuthenticated()) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
      if (errorConnectingToDatabase) {
          console.log('error', errorConnectingToDatabase);
          res.sendStatus(500);
      } else {
          client.query(`SELECT * FROM organizations
          JOIN users_orgs ON organizations.id = users_orgs.org_id
          WHERE users_orgs.user_id = $1`,[req.user.id], function (errorMakingDatabaseQuery, result) {
              done();
              if (errorMakingDatabaseQuery) {
                  console.log('error', errorMakingDatabaseQuery);
                  res.sendStatus(500);
              } else {
                  res.send(result.rows);
              }
          });
      }
  });
} else{
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }


});

   //Get events associated with a user for profile page
   router.get('/userevents', function (req, res) {
       console.log('Users ID from eventOrgs',req.user);
       if(req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM event
                JOIN users_events ON event.id = users_events.event_id
                WHERE users_events.user_id = $1`,[req.user.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
            }
        });
    } else{
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
      }

      });


   


module.exports = router;

