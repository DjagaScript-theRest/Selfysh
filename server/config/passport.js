'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = function (app, data) {
    app.use(passport.initialize());
    app.use(passport.session());

    let strategy = new LocalStrategy(
        function (username, password, done) {
            data.getByUsername(username)
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }

                    if (!user.authenticate(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }

                    return done(null, user);
                })
                .catch((err) => {
                    console.log(err)
                });
        });

    passport.use(strategy);

    passport.serializeUser(function (user, done) {
        if (!user) {
            return done(null, false);
        }

        return done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        data.getUserById(id)
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }

                done(null, user)
            })
            .catch((err) => {
                done(err, null);
            });
    });
};