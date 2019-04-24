const CartRoute = require('express').Router()
const { CartItems, Users, Vendors, Products } = require('../db.js')

CartRoute.post("/:id", async (req, res) => {
    var prodId_userId = req.params.id
    var words = prodId_userId.split('_');
    console.log(words[0])
    const data = await CartItems.findOne({
        where: {
            productId: words[0],
            userId: words[1]
        }
    })
    if (data === null || data == undefined) {
        try {
            await CartItems.create({
                quantity: 1,
                productId: words[0],
                userId: words[1]
            })
            res.send({ success: true })
        } catch (e) {
            res.send({ success: false, err: e.message })
        }
    }
    else {
        CartItems.findOne({
            where: {
                ProductId: words[0],
                userId: words[1]
            }
        }).then((item) => {
            item.increment({
                quantity: 1
            })
        })
    }
}
)

CartRoute.get("/:userId", async (req, res) => {
    console.log(req.params.userId)
    const cart = await CartItems.findAll({
        where: {
            userId: req.params.userId,
        },
        include: [
            {
                model: Products,
                include: [Vendors]
            },
            Users
        ]
    })

    res.send(cart)
})

module.exports = CartRoute


