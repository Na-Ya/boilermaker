const router = require('express').Router();

//mounted on '/api', forwards to subdirectory
router.use('/placeholder1', require('./placeholder1'));
router.use('/placeholder2', require('./placeholder2'));

//handle 404s for nonexisting api routes;
router.use((req, res, next) => {
    const err = new Error('Not Found.');
    err.status = 404;
    next(err);
})

module.exports = router;