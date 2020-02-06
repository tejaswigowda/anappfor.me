var express = require('express')
  , router = express.Router()

router.use('/tags', require('./crud'));
router.use('/projects', require('./crud'));
router.use('/userid', require('./crud'));
router.use('/ipcam', require('./crud'));

router.use('/auth', require('./account'));

/*router.get("/getall", isLoggedIn, function(req, res){
  res.send("sdjbc");
});*/

module.exports = router




function isLoggedIn(req, res, next) {// route middleware to ensure user is logged in
  var cn = "auth"
  if(req.headers.sessionid && req.headers.email){
    req.db.collection(cn).findOne({email:req.headers.email}, function (err,result){
    console.log("here")
    console.log(result);
      if(result && result.sessions){
      console.log(result.sessions);
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
