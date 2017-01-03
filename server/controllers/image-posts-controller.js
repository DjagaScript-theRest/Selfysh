'use strict';

module.exports = function ({ data }) {
    return {
        getAll(req, res) {
            data.getAllPosts()
                .then((posts) => {
                    console.log(posts);
                    res.status(200).json(posts);
                }, (error) => {
                    res.status(400).json(error);
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
                    res.status(400).json(error);
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
                    res.status(400).json(error);
                });
        },
        create(req, res) {
            let post = req.body;
            data.createImagePost(post)
                .then((post) => {
                    res.status(201).json(post);
                }, (error) => {
                    res.status(400).json(error);
                });
        },
        addComment(req, res) {
            let commentContent = req.body.comment;
            let commentUser = req.body.userUsername;
            let comment = {
                commentUser,
                commentContent
            }
            let id = req.params.id;
            data.createComment(comment, id)
                .then(() => {
                    console.log('success');
                });
        },
        like(req, res) {
            let postId = req.params.id;
            let username = req.body.username;
            data.likePost(postId, username)
                .then((result) => {
                    res.status(201).json(result);
                }, (error) => {
                    res.json(error);
                })
        }
    };
};