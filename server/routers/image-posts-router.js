'use strict';

const router = require('express').Router();

module.exports = function ({ app, controllers }) {
    const imagePostsController = controllers['image-posts'];

    router
        .get('/', imagePostsController.getAll)
        .get('/:category', imagePostsController.getByCategory)
        .get('/:title', imagePostsController.getByTitle);

    app.use('/api/posts', router);
};