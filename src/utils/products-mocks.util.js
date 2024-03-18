const { faker } = require ('@faker-js/faker')

const generateProducts = () => {
    const products = []
    for (let i=0; i<100; i++) {
        products.push(generateProduct())
    }
    return products;
}

const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code:faker.string.uuid(),
        stock: faker.number.int({ max: 1000 }),
        status: true,
        category: faker.commerce.productAdjective(),
    }
}

module.exports = generateProducts