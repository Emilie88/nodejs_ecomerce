const ProductMongo = require('./ProductMongoDB.js')


module.exports = class Product {

    add(name, description, image, price) {
        ProductMongo.create({name, description, image, price})
    }

    get()
    {
        return new Promise((resolve, rejected) => {
            // On recherche l'email
            ProductMongo.find().limit(5).exec((err, products) => {
                if (err !== null || products === null) resolve(false);
                    // ProductMongo.countDocuments({}, (errCount, totalCount) => {})
                        resolve({products})
                    
                
           })
       })
    }
}