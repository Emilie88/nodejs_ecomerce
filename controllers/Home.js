module.exports = class Home {
 
    print(req,res) {        
       var ProductModel = require('../models/Product.js')
        var Product = new ProductModel()

        Product.get().then(products => {
            console.log(products.products)
            res.render('index', {
                products: products.products
            })
        })

    }
}
    