var nodemailer = require('nodemailer');
var express = require('express')
  , router = express.Router()
var md5 = require('md5');
var url = require("url"),
	bcrypt = require("bcrypt-nodejs");
	querystring = require("querystring");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://noreply%40foxyninjastudios.com:anappfor.me2020@smtp.gmail.com');
function fullURL(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  }) + "/";
}

function sendEmail(to, sub, msg, msghtml){
  msghtml = msghtml || msg;

  var mailOptions = {
      from: '"Foxy Ninja (No-reply)" <noreply@foxyninjastudios.com>', // sender address
      to: to,
      bcc: 'noreply@foxyninjastudios.com',
      subject: sub,
      html: msghtml,
      text: msg
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       return console.log(error);
    }
    //console.log('Message sent: ' + info.response);
  });
}
router.get('/getUIDfromHash', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  var hash = info.hash;
  req.db.collection("userid").findOne({pwcode:hash}, function(err, result){
    if(result){
      var td = new Date().getTime() - result.pwresetts
      if (td > 24 *60 *60 *1000){
        res.send("-1");
        return;
      }
      res.send(result.userID);
    }
    else{
      res.send("0");
    }
  });
});


router.get('/changepass', isLoggedIn, function (req, res) {
   var incoming = url.parse(req.url).query;
   var info = querystring.parse(incoming);
   var email = req.headers.email;
   var newpass = info.newpass;
   var oldpass = info.oldpass;
  req.db.collection("auth").findOne({email:email}, function(rr, user){
   if(user){
    bcrypt.compare(oldpass, user.password, function(err0, result1) {
     if(result1){
       user.password = bcrypt.hashSync(newpass, bcrypt.genSaltSync(8), null);
        req.db.collection("auth").save(user, function(rr2, result){
          if(result){
           res.send("1");
          }
         else{
           res.send("-1");
         }
        });
     }
     else{
       res.send("-1");
     }
    });
   }
   else{
    res.send("0");
   }
  });
});


router.get('/resetpassnow', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  var newpass = info.newpass;
  var hash = info.hash;
  req.db.collection("userid").findOne({pwcode:hash}, function(err, result1){
    if(result1){
  req.db.collection("auth").findOne({email:result1.id}, function(rr, user){
        if(user){
          user.password = bcrypt.hashSync(newpass, bcrypt.genSaltSync(8), null);
  req.db.collection("auth").save(user, function(rr2, result){
             if (rr2) { 
               res.send("-1");
             }
             else {
               result1.pwcode = "";
               result1.pwresetts =  new Date().getTime();
                req.db.collection("userid").save(result1, function(err, result){
                 res.send("1");
                 var to = user.email;
                 var sub = "Your password was reset!";
                 var msg = "Your password was reset!";
                 var msghtml = msg;
                 sendEmail(to, sub, msg, msghtml);
                });
             }
          });        
        }
        else{
          res.send("0");
        }
      });
    }
  });
});

router.get('/resetpass', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  req.db.collection("auth").findOne({email:info.id}, function(rr, r){
  if(r){
     req.db.collection("userid").findOne({id:info.id}, function(err, result){
       var uid =   md5(new Date().getTime()).split("").sort(function(a,b){return -.5 + Math.random(0,1)}).toString().replace(/,/g,"");
       var pwresetts = new Date().getTime();
       var to = info.id;
       var sub = "Password Reset Link";
       var msg = "Password reset link: " + fullURL(req) + "reset#" + uid;
       var msghtml = msg;
        if(result){
            result.pwresetts = pwresetts;
            result.pwcode = uid;
            req.db.collection("userid").save(result, function(err, result){
             res.send("1");
             sendEmail(to, sub, msg, msghtml);
            });
        }
        else{
          var resave = {
            id: info.id,
            userID: info.id,
            pwresetts: pwresetts,
            pwcode: uid
          }
          req.db.collection("userid").insert(resave, function(err, result){
             res.send("1");
             sendEmail(to, sub, msg, msghtml);
          });
        } 
     });
   }
   else{
     res.send("0");
   }
  });
});


router.get('/islogin', function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  if(req.headers.sessionid && req.headers.email){
    req.db.collection(cn).findOne({email:req.headers.email}, function (err,result){
      if(result && result.sessions){
        var sessionid = req.headers.sessionid;
        if(Object.keys(result.sessions).indexOf(sessionid) >= 0){
          var ts = result.sessions[sessionid];
          var now = new Date().getTime();
          if((now - ts) <= 24*60*60*1000){
            res.send(req.headers.email);
          }
          else{
            res.send("0");
          }
        }
        else{
          res.send("0");
        }
      }
      else{
        res.send("0");
      }
    });
  }
  else{
    res.send("0");
  }
});
// logout
router.get('/logout', function(req, res) {
  var cn = req.originalUrl.replace(req.url,"").replace("/","");
  if(req.headers.sessionid && req.headers.email){
    var sessionid = req.headers.sessionid;
    var email = req.headers.email;
    req.db.collection(cn).findOne({email:req.headers.email}, function (err,result){
      delete result.sessions[sessionid]// = 0;
      req.db.collection(cn).save(result, function(err1, r){
        res.redirect('/');
      });
    });
  }
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
  var sessionid = md5(new Date().toString().split("").sort(function(a,b){return -.5 + Math.random(0,1)}).toString().replace(/,/g,""));
  var email = req.query.email;
  var password = req.query.password;
  console.log(email,password)
  req.db.collection(cn).findOne({email:email}, function (err,result){
   if(result){
     bcrypt.compare(password, result.password, function(err0, result1) {
       console.log(result1, result);
       if(result1){
         if(result.sessions){
          result.sessions[sessionid] = new Date().getTime();
         }
         else{
          result.sessions = {}
          result.sessions[sessionid] = new Date().getTime();
         }
          req.db.collection(cn).save(result, function(err1, r){
            res.end(sessionid);
          });
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
