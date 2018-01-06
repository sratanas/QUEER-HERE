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
            client.query(`INSERT INTO event (title, datetime, enddatetime, location, description, 
                    color, lesbian, gay, bi, trans, entertainment, literary, activism, 
                    healthcare, mental_health, youth, political, legal, support_group, other, org_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 
                    $15, $16, $17, $18, $19, $20, $21);`, [newEvent.title, newEvent.datetime, 
                    newEvent.enddatetime, newEvent.location, newEvent.description, newEvent.color,
                    newEvent.lesbian, newEvent.gay, newEvent.bi,newEvent.trans, newEvent.entertainment, 
                    newEvent.literary, newEvent.activism, newEvent.healthcare, newEvent.mental_health, 
                    newEvent.youth, newEvent.political, newEvent.legal, newEvent.support_group, newEvent.other, newEvent.org_id],
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