const { User } = require('../database');
const router = require('express').Router();

//mounted on '/api', forwards to subdirectory
router.use('/placeholder1', require('./placeholder1'));
router.use('/placeholder2', require('./placeholder2'));


//Login route for /api/login
router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                res.status(401).send('User not found');
            }
            else if (!user.correctPassword(req.body.password)) {
                res.status(401).send('Incorrect password');
            }
            else {
                req.login(user, err => {
                    if (err) next(err);
                    else res.json(user);
                });
            }
        })
        .catch(next);
});


//handle 404s for nonexisting api routes;
router.use((req, res, next) => {
    const err = new Error('Not Found.');
    err.status = 404;
    next(err);
})

module.exports = router;