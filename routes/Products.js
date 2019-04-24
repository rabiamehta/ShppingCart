const route = require('express').Router();
const {Products} = require('../db');
const {Vendors} = require('../db');

route.get('/',async (req,res) =>{
    const products =  await Products.findAll({
        include : Vendors
    })
    res.send(products)
})

route.post('/',async (req,res) => {
    try{
        await Products.create({
            'name':req.body.name,
            'Price': req.body.Price,
            'quantity': req.body.quantity,
            'vendorId': req.body.vendorId
        })
        res.send({success:true})
    }catch(e)
    {
        res.send({success: false,err: e.message})
    }
})
route.delete('/',async(req,res) => {
    try{
      Products.destroy({
          where:{'id':req.body.id}
      })
    
    res.send({succes:true})}
    catch(e)
      {
          res.send({success: false,err: e.message})
      }
  })

module.exports=route;