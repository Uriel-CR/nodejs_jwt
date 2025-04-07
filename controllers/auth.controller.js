const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { SECRET_KEY } = process.env;

exports.signup = async (req, res) => {
  try {
    // Crear usuario
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles || ['user']
    });

    // Guardar usuario
    const savedUser = await user.save();

    // Crear token
    const token = jwt.sign(
      { id: savedUser._id, roles: savedUser.roles },
      SECRET_KEY,
      { expiresIn: 86400 } // 24 horas
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // Buscar usuario
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const passwordIsValid = await user.comparePassword(req.body.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      SECRET_KEY,
      { expiresIn: 86400 } // 24 horas
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
