'use strict';

module.exports = function ({ data }) {
    return {
        getByCategory(req, res) {
            let category = req.params[0];
            if (!category) {
                category = '';
            }

            data.getImagePostByCategory(category)
                .then((posts) => {
                    res.status(200).json(posts);
                }, (error) => {
                    res.status(404).json(error);
                });
        },
        getByTitle(req, res) {
            let title = req.params[0];
            if (!title) {
                title = '';
            }

            data.getImagePostsByTitle(title)
                .then((posts) => {
                    res.status(200).json(posts);
                }, (error) => {
                    res.status(404).json(error);
                });
        }
    };
};