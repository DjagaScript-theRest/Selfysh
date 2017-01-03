'use strict';

const express = require('express');
const multer = require('multer');
const app = express();
const stage = process.env.NODE_ENV || 'development';
const config = require('./config/config')[stage];
const passport = require('passport');
const database = require('./config/database')(config);
const data = require('./data')();
const encryption = require('./utilities/encryption');
const auth = require('./config/auth')(encryption);

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, config.rootPath + '/public/images');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    })
}).single('file');

require('./config/express')(config, app);
const controllers = require('./controllers')({ app, encryption, data, passport });
require('./routers')({ app, controllers, passport, upload, auth });

app.listen(config.port, () => console.log('Server running at port : ' + config.port));