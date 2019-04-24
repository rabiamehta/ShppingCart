const route = require('express').Router();
const {Vendors} = require('../db');

route.get('/',async (req,res) =>{
    const vendors =  await Vendors.findAll()
    res.send(vendors)
})

route.post('/',async (req,res) => {
    try{
        if(req.body.name!=""||req.body.name!=undefined){
         await Vendors.create({
            'name':req.body.name
        })
        res.send({success:true})}
        else{
            alert("Enter Valid Vendor")
        }
    }catch(e)
    {
        res.send({success: false,err: e.message})
    }
})

route.delete('/',async(req,res) => {
  try{
    Vendors.destroy({
        where:{'id':req.body.id}
    })
  
  res.send({succes:true})}
  catch(e)
    {
        res.send({success: false,err: e.message})
    }
})
module.exports=route;
