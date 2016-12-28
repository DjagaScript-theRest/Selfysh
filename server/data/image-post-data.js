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
        getImagePostByCategory(category) {
            if (!category) {
                return Promise.reject('Should provide image post category!');
            }

            return this.filter({ category });
        }
    };
}