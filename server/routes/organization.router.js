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
    var newOrg = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`WITH new_org AS (INSERT INTO organizations 
                (org_name, website, email, address, phone, about, lesbian, gay, bi, trans, entertainment, literary, activism, healthcare, mental_health, youth, political, legal, support_group, other) 
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

//Editing org on modal
router.put('/', function (req, res) {
    console.log('in router post');
    var orgToEdit = req.body;
    console.log('req.body in put', req.body);
    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);

        } else {
            client.query(`UPDATE organizations SET org_name = $1
            FROM users_orgs WHERE organizations.id = users_orgs.org_id
            AND users_orgs.id = $2;`,[orgToEdit.org_name, orgToEdit.id],
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
})


//working on route params
// router.get('/:id', function (req, res) {
//     console.log('req.query.id is',req.query.id);
    
//     pool.connect(function (errorConnectingToDatabase, client, done) {
//         if (errorConnectingToDatabase) {
//             console.log('error', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`SELECT * FROM organizations WHERE id = $1;`,[req.query.id], function (errorMakingDatabaseQuery, result) {
//                 done();
//                 if (errorMakingDatabaseQuery) {
//                     console.log('error', errorMakingDatabaseQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.send(result.rows);
//                 }
//             });
//         }
//     });
// });





module.exports = router;





// WITH org_edit AS (UPDATE organizations SET 
//     org_name = $1, website = $2, email = $3, address = $4, phone = $5, about = $6, 
//     lesbian = $7, gay = $8, bi = $9, trans = $10, entertainment = $11, literary = $12, 
//     activism = $13, healthcare = $14, mental_health = $15, youth = $16, political = $17, 
//     legal = $18, support_group = $19, other = $21 WHERE id = $22 RETURNING *)
//     SELECT * FROM org_edit;`
//     [orgToEdit.org_name, orgToEdit.website, orgToEdit.email, orgToEdit.address, orgToEdit.phone, orgToEdit.about, 
//     orgToEdit.lesbian, orgToEdit.gay, orgToEdit.bi, orgToEdit.trans, orgToEdit.entertainment, orgToEdit.literary,
//     orgToEdit.activism, orgToEdit.healthcare, orgToEdit.mental_health, orgToEdit.youth,
//     orgToEdit.political, orgToEdit.legal, orgToEdit.support_group, orgToEdit.other, orgToEdit.id]

// UPDATE organizations SET org_name = $1
// FROM users_orgs
// WHERE users_orgs.org_id = $2;

// UPDATE organizations SET org_name = $1
// FROM users_orgs
// WHERE users_orgs.org_id = $2;