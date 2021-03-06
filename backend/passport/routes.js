var md5 = require('md5');
var url = require("url"),
	bcrypt = require("bcrypt-nodejs");
	querystring = require("querystring");
var User       = require('./models/user');
var nodemailer = require('nodemailer');

module.exports = function(app, db, passport) {


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://noreply%40foxyninjastudios.com:anappforme2019@smtp.gmail.com');
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
/*
app.get('/emailtest', function(req, res) {
 sendEmail("contact@foxyninjastudios.com, tejaswil@gmail.com","This is a test"); 
 res.send("1");
});
*/
app.get('/loginStatus', function(req, res) {
  if (req.isAuthenticated())
    res.send(JSON.stringify(req.user));
  else
    res.send("0");
});

// LOGOUT ==============================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// LOGIN  ==============================
app.post('/tryLogin', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/#fail', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the signup form
app.post('/tryRegister', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/#freg', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/getUIDfromHash', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  var hash = info.hash;
  db.collection("userid").findOne({pwcode:hash}, function(err, result){
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


app.get('/changepass', isLoggedIn, function (req, res) {
   var incoming = url.parse(req.url).query;
   var info = querystring.parse(incoming);
   var user = req.user;
   var newpass = info.newpass;
   var oldpass = info.oldpass;
   if (user.validPassword(oldpass)){
     user.local.password = bcrypt.hashSync(newpass, bcrypt.genSaltSync(8), null);
     user.save(function(err){
         if (err) { 
           res.send("-1");
         }
         else {
           res.send("1");
         }
     });
   }
   else{
       res.send("0");
   }
});


app.get('/resetpassnow', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  var newpass = info.newpass;
  var hash = info.hash;
  db.collection("userid").findOne({pwcode:hash}, function(err, result){
    if(result){
      User.findOne({ 'local.email' :  result.id }, function(err, user) {
        if(user){
          user.local.password = bcrypt.hashSync(newpass, bcrypt.genSaltSync(8), null);
          user.save(function(err){
             if (err) { 
               res.send("-1");
             }
             else {
               result.pwcode = "";
               result.pwresetts =  new Date().getTime();
                db.collection("userid").save(result, function(err, result){
                 res.send("1");
                 var to = user.local.email;
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

app.get('/resetpass', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  User.findOne({ 'local.email' :  info.id }, function(err, user) {
  if(user){
     db.collection("userid").findOne({id:info.id}, function(err, result){
       var uid =   md5(new Date().getTime()).split("").sort(function(a,b){return -.5 + Math.random(0,1)}).toString().replace(/,/g,"");
       var pwresetts = new Date().getTime();
       var to = info.id;
       var sub = "Password Reset Link";
       var msg = "Password reset link: " + fullURL(req) + "reset#" + uid;
       var msghtml = msg;
        if(result){
            result.pwresetts = pwresetts;
            result.pwcode = uid;
            db.collection("userid").save(result, function(err, result){
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
          db.collection("userid").insert(resave, function(err, result){
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


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

