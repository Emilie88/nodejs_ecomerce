const mongoose = require('mongoose')
const config = require("./app/config.js")
const chalk = require("chalk")


mongoose.connect(
    config.mongodbConnectionString, 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () =>  {
    console.log(
        chalk.yellow(`Connexion au serveur MongoDB : ${chalk.green(`OK`)}`)
    )
})
const faker = require('faker');
let product = {}

name = faker.commerce.productName()
image = "https://i.picsum.photos/id/1/200/300.jpg";
description = "lorem";
price = faker.commerce.price()
console.log(name, price);

const Product  = require('./models/Product.js')
var oProduct = new Product();

for (let i = 0; i < 30; i++) {
    oProduct.add(name, description, image,price) 
}
//   oProduct.add(product.name,product.image, product.description, product.price);




 