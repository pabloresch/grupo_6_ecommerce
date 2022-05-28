const express = require ('express');
const router = express.Router();
const productControllers = require ('../controllers/productControllers')
const path = require('path')
const views = path.join(__dirname, 'views/')


router.get("/productDetail", (req, res) => {
    res.sendFile(path.join(views, 'productDetail.html'))
})


router.get("/carrito", productControllers.carrito )


/*router.get("/:idProducto?", productControllers.detalleProducto );*/


module.exports =router

