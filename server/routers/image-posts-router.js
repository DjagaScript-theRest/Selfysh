'use strict';

const router = require('express').Router();

module.exports = function ({ app, controllers, upload }) {
    const imagePostsController = controllers['image-posts'];

    router
        .post('/upload', function (req, res) {
            upload(req, res, function (err) {
                console.log(req.file);
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }
                res.json({ error_code: 0, err_desc: null });
            });
        })
        .get('/', imagePostsController.getAll)
        .get('/:category', imagePostsController.getByCategory)
        .get('/:title', imagePostsController.getByTitle);

    app.use('/api/posts', router);
};