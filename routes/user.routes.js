const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authJwt = require('../middlewares/authJwt');

// Rutas accesibles solo para usuarios autenticados
router.get('/', [authJwt.verifyToken], userController.getAllUsers);
router.get('/:id', [authJwt.verifyToken], userController.getUserById);

// Rutas accesibles solo para administradores
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);

module.exports = router;
