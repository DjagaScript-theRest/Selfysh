'use strict';

const multer = require('multer');

module.exports = () => {
    let upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './../../uploads');
            },
            filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        })
    }).single('file');
    return upload;
};