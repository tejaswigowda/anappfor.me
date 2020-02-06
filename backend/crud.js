var express = require('express')
  , router = express.Router()

// add
router.get('/add', function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  req.query.userID = req.headers.email;
  req.db.collection(cn).insert(req.query, function (err,result){
    if(!err) res.send("1"); else res.send("0");
  });
})

// getAll
router.get('/all', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.headers.email;
  req.db.collection(cn).find({userID:userID}).toArray(function (err,result){
    res.send(JSON.stringify(result));
  });
});

// get
router.get('/get', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.headers.email;
  var id = req.query.id;
  req.db.collection(cn).findOne({id:id,userID:userID}, function (err,result){
    if(!err) res.send(result); else res.send("0");
  });
});

// delete
router.get('/delete', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.headers.email;
  var id = req.query.id;
  req.db.collection(cn).remove({id:id,userID:userID}, function (err,result){
    if(!err) res.send("1"); else res.send("0");
  });
});

// edit
router.get('/edit', isLoggedIn, function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var userID = req.headers.email;
  var id = req.query.id;
  var keys = Object.keys(req.query);
  req.db.collection(cn).findOne({id:id,userID:userID}, function (err,result){
    if(!result){
      req.query.created = req.query.modified = new Date().getTime();
      req.db.collection(cn).insert(req.query, function (err,result){
        if(!err) res.send("1"); else res.send("0");
      });
    }
    else{
      for(var i = 0; i < keys.length; i++){
        result[keys[i]] = req.query[keys[i]];
      }
      result.modified = new Date().getTime();
      req.db.collection(cn).save(result, function (err,result){
        if(!err) res.send("1"); else res.send("0");
      });
    }
  });
});
module.exports = router

function isLoggedIn(req, res, next) {// route middleware to ensure user is logged in
  var cn = "auth"
  if(req.headers.sessionid && req.headers.email){
    req.db.collection(cn).findOne({email:req.headers.email}, function (err,result){
      if(result && result.sessions){
        var sessionid = req.headers.sessionid;
        if(Object.keys(result.sessions).indexOf(sessionid) >= 0){
          var ts = result.sessions[sessionid];
          var now = new Date().getTime();
          if((now - ts) <= 24*60*60*1000){
            return next();
          }
          else{
            res.send("noauth");
          }
        }
        else{
          res.send("noauth");
        }
      }
      else{
        res.send("noauth");
      }
    });
  }
  else{
    res.send("noauth");
  }
}
