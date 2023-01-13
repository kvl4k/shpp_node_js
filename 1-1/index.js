/**
 * Function to create objects with the following properties and methods.
 *
 * @param id{string} Product key
 * @param name{string}
 * @param description{string}
 * @param price{number}
 * @param brand{string}
 * @param sizes{string[]} Array sizes
 * @param activeSize{string}
 * @param quantity{number} Number of products available
 * @param date{date}
 * @param reviews{reviews[]}
 * @param images{string[]}
 * @constructor
 */
function Product(id, name, description, price, brand,
                 sizes, activeSize, quantity, date, reviews, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    this.getID = function () {
        return this.id;
    }
    this.setID = function (id) {
        this.id = id;
    }

    this.getName = function () {
        return this.name;
    }
    this.setName = function (name) {
        this.name = name;
    }

    this.getDescription = function () {
        return this.description;
    }
    this.setDescription = function (description) {
        this.description = description;
    }

    this.getPrice = function () {
        return this.price;
    }
    this.setPrice = function (price) {
        this.price = price;
    }

    this.getBrand = function () {
        return this.brand;
    }
    this.setBrand = function (brand) {
        this.brand = brand;
    }

    this.getSizes = function () {
        return this.sizes;
    }
    this.setSizes = function (sizes) {
        this.sizes = sizes;
    }

    this.getActiveSize = function () {
        return this.activeSize;
    }
    this.setActiveSize = function (activeSize) {
        this.activeSize = activeSize;
    }

    this.getQuantity = function () {
        return this.quantity;
    }
    this.setQuantity = function (quantity) {
        this.quantity = quantity;
    }

    this.getDate = function () {
        return this.date;
    }
    this.setDate = function (date) {
        this.date = date;
    }

    this.getReviews = function () {
        return this.reviews;
    }
    this.setReviews = function (reviews) {
        this.reviews = reviews;
    }

    this.getImages = function () {
        return this.images;
    }
    this.setImages = function (images) {
        this.images = images;
    }

    /**
     *
     * @param id
     * @returns {string}
     */
    this.getReviewByID = function (id) {
        const reviews = this.getReviews();
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].getID() === id) {
                return reviews[i];
            }
        }
    }

    /**
     *
     * @param parameter
     * @returns {string}
     */
    this.getImage = function (parameter) {
        const image = this.getImages();
        return parameter === undefined ? image[0] : image[parameter];
    }

    /**
     *
     * @param size
     */
    this.addSize = function (size) {
        this.getSizes().push(size);
    }

    /**
     *
     * @param size
     */
    this.deleteSize = function (size) {
        const index = this.getSizes().indexOf(size);
        if (index !== -1) {
            this.getSizes().splice(index, 1);
        }
    }

    /**
     *
     * @param review
     */
    this.addReview = function (review) {
        this.getReviews().push(review)
    }

    /**
     *
     * @param id
     */
    this.deleteReview = function (id) {
        const index = this.getReviews().indexOf(this.getReviewByID(id));
        if (index !== -1) {
            this.getReviews().splice(index, 1);
        }
    }

    /**
     * TODO перевірити метод!!!
     * @returns {number}
     */
    this.getAverageRating = function () {
        let ratings = [];
        const reviews = this.getReviews();
        for (let i = 0; i < reviews.length; i++) {
            let rating = reviews[i].getRating();
            for (let r of rating.values) {
                ratings.push(r);
            }
        }
        let averageRating = 0;
        for (let i = 0; i < ratings.length; i++) {
            averageRating += ratings[i];
        }
        return averageRating / (ratings.length - 1);
    }

}

/**
 *
 * @param {string}id
 * @param {string}author
 * @param {date}date
 * @param {string}comment
 * @param {$ObjMap}rating
 * @constructor
 */
function Review(id, author, date, comment, rating) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;

    this.getID = function () {
        return this.id;
    }
    this.setID = function (id) {
        this.id = id;
    }

    this.getAuthor = function () {
        return this.author;
    }
    this.setAuthor = function (author) {
        this.author = author;
    }

    this.getDate = function () {
        return this.date;
    }
    this.setDate = function (date) {
        this.date = date;
    }

    this.getComment = function () {
        return this.comment;
    }
    this.setComment = function (comment) {
        this.comment = comment;
    }

    this.getRating = function () {
        return this.rating;
    }
    this.setRating = function (rating) {
        this.rating = rating;
    }
}

/**
 *
 * @param products
 * @param search
 */
function searchProducts(products, search) {
    let searchResult = [];
    for (const product of products) {
        if (product.getName().indexOf(search) > 0) {
            searchResult.push(product);
        } else if (product.getDescription().indexOf(search) > 0) {
            searchResult.push(product);
        }
    }
    return searchResult;
}

function sortProducts(products, sortRule) {
    products.sort((a, b) => a[sortRule] - b[sortRule])
}



// TODO Ця частина для тесту
let one = new Product(
    "4",
    "bake",
    "hot and fresh",
    10,
    "Halya",
    ["M", "L", "S", "XS"],
    "L",
    11,
    2022,
    "revievs",
    ["image", "image1"]
);

let two = new Product(
    "2",
    "apple",
    "fresh",
    1,
    "apl",
    ["M", "L", "S", "XS"],
    "L",
    11111,
    2022,
    "revievs",
    ["image", "image1"]
);

let third = new Product(
    "3",
    "ananas",
    "fruckt",
    11,
    "africa",
    ["M", "L", "S", "XS"],
    "L",
    40,
    2022,
    "revievs",
    ["image", "image1"]
);

let products = [];
products.push(one);
products.push(two);
products.push(third);

sortProducts(products, "id");
products.forEach(product => console.log(product.id));








