//Declaracion de frameworks
const express = require('express');
const app = express();
const path = require('path')

//>montar rutas 
const productRoutes = require ('./routes/productRoutes')
const mainRoutes = require ('./routes/mainRoutes')
const usersRoutes = require ('./routes/usersRoutes')

//Declaracion de puertos
const port = 3000


// views
app.use(express.static(path.join(__dirname,'views')))
// public
app.use(express.static(path.join(__dirname,'public')))

//EJS
app.set('view engine', 'ejs')

//match
app.use('/',mainRoutes)
app.use('/usuarios',usersRoutes)
app.use('/productos', productRoutes)

//montar el servidor                                                                                                                                                                                                                                                                                                                             
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__dirname)
})

