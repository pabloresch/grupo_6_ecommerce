const express = require ('express');
const router = express.Router();
const productControllers = require ('../controllers/productControllers')



router.get("/productDetail", productControllers.productDetail );

router.get("/productCart", productControllers.carrito );

router.get("/listPhones", productControllers.listaCelulares );

/*router.get("listado/:idProducto?", productControllers.detalleProducto );*/

router.get('/newProduct', productControllers.newProduct)


module.exports =router
