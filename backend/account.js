var express = require('express')
  , router = express.Router()
var md5 = require('md5');
var url = require("url"),
	bcrypt = require("bcrypt-nodejs");
	querystring = require("querystring");

router.get('/islogin', function(req, res) {
  if(req.session.email){
    res.send(req.session.email);
  }
  else{
    res.send("0");
  }

});
// logout
router.get('/logout', function(req, res) {
   req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

// 
router.get('/register', function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var email = req.query.email;
  req.query.password = bcrypt.hashSync(req.query.password, bcrypt.genSaltSync(8), null);
  req.db.collection(cn).findOne({email:email}, function (err,result){
   if(result){
     res.end("0")
   }
   else{
    req.db.collection(cn).insert(req.query, function (err,result1){
      if(!err) res.send("1"); else res.send("0");
    });
   }
  });
})

// login
router.get('/login', function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  var email = req.query.email;
  var password = req.query.password;
  console.log(email);
  req.db.collection(cn).findOne({email:email}, function (err,result){
   if(result){
     bcrypt.compare(password, result.password, function(err, result1) {
       if(result1){
          req.session.email = email;
          res.end("1")
       }else{
        res.end("0")
       }
     });
   }
   else{
    res.end("0")
   } 
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


module.exports = router

function isLoggedIn(req, res, next) {// route middleware to ensure user is logged in
  if(req.session.email){
        return next();
  }
    res.send('noauth');
}
