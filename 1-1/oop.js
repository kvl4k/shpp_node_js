class AbstractProduct {
    id;
    name;
    description;
    price;
    brand;
    quantity;
    date;
    reviews;
    images;

    /**
     * create objects with the following properties.
     * @param {string}id Product key
     * @param {string}name Product name
     * @param {string}description Description of this product
     * @param {number}price Price value for one unit
     * @param {string}brand Brand of product
     * @param {number}quantity Number of products available
     * @param {Date}date Current date
     * @param {Review[]}reviews Array of objects "Review"
     * @param {string[]}images Array of images of this product
     * @constructor
     */
    constructor(id, name, description, price, brand, quantity, date, reviews, images) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.quantity = quantity;
        this.date = new Date(Date.parse(date));
        this.reviews = reviews;
        this.images = images;
    }

    getID = () => this.id;
    setID = (id) => this.id = id;

    getName = () => this.name;
    setName = (name) => this.name = name;

    getDescription = () => this.description;
    setDescription = (description) => this.description = description;

    getPrice = () => this.price;
    setPrice = (price) => this.price = price;

    getBrand = () => this.brand;
    setBrand = (brand) => this.brand = brand;

    getQuantity = () => this.quantity;
    setQuantity = (quantity) => this.quantity = quantity;

    getDate = () => this.date;
    setDate = (date) => this.date = date;

    getReviews = () => this.reviews;
    setReviews = (reviews) => this.reviews = reviews;

    getImages = () => this.images;
    setImages = (images) => this.images = images;

    /**
     * Search for reviews in the array by the received id and returned the found review.
     *
     * @param id of review
     * @returns {Review} found review
     */
    getReviewByID = (id) => {
        const reviews = this.reviews;
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].id == id) {
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
    getImage = (parameter) => {
        const image = this.getImages();
        return parameter === undefined ? image[0] : image[parameter];
    }

    /**
     * Adds the "reviews" object to the "reviews" array.
     *
     * @param review new review for product.
     */
    addReview = (review) => this.getReviews().push(review);

    /**
     * Deletes the "review" object from the "reviews" array by the specified key.
     *
     * @param id key of review
     */
    deleteReview(id) {
        const index = this.getReviews().indexOf(this.getReviewByID(id));
        if (index !== -1) {
            return this.getReviews().splice(index, 1);
        }
    }

    /**
     * Returns the average rating of the product.
     *
     * @returns {number} Average rating.
     */
    getAverageRating() {
        let reviews = [];
        let ratings = [];
        reviews = this.reviews;
        for (let i = 0; i < reviews.length; i++) {
            let r = reviews[i].rating;
            for (const key in r) {
                ratings.push(r[key]);
            }
        }
        let average = 0;
        ratings.forEach(element => {
            average += element;
        });
        return average/ratings.length;
    }


    /**
     * @returns {string}  the line contains values of all properties.
     */
    getFullInformation() {
        return `ID - ${this.id},\nName - ${this.name},\nDescription - ${this.description},\nPrice - ${this.price},\nBrand
         - ${this.brand},\nQuantity - ${this.quantity},\nDate - ${this.date},\nReviews - ${this.reviews},\nImages - ${this.images}`
    }

    /**
     * @param n - count of products
     * @returns {string} price for 'n' products.
     */
    getPriceForQuantity(n) {
        return `$` + this.getPrice()*n;
    }

    /**
     * A versatile getter/setter that works with any object properties. 
     * The input is the property name and value. If the value is missing, 
     * it is a getter, otherwise it is a setter.
     * 
     * @param {*} propName - a property name 
     * @param {*} value - new property value
     * @returns - if its getter - property value.
     */
    getterSetter(propName, value) {
        if (value === undefined){
            return this[propName]
        } else {
            this[propName] = value;
        }
    }
}

class Review{
    id;
    author;
    date;
    comment;
    rating;

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
    constructor(id, author, date, comment, rating){
        this.id = id;
        this.author = author;
        this.date = new Date(Date.parse(date));
        this.comment = comment;
        this.rating = rating;
    }

    getID = () => this.id;
    setID = (id) => this.id = id;

    getAuthor = () => this.author;
    setAuthor = (author) => this.author = author;

    getDate = () => this.date;
    setDate = (date) => this.date = date;

    getComment = () => this.comment;
    setComment = (comment) => this.comment = comment;

    getRating = () => this.rating;
    setRating = (rating) => this.rating = rating;
}

class Clothes extends AbstractProduct{
    material;
    color;

    /**
     * Constructor of the clothes object and property types.
     * 
     * @param {string} material 
     * @param {string} color 
     */
    constructor(id, name, description, price, brand, quantity, date, reviews, images, material, color) {
        super(id, name, description, price, brand, quantity, date, reviews, images);
        this.material = material;
        this.color = color;
    }

    getMaterial = () => this.material;
    setMaterial = (material) => this.material = material;

    getColor = () => this.color;
    setColor = (color) => this.color = color;
}

class Electronics extends AbstractProduct {
    warranty;
    power;

    /**
     * Constructor of the electronics object and property types.
     * 
     * @param {number} warranty 
     * @param {number} power 
     */
    constructor(id, name, description, price, brand, quantity, date, reviews, images, warranty, power) {
        super(id, name, description, price, brand, quantity, date, reviews, images);
        this.warranty = warranty;
        this.power = power;
    }

    getWarranty = () => this.warranty;
    setWarranty = (warranty) => this.warranty = warranty;

    getPower = () => this.power;
    setPower = (power) => this.power = power;
}


// This part for tests all classes and functions.

let computer = new Electronics();

computer.id = "001";
computer.name = "z570";
computer.description = "nice notebook";
computer.price = 400;
computer.brand = "ASUS";
computer.quantity = 48;
computer.date = "2019-01-12";
computer.images = ["image", "images1", "images2"];;
computer.warranty = 3;
computer.power = 10;
computer.reviews = [
    new Review("101","Mykola Tesla", "2020-01-16", "nice", {'service': 4, 'price': 3, 'value': 5, 'quality': 5}),
    new Review("102", "Vasyl Vasylenko", "2020-01-17", "bad", {'service': 4, 'price': 3, 'value': 5, 'quality': 5})
];



let shirt = new Clothes();

shirt.id = "002";
shirt.name = "miki";
shirt.description = "blue shirt";
shirt.price = 15;
shirt.brand = "Nike";
shirt.quantity = 1048;
shirt.date = "2018-03-13";
shirt.images = ["image", "images1"];
shirt.material = "cotton";
shirt.color = "red";
shirt.reviews = [
    new Review("1", "Gavrylo Kryvonis", "2021-03-12", "good",  {'service': 4, 'price': 3, 'value': 5, 'quality': 5}),
    new Review("2", "Stepan Pypka", "2022-04-10", "so bad", {'service': 4, 'price': 3, 'value': 5, 'quality': 5})
];


console.log(shirt.getFullInformation());
console.log();
console.log('Price for two shirts - ' + shirt.getPriceForQuantity(2));
console.log();
console.log(computer.getAverageRating());
console.log();
console.log(computer.getterSetter('brand'));
computer.getterSetter('brand', 'Lenovo');
console.log(computer.getterSetter('brand'));


