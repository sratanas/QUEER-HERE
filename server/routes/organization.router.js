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
            client.query(`SELECT * FROM organizations ORDER BY org_name;`, function (errorMakingDatabaseQuery, result) {
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
//Adding new org and attaching to user  
router.post('/', function (req, res) {
    console.log('in router post');
    if(req.isAuthenticated()) {
    var newOrg = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`WITH new_org AS (INSERT INTO organizations 
                (org_name, website, email, address, phone, about, lesbian, gay, bi, trans, entertainment, literary, activism, healthcare, mental_health, youth, political, legal, support_group, other, org_logo) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
                RETURNING id)
                INSERT INTO users_orgs ("user_id", "org_id")
                VALUES ($22, (SELECT id FROM new_org));`,  
                [newOrg.org_name, newOrg.website, newOrg.email, newOrg.address, newOrg.phone, newOrg.about, 
                !!newOrg.lesbian, !!newOrg.gay, !!newOrg.bi, !!newOrg.trans, !!newOrg.entertainment, !!newOrg.literary,
                !!newOrg.activism, !!newOrg.healthcare, !!newOrg.mental_health, !!newOrg.youth,
                !!newOrg.political, !!newOrg.legal, !!newOrg.support_group, !!newOrg.other, newOrg.org_logo, req.user.id],
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
}})



//Editing org on modal
router.put('/', function (req, res) {
    console.log('editing org on modal');
    if(req.isAuthenticated()) {
    var orgToEdit = req.body;
    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`UPDATE organizations SET org_name = $1, website = $2, email = $3, address = $4, phone = $5, about = $6, 
            lesbian = $7, gay = $8, bi = $9, trans = $10, entertainment = $11, literary = $12, 
            activism = $13, healthcare = $14, mental_health = $15, youth = $16, political = $17, 
            legal = $18, support_group = $19, other = $20
            FROM users_orgs WHERE organizations.id = users_orgs.org_id
            AND users_orgs.id = $21;`,[orgToEdit.org_name, orgToEdit.website, orgToEdit.email, orgToEdit.address, orgToEdit.phone, orgToEdit.about, 
                orgToEdit.lesbian, orgToEdit.gay, orgToEdit.bi, orgToEdit.trans, orgToEdit.entertainment, orgToEdit.literary,
                orgToEdit.activism, orgToEdit.healthcare, orgToEdit.mental_health, orgToEdit.youth,
                orgToEdit.political, orgToEdit.legal, orgToEdit.support_group, orgToEdit.other, orgToEdit.id],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);

                    } else {
                        res.sendStatus(200);
                    }
                })
        }
    })
}});


router.get('/orgDetails/', function (req, res) {
    console.log('req.query.id is',req.query.id);
    console.log('in orgDetails');   
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM organizations WHERE id = $1;`,[req.query.id], function (errorMakingDatabaseQuery, result) {
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

//Deletes an entire organizations (in modal)
router.delete('/deleteOrg', function (req, res) {
    console.log('req.query.id is', req.query.id);
    
    console.log('in delete org');
    if(req.isAuthenticated()) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
    
          } else {
                client.query(`DELETE FROM "organizations"
                USING users_orgs WHERE users_orgs.org_id = organizations.id
                AND organizations.id = $1;`, [req.query.id],
                    function (errorMakingDatabaseQuery, result) {
                        done();
                        if (errorMakingDatabaseQuery) {
                            console.log('error', errorMakingDatabaseQuery);
                            res.sendStatus(500);
    
                        } else {
                            res.sendStatus(200);
                        }
                    })
            }
        })
    }});


//In progress, adding an admin to an organization
router.post('/addAdmin', function (req, res) {
    if(req.isAuthenticated()) {
    var userToAdd = req.body;
    console.log('in addAdmin', req.body);
    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`INSERT INTO users_orgs ("user_id", "org_id")
            VALUES ((SELECT id FROM users WHERE users.username = $1), (SELECT id FROM organizations WHERE organizations.id = $2));`,
            [userToAdd.userId, userToAdd.orgId],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);

                    } else {
                        res.sendStatus(200);
                    }
                })
        }
    })
}});

//Deletes an admin from an organization (in modal) IN PROGRESS, needs two parameters
router.delete('/removeAdmin', function (req, res) {
    console.log('req.query.id is', req.query.orgFrom, req.query.adminToRemove);
    
    console.log('in delete admin');
    if(req.isAuthenticated()) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
    
          } else {
                client.query(`DELETE FROM users_orgs
                WHERE users_orgs.org_id = $1
                AND users_orgs.id = $2;`, [req.query.orgFrom, req.query.adminToRemove],
                    function (errorMakingDatabaseQuery, result) {
                        done();
                        if (errorMakingDatabaseQuery) {
                            console.log('error', errorMakingDatabaseQuery);
                            res.sendStatus(500);
    
                        } else {
                            res.sendStatus(200);
                        }
                    })
            }
        })
    }});



module.exports = router;
