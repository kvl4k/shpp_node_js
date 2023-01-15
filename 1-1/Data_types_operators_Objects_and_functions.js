/**
 * Function to create objects with the following properties and methods.
 *
 * @param id{string} Product key
 * @param name{string} Product name
 * @param description{string} Description of this product
 * @param price{number} Price value for one unit
 * @param brand{string} Brand of product
 * @param sizes{string[]} Array sizes
 * @param activeSize{string} Selected size
 * @param quantity{number} Number of products available
 * @param date{Date} Current date
 * @param reviews{Review} Array of objects "Review"
 * @param images{string[]} Array of images of this product
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
    this.reviews = new Array({reviews});
    this.images = images;

    this.getID = () => this.id;
    this.setID = (id) => this.id = id;

    this.getName = () => this.name;
    this.setName = (name) => this.name = name;

    this.getDescription = () => this.description;
    this.setDescription = (description) => this.description = description;

    this.getPrice = () => this.price;
    this.setPrice = (price) => this.price = price;

    this.getBrand = () => this.brand;
    this.setBrand = (brand) => this.brand = brand;

    this.getSizes = () => this.sizes;
    this.setSizes = (sizes) => this.sizes = sizes;

    this.getActiveSize = () => this.activeSize;
    this.setActiveSize = (activeSize) => this.activeSize = activeSize;

    this.getQuantity = () => this.quantity;
    this.setQuantity = (quantity) => this.quantity = quantity;

    this.getDate = () => this.date;
    this.setDate = (date) => this.date = date;

    this.getReviews = () => this.reviews;
    this.setReviews = (reviews) => this.reviews = reviews;

    this.getImages = () => this.images;
    this.setImages = (images) => this.images = images;

    /**
     * Search for reviews in the array by the received id and returned the found review.
     *
     * @param id of review
     * @returns {Review} found review
     */
    this.getReviewByID = (id) => {
        const reviews = this.getReviews;
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].getID === id) {
                return reviews[i];
            }
        }
    }

    /**
     * Returns the picture by the passed parameter, if the parameter
     * was not passed the first picture from the array.
     *
     * @param parameter
     * @returns {string}
     */
    this.getImage = (parameter) => {
        const image = this.getImages();
        return parameter === undefined ? image[0] : image[parameter];
    }

    /**
     * Adds a new value to the "sizes" array.
     *
     * @param size new size.
     */
    this.addSize = (size) => this.getSizes().push(size);

    /**
     * Deletes a value from the "sizes" array by the specified key.
     *
     * @param size value for delete.
     */
    this.deleteSize = (size) => {
        const index = this.getSizes().indexOf(size);
        if (index !== -1) {
            this.getSizes().splice(index, 1);
        }
    }

    /**
     * Adds the "reviews" object to the "reviews" array.
     *
     * @param review new review for product.
     */
    this.addReview = (review) => this.getReviews().push(review);

    /**
     * Deletes the "review" object from the "reviews" array by the specified key.
     *
     * @param id key of review
     */
    this.deleteReview = (id) => {
        const index = this.getReviews.indexOf(this.getReviewByID(id));
        if (index !== -1) {
            return this.getReviews().splice(index, 1);
        }
    }

    /**
     * Returns the average rating of the product.
     *
     * @returns {number} Average rating.
     */
    this.getAverageRating = () => {
        let ratings = [];
        let reviews = this.getReviews();
        for (let i = 0; i < reviews.length; i++) {
            let rating = reviews[i].getRating();
            ratings = ratings.concat(rating);
        }

        let averageRating = 0;
        for (let i = 0; i < ratings.length; i++) {
            averageRating += ratings[i];
        }
        return averageRating / (ratings.length - 1);
    }
}

/**
 * Constructor of the review object and property types.
 *
 * @param {string}id - id of review
 * @param {string}author - review author
 * @param {Date}date - date of creating review
 * @param {string}comment - product review
 * @param {$ObjMap}rating - ranking
 * @constructor
 */
function Review(id, author, date, comment, rating) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = {'service': rating[0], 'price': rating[1], 'value': rating[2], 'quality': rating[3]};

    this.getID = () => this.id;
    this.setID = (id) => this.id = id;

    this.getAuthor = () => this.author;
    this.setAuthor = (author) => this.author = author;

    this.getDate = () => this.date;
    this.setDate = (date) => this.date = date;

    this.getComment = () => this.comment;
    this.setComment = (comment) => this.comment = comment;

    this.getRating = () => this.rating;
    this.setRating = (rating) => this.rating = rating;
}

/**
 * takes two parameters: an array of "Product" objects and the text search.
 * The result of the function is an array of objects that contain
 * the text search in their name or description.
 *
 * @param products -  array of "Product"
 * @param search - key word for search
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

/**
 * Takes two parameters: an array of "Product" objects and an attribute to sort by.
 * Returns an array of objects sorted by the field.
 *
 * @param products - the products array
 * @param sortRule - the field name to sort.
 * @returns {*}
 */
function sortProducts(products, sortRule) {
    if (sortRule.toLowerCase() === ("id") || sortRule.toLowerCase() === ("price") || sortRule.toLowerCase() === ("name")) {
        return products.sort((a, b) => a[sortRule] > b[sortRule] ? 1 : -1)
    } else {
        return products;
    }
}
