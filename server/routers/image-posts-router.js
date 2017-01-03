'use strict';

const router = require('express').Router();

module.exports = function ({ app, controllers, upload, auth }) {
    const imagePostsController = controllers['image-posts'];

    router
        .post('/', auth.isAuthenticated, imagePostsController.create)
        .post('/upload', function (req, res) {
            upload(req, res, function (err) {
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }

                let filename = req.file.filename;
                let path = '/static/images';

                res.json({
                    error_code: 0,
                    err_desc: null,
                    file: {
                        filename,
                        path
                    }
                });
            });
        })
        .get('/', imagePostsController.getAll)
        .post('/:id/vote', imagePostsController.like)
        .get('/:category', imagePostsController.getByCategory)
        .post('/:id', imagePostsController.addComment)
        .get('/:title', imagePostsController.getByTitle);

    app.use('/api/posts', router);
};