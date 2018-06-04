const { User } = require('../database');
const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//mounted on '/auth/google'

// collect our google configuration into an object
const googleConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback'
};

// this is the STRATEGY function that wil be invoked after google sends us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(
	token,
	refreshToken,
	profile,
	done
) {
	const google_id = profile.id;
	const name = profile.displayName;
	const email = profile.emails[0].value;

	User.findOne({ where: { google_id: google_id } })
		.then(function(user) {
			if (!user) {
				return User.create({ name, email, google_id }).then(function(newUser) {
					done(null, newUser);
				});
			} else {
				done(null, user);
			}
		})
		.catch(done);
});

//Registers Strategy with passport
passport.use(strategy);


//GET request to '/auth/google'
router.get('', passport.authenticate('google', { scope: 'email' }));

//GET request to the callback we've configured with Google
router.get(
	'/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);

//handle 404s for nonexisting auth routes;
router.use((req, res, next) => {
	const err = new Error('Not Found.');
	err.status = 404;
	next(err);
});

module.exports = router;
