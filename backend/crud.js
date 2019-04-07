var express = require('express')
  , router = express.Router()

// add
router.get('/add', function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  req.query.userID = req.user.local.email;
  req.db.collection(cn).insert(req.query, function (err,result){
    if(!err) res.send("1"); else res.send("0");
  });
})

// getAll
router.get('/all', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.user.local.email;
  req.db.collection(cn).find({userID:userID}).toArray(function (err,result){
    res.send(JSON.stringify(result));
  });
});

// get
router.get('/get', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.user.local.email;
  var id = req.query.id;
  req.db.collection(cn).findOne({id:id,userID:userID}, function (err,result){
    if(!err) res.send(result); else res.send("0");
  });
});

// delete
router.get('/delete', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.user.local.email;
  var id = req.query.id;
  req.db.collection(cn).remove({id:id,userID:userID}, function (err,result){
    if(!err) res.send("1"); else res.send("0");
  });
});

// edit
router.get('/edit', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.user.local.email;
  var id = req.query.id;
  var keys = Object.keys(req.query);
  req.db.collection(cn).findOne({id:id,userID:userID}, function (err,result){
    if(!result){
      req.db.collection(cn).insert(req.query, function (err,result){
        if(!err) res.send("1"); else res.send("0");
      });
    }
    else{
      for(var i = 0; i < keys.length; i++){
        result[keys[i]] = req.query[keys[i]];
      }
      req.db.collection(cn).save(result, function (err,result){
        if(!err) res.send("1"); else res.send("0");
      });
    }
  });
});

module.exports = router

function isLoggedIn(req, res, next) {// route middleware to ensure user is logged in
    if (req.isAuthenticated())
        return next();
    res.send('noauth');
}
