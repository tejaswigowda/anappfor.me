var express = require('express')
  , router = express.Router()

// Domestic animals page

router.get('/domestic', function(req, res) {
  res.send('Cow, Horse, Sheep')
})

// Wild animals page

router.get('/wild', function(req, res) {
  req.db.collection("sessions").find({}).toArray(function (err,result){
    res.send(JSON.stringify(result));
  });
})

module.exports = router

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send('noauth');
}
