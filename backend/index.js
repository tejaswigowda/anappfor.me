var express = require('express')
  , router = express.Router()

router.use('/tags', require('./crud'));
router.use('/projects', require('./crud'));
router.use('/userid', require('./crud'));

router.use('/auth', require('./account'));

/*router.get("/getall", isLoggedIn, function(req, res){
  res.send("sdjbc");
});*/

module.exports = router

function isLoggedIn(req, res, next) {// route middleware to ensure user is logged in
    if (req.isAuthenticated())
        return next();
    res.send('noauth');
}
