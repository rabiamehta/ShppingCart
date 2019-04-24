const express = require('express')
const { db } = require('./db.js')

const server = express()

const vendorRoute = require('./routes/Vendors')
const productRoute = require('./routes/Products')
const userLoginRoute = require('./routes/Users')
const CartRoute = require('./routes/Cart')


server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/', express.static(__dirname + '/public'))

server.use('/vendors', vendorRoute)
server.use('/products', productRoute)
server.use('/userLogin', userLoginRoute)
server.use('/addToCart', CartRoute)

const PORT = process.env.PORT || 8789
db.sync().then(() => {
    server.listen(PORT)
})


