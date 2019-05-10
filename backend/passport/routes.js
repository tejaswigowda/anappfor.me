var md5 = require('md5');
var url = require("url"),
	bcrypt = require("bcrypt-nodejs");
	querystring = require("querystring");
var User       = require('./models/user');
module.exports = function(app, passport) {

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://noreply%40foxyninjastudios.com:anappforme2019@smtp.gmail.com');
var mongoURL = 'mongodb://127.0.0.1:27017/test'
var db = require('mongoskin').db(mongoURL);

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
    successRedirect : '/index.html', // redirect to the secure profile section
    failureRedirect : '/index.html#fail', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the signup form
app.post('/tryRegister', passport.authenticate('local-signup', {
    successRedirect : '/index.html', // redirect to the secure profile section
    failureRedirect : '/index.html#freg', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

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
           res.send("issue");
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
});

app.get('/resetpass', function (req, res) {
  var incoming = url.parse(req.url).query;
  var info = querystring.parse(incoming);
  User.findOne({ 'local.email' :  info.id }, function(err, user) {
  if(user){
     user.local.password = bcrypt.hashSync(info.pass, bcrypt.genSaltSync(8), null);
     var tk = info.tk;
     var uid =  md5(new Date().getTime()).split("").sort(function(a,b){return -.5 + Math.random(0,1)}).toString().replace(/,/g,"")
         user.save(function(err){
             if (err) { 
               res.send("0");
             }
             else {
               res.send("1");
               result.lostPToken = "";
               mailOptions.to = info.id;
               transporter.sendMail(mailOptions, function(error, info){
                   if(error){
                      return console.log(error);
                   }
                   //console.log('Message sent: ' + info.response);
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

