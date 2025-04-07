const User = require('../models/user.model');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Verificar username
    const userByUsername = await User.findOne({ username: req.body.username });
    if (userByUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Verificar email
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!['user', 'admin'].includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Rol ${req.body.roles[i]} no existe`
        });
      }
    }
  }
  next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };
