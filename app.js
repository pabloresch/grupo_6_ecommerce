//Declaracion de frameworks
const express = require('express');
const app = express();
const path = require('path')

//Declaracion de puertos
const port = 3000

//montar el servidor                                                                                                                                                                                                                                                                                                                             
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__dirname)
})


//>montar rutas 
//productos
const productRoutes = require ('./routes/productRoutes')
app.use('/productos',productRoutes)
/*
//main
const mainRoutes = require ('./routes/mainRoutes')
app.use('/',mainRoutes)

//usuarios
const usersRoutes = require ('./routes/usersRoutes')
app.use('/usuarios',usersRoutes)

*/




// views
const views = path.join(__dirname, 'views/')
// public
const public = path.join(__dirname, 'public/')

// hhtp routes
const hhtpRaiz = '/'
const htppHome = '/home'
const httpCarrito = '/carrito'
const httpLogIn = '/login'
const httpProducto = '/productDetail'

// html
const homeHtml = 'index.html'
const carritoHtml = 'productCart.html'
const loginHtml ='login.html'
const productoHtml = 'productDetail.html'


// Define the static file path
app.use(express.static(__dirname +'/public/'));

app.get(hhtpRaiz, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})

app.get(htppHome, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})

app.get(httpLogIn, (req, res) => {
    res.sendFile(path.join(views, loginHtml))
})

app.get(httpProducto, (req, res) => {
    res.sendFile(path.join(views, productoHtml))
})

app.get(httpCarrito, (req, res) => {
    res.sendFile(path.join(views, carritoHtml))
})


