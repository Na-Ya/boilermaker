const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const { db } = require('./database');
const session = require('express-session');
const passport = require('passport');

//logging middleware
app.use(morgan('dev'));

// configure and create the database store so that sessions are saved after restarting server
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });

//sync db
dbStore.sync();

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret SECRETS',
    store: dbStore,
    resave: false,
    saveUninitialized: false
  }));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

//static middleware, serving up files in public directory
app.use(express.static(path.join(__dirname, '../public')));

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// api routes, forwards all '/api' routes to apiRoute directory
app.use('/api', require('./apiRoutes'));


// Serve up static index.html file for any requests that do not match an api route;
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

// Handles 500 server errors
app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

//starting up server
const port = process.env.PORT || 3000;

//syncing db
db.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })

