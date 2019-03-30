var url = require("url"),
	querystring = require("querystring");

var passport = require('passport');
var fs = require('fs');
var mongoURL = 'mongodb://127.0.0.1:27017/test'
var path = require('path'),
  express = require('express'),
  db = require('mongoskin').db(mongoURL);


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
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended:false
}));
require('./backend/passport/config/passport')(passport); // pass passport for configuration
require('./backend/passport/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.use(express.static(path.join(__dirname, 'frontend')));

var db = require('mongoskin').db(mongoURL);
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(require('./backend'))

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



app.listen(8080);




// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send('noauth');
}
