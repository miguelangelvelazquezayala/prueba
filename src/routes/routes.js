const express =require('express');
const router= express.Router();

const pruebaController = require ('../controllers/pruebaController.js');

router.get('/prueba',pruebaController.GetPruebas)

module.exports =router;