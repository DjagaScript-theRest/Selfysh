'use strict';

module.exports = function ({ ImagePost }) {
    return {
        filterImagePosts({filter}) {
            filter = filter || {};
            return new Promise((resolve, reject) => {
                // let query = ImagePost.find({ filter });

                let query = [
                    {
                        "title": "Some title",
                        "author": "Pesho",
                        "createdOn": 11,
                        "imageUrl": "http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/724x5000/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
                        "likes": 3,
                        "dislikes": 2,
                        "category": "bitches",
                        "comments": [
                            "Pesho e typ",
                            "Gosho e manqk"
                        ]
                    },
                    {
                        "title": "Some biiiiiiiiiiiiiiiiiig title",
                        "author": "Gosho",
                        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/33/Big_Thunder_Mountain_at_Disneyland_IMG_3947.jpg",
                        "likes": 0,
                        "dislikes": 1,
                        "category": "fuck",
                        "comments": [
                            "Pesho e typ",
                            "Gosho e manqk",
                            "Basi mamata",
                            "raboti"
                        ]
                    }
                ]

                resolve(query);

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

            return this.filterImagePosts(category);
        },
        getImagePostsByTitle(title) {
            if (!title) {
                return Promise.reject('Should provide image post title!');
            }

            return this.filterImagePosts({ title });
        }
    };
}