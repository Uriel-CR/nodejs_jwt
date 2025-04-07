const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó token' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.userRoles.includes('admin')) {
    return res.status(403).json({ message: 'Se requiere rol de administrador' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
