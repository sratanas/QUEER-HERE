var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool');


router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM event;`, function (errorMakingDatabaseQuery, result) {
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
});

router.post('/', function (req, res) {
    console.log('in router post');
    var newEvent = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`INSERT INTO event (title, date, enddate) VALUES ($1, $2, $3);`, [newEvent.title, newEvent.date, newEvent.enddate],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);

                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
})

//click to add event to user profile IN PROGRESS, only working on post
router.post('/saveEventToProfile', function (req, res) {
    console.log('in save event to profile post');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`WITH my_event AS (SELECT * FROM event LIMIT 1)
            INSERT INTO users_events ("user_id", "event_id")
            VALUES ($1, (SELECT id FROM my_event));
            `, [req.user.id],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);

                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
})


// //Get events associated with a user
// router.get('/userevents', function (req, res) {
//     console.log('Users ID from eventOrgs',req.user);
//      pool.connect(function (errorConnectingToDatabase, client, done) {
//          if (errorConnectingToDatabase) {
//              console.log('error', errorConnectingToDatabase);
//              res.sendStatus(500);
//          } else {
//              client.query(`SELECT * FROM event
//              JOIN users_events ON event.id = users_events.event_id
//              WHERE users_events.user_id = 19`, function (errorMakingDatabaseQuery, result) {
//                  done();
//                  if (errorMakingDatabaseQuery) {
//                      console.log('error', errorMakingDatabaseQuery);
//                      res.sendStatus(500);
//                  } else {
//                      res.send(result.rows);
//                  }
//              });
//          }
//      });
//    });
   

module.exports = router;