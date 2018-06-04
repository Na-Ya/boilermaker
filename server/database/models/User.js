const Sequelize = require('sequelize');
const db = require('../__db.js');
const crypto = require('crypto');
const _ = require('lodash');

//define model(s) here
const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING
    },
    google_id: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    }
})

// hooks to ensure plain text password is not stored
User.addHook('beforeCreate', (instance) => {
    setSaltAndPassword(instance);
})
User.addHook('beforeUpdate', (instance) => {
    setSaltAndPassword(instance);
})


// instance methods
User.prototype.correctPassword = function (candidatePassword) {
    //returns true if password matches
    return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

//sanitize method ensures you don't send any more information than needed down to the client.
User.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
    // returns random salt
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
    // accepts a plain text password and a salt, and returns its hash
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

function setSaltAndPassword(user) {
    // we need to salt and hash again when the user enters their password for the first time
    // and do it again whenever they change it
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password, user.salt)
    }
}

module.exports = User;
