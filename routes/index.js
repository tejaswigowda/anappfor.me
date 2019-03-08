var express = require('express')
  , router = express.Router()

router.use('/projects', require('./projects'))

module.exports = router
