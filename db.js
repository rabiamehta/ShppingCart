const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/shop.db'
})

const Vendors = db.define('vendors', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Products = db.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

})

Vendors.hasMany(Products, { onDelete: 'cascade' });
Products.belongsTo(Vendors)

const Users = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const CartItems = db.define('cartitem', {
    quantity: Sequelize.INTEGER
})

Products.hasMany(CartItems, { onDelete: 'cascade' })
CartItems.belongsTo(Products)

Users.hasMany(CartItems, { onDelete: 'cascade' })
CartItems.belongsTo(Users)

module.exports = {
    db, Vendors, Products, Users, CartItems
}