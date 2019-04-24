const route = require('express').Router();
const { Users } = require('../db');

route.get('/:name', async (req, res) => {

    const user = await Users.findAll({
        where: { 'name': req.params.name }
    })
    res.send(user)
})

route.get('/', async (req, res) => {
    const users = await Users.findAll()
    res.send(users)
})

module.exports = route;