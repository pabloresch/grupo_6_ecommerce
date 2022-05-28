const controllers = {
    /*detalleProducto : (req, res) => {
        if (req.params.idProducto == undefined) {
            res.send('Bienbenido a la seccion de productos')
        } 
        else {
            res.send('Bienbenido al producto: ' + req.params.idProducto)
        };   
    },*/
    carrito : (req, res) => {
        res.render("productCart")
    },
    productDetail : (req, res) => {
        res.render('productDetail')
    }
}


module.exports = controllers