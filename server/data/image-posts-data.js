'use strict';

module.exports = function ({ ImagePost }) {
    return {
        filterImagePosts(filter, page, perPage) {
            filter = filter || {};
            page = page || 0;
            perPage = perPage || 0;
            return new Promise((resolve, reject) => {
                ImagePost.find(filter)
                    .skip(page * perPage)
                    .limit(perPage)
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
                    });
            });

        },
        getAllPosts() {
            return new Promise((resolve, reject) => {
                let query = ImagePost.find();

                resolve(query);
            });
        },
        getImagePostByCategory(category) {
            if (!category) {
                return Promise.reject('Should provide image post category!');
            }

            return this.filterImagePosts({ category });
        },
        getImagePostsByTitle(title) {
            if (!title) {
                return Promise.reject('Should provide image post title!');
            }

            return this.filterImagePosts({ title });
        },
        createImagePost(data) {
            let imagePost = new ImagePost({
                title: data.title,
                createOn: data.createdOn,
                image: {
                    fileName: data.imageName,
                    path: data.imagePath
                },
                author: {
                    username: data.author
                },
                likes: data.likes,
                comments: [],
                category: data.category,
                usersLiked: []
            });

            return new Promise((resolve, reject) => {
                imagePost.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(imagePost);
                });
            });
        },
        getPostById(id) {
            return new Promise((resolve, reject) => {
                ImagePost.findOne({ _id: id }, (err, post) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(post);
                });
            });
        },
        createComment(comment, id) {
            return this.getPostById(id)
                .then((post) => {
                    post.comments.push(comment);
                    post.save();
                });
        },
        likePost(id, username) {
            return new Promise((resolve, reject) => {
                this.getPostById(id)
                    .then((post) => {
                        post.likes++;
                        post.usersLiked.push(username)
                        post.save();

                        resolve({
                            likes: post.likes
                        });
                    }, (error) => {
                        reject(error);
                    });
            })
        }
    };
}