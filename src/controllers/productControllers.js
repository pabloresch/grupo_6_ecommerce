const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



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
    /*productDetail : (req, res) => {
        res.render('productDetail')
    },

    listaCelulares :(req, res)=> {
        res.render('listPhones')
    },*/

    newProduct: (req, res) => {
        res.render('newProduct')
    },

    // Create -  Method to store
    store: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    let newProduct = {
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        image: req.file.filename,
        section: req.body.section,
        marca: req.body.marca
    };
    products.push(newProduct);

    let newProductSave = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, newProductSave, "utf-8");

    return res.redirect("/");
    },
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    
        let id = req.params.id;
    
        let detailProduct = products.find((prod) => prod.id == id);
    
        return res.render("productDetail", { detailProduct });
        },

    // Update - Form to edit
    edit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let id = req.params.id;
        let editProduct = products.find((prod) => prod.id == id);
        res.render("productEdit", { editProduct });
    },

    // Update - Method to update
    update: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    req.body.id = req.params.id;

    let productUpdate = products.map((prod) => {
      if (prod.id == req.body.id) {
        let newProduct = {
            id: prod.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            image: req.file.filename,
            section: req.body.section,
            marca: req.body.marca
        };
        if (req.file) {
          newProduct = req.file.filename;
        }
        return newProduct;
      }
      return prod;
    });

    let actualizarProduct = JSON.stringify(productUpdate, null, 2);
    fs.writeFileSync(productsFilePath, actualizarProduct, "utf-8");
    return res.redirect(`/products/detail/${req.body.id}`);
  },
}


module.exports = controllers