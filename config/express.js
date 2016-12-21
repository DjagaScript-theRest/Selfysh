'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = function ({ data }) {
    let app = express();

    app.use('/static', express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({
        secret: 'vesela koleda',
        cookie: { maxAge: 60 * 60 * 60 * 1000 },
        rolling: true,
        resave: true,
        saveUninitialized: false
    }));
    require('./passport')(app, data);

    return app;
};