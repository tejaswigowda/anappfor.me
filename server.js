var AWS = require('aws-sdk');
AWS.config.loadFromPath('./backend/aws/credentials.json');
var s3 = new AWS.S3();

var url = require("url"),
	querystring = require("querystring");

var passport = require('passport');
var fs = require('fs');
var path = require('path');
var express = require('express');
var mongoURL = 'mongodb://127.0.0.1:27017/test'
var db = require('mongoskin').db(mongoURL);


var mongoose = require('mongoose');
mongoose.connect(mongoURL);

var app = express();
var secret = 'test' + new Date().getTime().toString()

var session = require('express-session');
app.use(require("cookie-parser")(secret));
var MongoStore = require('connect-mongo')(session);
app.use(session( {store: new MongoStore({
   url: mongoURL,
   secret: secret
})}));
app.use(passport.initialize());
app.use(passport.session());
var flash = require('express-flash');
app.use( flash() );

var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(methodOverride());
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended:true
}));
require('./backend/passport/config/passport')(passport); // pass passport for configuration
require('./backend/passport/routes.js')(app, db, passport); // load our routes and pass in our app and fully configured passport


app.use(express.static(path.join(__dirname, 'frontend')));

var db = require('mongoskin').db(mongoURL);
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(require('./backend'))
app.use(require('express-formidable')());

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}



app.post('/uploadImage', function(req, res){
    var intname = req.fields.fileInput;
    var s3Path = '/' + intname;
    var buf = new Buffer(req.fields.data.replace(/^data:image\/\w+;base64,/, ""),'base64');
    var params = {
        Bucket:'anappfor.me',
        ACL:'public-read',
        Key:intname,
        Body: buf,
        ServerSideEncryption : 'AES256'
    };
    s3.putObject(params, function(err, data) {
        console.log(err);
        res.end("success");
    });
});

app.post('/uploadFile', function(req, res){
    var intname = req.fields.fileInput;
    var filename = req.files.file.name;
    var fileType =  req.files.file.type;
    var tmpPath = req.files.file.path;
    var s3Path = '/' + intname;

    fs.readFile(tmpPath, function (err, data) {
        var params = {
            Bucket:'anappfor.me',
            ACL:'public-read',
            Key:intname,
            Body: data,
            ServerSideEncryption : 'AES256'
        };
        s3.putObject(params, function(err, data) {
            res.end("success");
            console.log(err);
        });
    });
  });

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

app.get('/reset', function(req, res){
  res.sendFile(path.join(__dirname, './frontend', 'reset.html'));
});

// DO NOT DO app.listen() unless we're testing this directly
if (require.main === module) { app.listen(8080); }
// Instead do export the app:
else{ module.exports = app; }





// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send('noauth');
}
