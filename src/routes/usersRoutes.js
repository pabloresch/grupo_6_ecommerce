const express = require ('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const path = require("path");
const multer = require("multer");

//requerir express validator
const { body } = require('express-validator')
//Requiero  bcryptjs para comparar las contraseñas hash
const bcrypt = require('bcryptjs');
//Requiero fs ya que debo leer el archivo json de usuarios y verificar si el usuario que se está reistrando existe o no
const fs = require('fs');

//Me traigo el archivo JSON con los usuarios registrados y lo parseo para usarlo mas adelante
const archivosUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')))

//multer
//https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb (null,path.resolve(__dirname, '../../public/images/users'))//Acá se indica la ruta donde se guardará la imagen
    },

    filename: (req, file, cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`//Acá se genera el nombre del archivo para que no se repita en la carpeta raiz y se pisen los archivos
        cb (null, fileName)
    }
})

const upLoadFile = multer({storage})

//Ejecucion de las validaciones para el formulario de registro

const validationsRegister = [
    body('fullName').notEmpty().withMessage('Tienes que ingresar su nombre'),
    body('lastName').notEmpty().withMessage('Tienes que ingresar su apellido'),
    body('email').notEmpty().withMessage('Tienes que ingresar su email').bail()
    .isEmail(). withMessage('Ingrese un email valido'),
    body('contrasena').notEmpty().withMessage('Tienes que ingresar su contraseña'),
    body('passconfcon').custom((value, {req}) =>{
        if(req.body.contrasena == value ){
            return true    // Si yo retorno un true  no se muestra el error     
        }else{
            return false   // Si retorno un false si se muestra el error
        }    
    }).withMessage('Las contraseñas deben ser iguales'),
    body('avatar').custom((value, {req})=>{
        let file = req.file
        let acceptedExtensions = ['.jpg', '.png', '.gif']
        if(!file){
            throw new Error ('Tienes que subir una imagen')
        }

        else{

            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
     
                throw new Error (`Las extensiones de archivo permitidas son  ${acceptedExtensions.join(' , ')}`);
            }
        }
        return true
    })
]

//Ejecucion de las validaciones para el formulario de ingreso
const validationsLogin = [
    //Validacion en el back del mail
    body('email').isEmail().withMessage('Escribiste mal tu e-mail'),
    //Validacion en el back de la contraseña
    body('password').isLength({min: 5 }).withMessage('Te quedaste corto che, la clave era de 5 caracteres... O más'),
    //Si pasa las dos validaciones anteriores, se verifica en el array de archivosUsers que exista el usuario
    body('email').custom( (value  ) =>{
      for (let i = 0; i < archivosUsers.length; i++) {
          if (archivosUsers[i].email == value) {
              return true    
          }
      }
      return false
    }).withMessage('No existis! O te diste de baja, o nunca te registraste... O peor aún, nuestros programadores te bloquearon y estan llamando al Interpol'),

    //Si pasa las 3 validaciones solo queda confirmar que la contraseña que ingreso es la correcta
    /*hasta que no se haga la encriptacion en el formulario de register esta etapa queda comentada
    body('password').custom( (value, {req}) =>{
        for (let i = 0; i < archivosUsers.length; i++) {
            if (archivosUsers[i].email == req.body.email) {
                if(bcrypt.compareSync(value, archivosUsers[i].password)){//como la contraseña esta encriptada se debe hacer un paso adicional
                  return true;
                }else{
                  return false;
                }
            }
        }
        
    }).withMessage('Usurio o contraseña no coinciden. Eso pasa cuando hay un problema entre el monitor y la silla... De forma condecorosa le decimos error capa 8'),
    */
]


//Rutas

// Formulario de registro y login
router.get("/login", usersControllers.login);

//ingresar a tu cuenta
router.post("/login", upLoadFile.single('avatar'), validationsRegister, usersControllers.processRegister)

//ingresar a tu cuenta
router.post('/', validationsLogin, usersControllers.ingress)

module.exports = router;
