'use strict';

module.exports = function ({ data }) {
    return {
        getAll(req, res) {
            data.getAllPosts()
                .then((posts) => {
                    console.log(posts);
                    res.status(200).json(posts);
                }, (error) => {
                    res.status(404).json(error);
                });
        },
        getByCategory(req, res) {
            let category = req.params.category;
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
        },
        addComment(req, res) {
            console.log('Comment added');
        }
    };
};