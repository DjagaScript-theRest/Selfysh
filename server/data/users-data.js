'use strict';

module.exports = function ({ User }) {
    return {
        filterUsers(filter, page, perPage) {
            filter = filter || {};
            page = page || 0;
            perPage = perPage || 0;
            return new Promise((resolve, reject) => {
                User.find(filter)
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
        getUserById(id) {
            if (!id) {
                return Promise.reject('Id should be provided!');
            }

            return new Promise((resolve, reject) => {
                this.filterUsers({ '_id': id })
                    .then((users) => {
                        resolve(users[0]);
                    }, (err) => {
                        reject(err);
                    });
            });
        },
        getByUsername(username) {
            if (!username) {
                return Promise.reject('Username should br provided!');
            }

            return new Promise((resolve, reject) => {
                this.filter({ username })
                    .then((users) => {
                        resolve(users[0]);
                    }, (err) => {
                        reject(err);
                    });
            });
        }
    };
};