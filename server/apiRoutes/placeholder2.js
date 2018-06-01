const router = require('express').Router();

// apiRoutes/placeholder2.js

// matches GET requests to /api/placeholder2/
router.get('/', function (req, res, next) { /* etc */});

// matches POST requests to /api/placeholder2/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/placeholder2/:placeholderId
router.put('/:placeholderId', function (req, res, next) { /* etc */});

// matches DELTE requests to /api/placeholder2/:placeholderId
router.delete('/:placeholderId', function (req, res, next) { /* etc */});

module.exports = router;
