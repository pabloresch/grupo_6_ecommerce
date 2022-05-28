const express = require ('express');
const router = express.Router();


/*
router.get("/productDetail", (req, res) => {
    res.sendFile(path.join(views, 'productDetail.html'))
})


router.get("/carrito", (req, res) => {
    res.sendFile(path.join(views, "productCart.html"))
})
*/

router.get("/:idProducto?", (req, res) => {
    if (req.params.idProducto == undefined) {
        res.send('Bienbenido a la seccion de productos')
    } 
    else {
        res.send('Bienbenido al producto: ' + req.params.idProducto)
    };   
});


module.exports =router

