# 🛡️ API CRUD con Autenticación JWT y Roles

API segura con autenticación JWT y control de roles (usuario/admin) para operaciones CRUD de usuarios.

## 📦 Requisitos Previos

- Node.js v16+
- MongoDB (local o Atlas)
- Postman/Insomnia o cURL para probar endpoints

## 🚀 Instalación

```bash
# 1. Clonar repositorio (si aplica)
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar el archivo .env con tus valores
```

## ⚙️ Configuración (.env)

```env
PORT=4000
SECRET_KEY=tu_clave_secreta_jwt_compleja
DB_URI=mongodb://localhost:27017/jwt_db
```

## 🏃‍♂️ Comandos Útiles

```bash
# Ejecutar en modo desarrollo (con nodemon)
npm run dev

# Ejecutar en producción
npm start

# Ejecutar tests (si existen)
npm test
```

## 🌐 Endpoints

### 🔐 Autenticación

**Registro de usuario:**
```http
POST /api/auth/signup
```
```json
{
  "username": "nuevo_usuario",
  "email": "usuario@example.com",
  "password": "contraseñaSegura123",
  "roles": ["user"]
}
```

**Inicio de sesión:**
```http
POST /api/auth/signin
```
```json
{
  "username": "nuevo_usuario",
  "password": "contraseñaSegura123"
}
```

### 👥 Usuarios

Requieren header: `x-access-token: [JWT_TOKEN]`

**Listar todos los usuarios (admin):**
```http
GET /api/users
```

**Obtener usuario específico:**
```http
GET /api/users/:id
```

**Actualizar usuario:**
```http
PUT /api/users/:id
```
```json
{
  "username": "nuevo_nombre",
  "email": "nuevo@email.com"
}
```

**Eliminar usuario (admin):**
```http
DELETE /api/users/:id
```

## 🏗️ Estructura del Proyecto

```
/jwt-crud-api
├── .env                    # Variables de entorno
├── app.js                 # Punto de entrada
├── config/
│   └── db.js              # Configuración de MongoDB
├── controllers/
│   ├── auth.controller.js # Lógica de autenticación
│   └── user.controller.js # Lógica de usuarios
├── middlewares/
│   ├── authJwt.js         # Middleware de JWT
│   └── verifySignup.js    # Validación de registro
├── models/
│   └── user.model.js      # Modelo de usuario
└── routes/
    ├── auth.routes.js     # Rutas de autenticación
    └── user.routes.js     # Rutas de usuarios
```

## 🛠️ Dependencias Principales

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| express | ^4.18.2 | Framework web |
| mongoose | ^8.0.3 | ODM para MongoDB |
| jsonwebtoken | ^9.0.2 | Implementación de JWT |
| bcryptjs | ^2.4.3 | Hashing de contraseñas |
| dotenv | ^16.3.1 | Manejo de variables de entorno |
| cors | ^2.8.5 | Middleware para CORS |

## 📝 Ejemplo de Uso

**Registrar un usuario admin:**
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"Admin1234","roles":["admin"]}'
```

**Iniciar sesión:**
```bash
curl -X POST http://localhost:4000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin1234"}'
```

**Listar usuarios (como admin):**
```bash
curl -X GET http://localhost:4000/api/users \
  -H "x-access-token: [JWT_RECIBIDO_EN_LOGIN]"
```

## 🚨 Manejo de Errores

| Código | Mensaje | Descripción |
|--------|---------|-------------|
| 400 | "El nombre de usuario ya existe" | Validación de registro |
| 401 | "No autorizado" | Token inválido o expirado |
| 403 | "Se requiere rol de administrador" | Permisos insuficientes |
| 404 | "Usuario no encontrado" | Recurso no existente |
| 500 | "Error del servidor" | Error interno |

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Haz commit de tus cambios (`git commit -am 'Agrega mejora'`)
4. Haz push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request
