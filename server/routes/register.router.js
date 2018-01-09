
var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function(req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    bio: req.body.bio,
    lesbian: req.body.lesbian,
    gay: req.body.gay,
    bi: req.body.bi, 
    trans: req.body.trans,
    entertainment: req.body.entertainment, 
    literary: req.body.literary, 
    activism: req.body.activism, 
    healthcare: req.body.healthcare, 
    mental_health: req.body.mental_health, 
    youth: req.body.youth, 
    political: req.body.political,
    legal: req.body.legal, 
    support_group: req.body.support_group, 
    other: req.body.other

  };
  console.log('new user:', saveUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query(`INSERT INTO users (username, password, bio,lesbian, gay, bi, trans,
      entertainment, literary, activism, healthcare, mental_health, youth, political,
      legal, support_group, other) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
      RETURNING id`,
      [saveUser.username, saveUser.password, saveUser.bio, saveUser.lesbian, saveUser.gay, 
        saveUser.bi,saveUser.trans, saveUser.entertainment, saveUser.literary,
        saveUser.activism, saveUser.healthcare, saveUser.mental_health, saveUser.youth,
        saveUser.political, saveUser.legal, saveUser.support_group, saveUser.other],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
  });

});


module.exports = router;
