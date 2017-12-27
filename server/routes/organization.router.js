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
            client.query(`SELECT * FROM organiations;`, function (errorMakingDatabaseQuery, result) {
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
    var newOrg = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`WITH new_org AS (INSERT INTO organizations 
                (org_name, website, email, address, phone, about, lesbian, gay, bi, trans,
                entertainment, literary, activism, healthcare, mental_health, youth, political,
                legal, support_group, other) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
                RETURNING id)
                INSERT INTO users_orgs ("user_id", "org_id")
                VALUES ($21, (SELECT id FROM new_org));`,  
                [newOrg.org_name, newOrg.website, newOrg.email, newOrg.address, newOrg.phone, newOrg.about, 
                newOrg.lesbian, newOrg.gay, newOrg.bi,newOrg.trans, newOrg.entertainment, newOrg.literary,
                newOrg.activism, newOrg.healthcare, newOrg.mental_health, newOrg.youth,
                newOrg.political, newOrg.legal, newOrg.support_group, newOrg.other, req.user.id],
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
