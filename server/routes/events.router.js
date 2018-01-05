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
            client.query(`SELECT * FROM event ORDER BY datetime ASC;`, function (errorMakingDatabaseQuery, result) {
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

//Adding a new event, need to add other fields and connect to organization.
router.post('/', function (req, res) {
    console.log('in router post');
    var newEvent = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`INSERT INTO event (title, datetime, enddatetime, description, color) VALUES ($1, $2, $3, $4, $5);`, [newEvent.title, newEvent.datetime, newEvent.enddatetime, newEvent.description, newEvent.color],
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

//click to add event to user profile 
router.post('/saveEventToProfile', function (req, res) {
    
    console.log('in save event to profile post');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`INSERT INTO users_events ("user_id", "event_id")
            VALUES ($1, $2);`, [req.user.id, req.body.id],
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

//Delete from my events 
router.delete('/deleteEventFromProfile', function (req, res) {
    console.log('in delete event from profile ');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
    
          } else {
                client.query(`DELETE FROM users_events WHERE id = $1`, [req.query.id],
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

module.exports = router;