// ************ Require's ************
const express = require ('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/products'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

const upload = multer({ storage });

const productControllers = require ('../controllers/productControllers')


/*router.get("listado/:idProducto?", productControllers.detalleProducto );*/



router.get("/productCart", productControllers.carrito );

//(listado de celulares todavia no esta definido el metodo y no levanta el servidor)router.get("/listPhones", productControllers.listaCelulares ); 

/*** GET ONE PRODUCT ***/
//router.get("/:id", productControllers.detail);
router.get("/detail/:id", productControllers.detail );

/*** CREATE ONE PRODUCT ***/
router.get('/newProduct', productControllers.newProduct)
router.post("/", upload.single("imgFile"), productControllers.store);

/*** EDIT ONE PRODUCT ***/

router.get("/edit/:id", productControllers.edit);
router.put("/edit/:id", productControllers.update);

module.exports =router

