const express = require('express')
const router = express.Router();

const Product = require('../models/product')

router.post('/addProduct' , async (req,res) =>{
    try {
        // const {name,description,category,price} = req.body;
        const product = new Product({
                        name: req.body.name,
                        description: req.body.description,
                        category: req.body.category,
                        price: req.body.price
                    }) 

        const savedProduct = await product.save();
        res.json(savedProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


router.get('/getAllProduct' , async(req,res)=>{
    try {
        const saveProduct = await Product.find();
        res.json(saveProduct);
    } catch (error) {
        
    }
})

router.put('/products/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.delete('/products/:id', async (req, res) => {
    try {
      const removedProduct = await     Product.findByIdAndDelete(req.params.id);
      res.json(removedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;
  
// router.post('/addproduct', async(req,res)=>{
//     try{
//         const product = new Product({
//             name: req.body.name,
//             description: req.body.description,
//             category: req.body.category,
//             price: req.body.price
//         }) 
//         const savedProduct = await product.save();
//         res.json(savedProduct)

//     }catch(error){
//         res.status(400).json({message: error.message})
//     }
// })


// router.post('/addproduct')
module.exports = router