const express = require ('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers')


router.get("/login",usersControllers.logIn)




module.exports =router
