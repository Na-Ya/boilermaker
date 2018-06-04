const { User } = require('../database');
const router = require('express').Router();

//mounted on '/auth', forwards to subdirectory

//forwards requests to /auth/google to googleAuth subrouter
router.use('/google', require('./googleAuth.js'));

//POST Login route for /auth/login
router.post('/login', (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then(user => {
			if (!user) {
				res.status(401).send('User not found');
			} else if (!user.correctPassword(req.body.password)) {
				res.status(401).send('Incorrect password');
			} else {
				req.login(user, err => {
					if (err) {
                        next(err);
					} else {
                        res.json(user);
					}
				});
			}
		})
		.catch(next);
});

//POST signup route for /auth/signup
router.post('/signup', (req, res, next) => {
	//assuming only fields submitted are email and password
	User.create(req.body)
		.then(user => {
			//Once the user is created, it will be set as the user on the session
			req.login(user, err => {
				if (err) {
					next(err);
				} else {
					res.json(user);
				}
			});
		})
		.catch(next);
});

//POST logout route for /auth/logout
router.post('/logout', (req, res, next) => {
	//passport attaches a logout method to req object. This will destroy the session.
	req.logout();
	res.sendStatus(200);
});

//GET route for fetching the logged in user on the session - /auth/me
//this allows us to keep the user logged in on the client even after they refresh.
router.get('/me', (req, res, next) => {
	//passport attaches the session user to the request object
	res.json(req.user);
});

//handle 404s for nonexisting auth routes;
router.use((req, res, next) => {
	const err = new Error('Not Found.');
	err.status = 404;
	next(err);
});

module.exports = router;
