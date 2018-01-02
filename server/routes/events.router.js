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
// How can we return just the one clicked on? only works with LIMIT 1 
//but that means it only grabs the first one no matter what we click on 
//in the array.
router.post('/saveEventToProfile', function (req, res) {
    console.log('in save event to profile post');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`WITH my_event AS (SELECT * FROM event LIMIT 1)
            INSERT INTO users_events ("user_id", "event_id")
            VALUES ($1, (SELECT id FROM my_event));`, [req.user.id],
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