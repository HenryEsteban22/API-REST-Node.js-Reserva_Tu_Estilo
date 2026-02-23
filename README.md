# API REST de Autenticación - Reservatuestilo 🚀

Este proyecto es una API desarrollada en **Node.js** y **Express** que gestiona la autenticación de usuarios mediante **JSON Web Tokens (JWT)** y almacenamiento seguro en **MySQL**.

## ✨ Características (Alcance Funcional)
* **Registro Seguro:** Verificación de duplicados y hasheo de contraseñas con `bcryptjs`.
* **Login con JWT:** Generación de tokens firmados con clave secreta y tiempo de expiración.
* **Rutas Protegidas:** Middleware de seguridad para validar el acceso al perfil.
* **CRUD Completo:** Gestión total de la tabla de usuarios.

## 🔒 Seguridad Mínima Obligatoria
* Uso de variables de entorno (`.env`).
* Contraseñas nunca guardadas en texto plano (Bcrypt).
* Estructura de carpetas escalable (Controllers, Models, Middlewares).

API REST NODE.JS/
├── node_modules/
├── src/
│   ├── config/       # Configuración de base de datos
│   ├── controllers/  # Funciones que responden a las rutas
│   ├── middlewares/  # Validación de JWT (Protección de rutas)
│   ├── models/       # Definición de la estructura del usuario
│   ├── routes/       # Definición de URLs (endpoints)
│   ├── services/     # Lógica de negocio (ej. hashear contraseñas)
│   ├── utils/        # Funciones de ayuda (ej. generador de tokens)
│   └── app.js        # Punto de entrada del servidor
├── .env              # Configuración de entorno.
├── .gitignore
└── package.json




## 🧪 Pruebas Obligatorias (Postman)
A continuación se detallan las pruebas realizadas para validar el cumplimiento de los requisitos de seguridad y funcionalidad.

#### 1. Registro Exitoso
![Registro Exitoso](./Img/1.%20Registro%20Exitoso%20POSTMAN.png)

#### 2. Registro Duplicado
![Registro Duplicado](./Img/2.%20Registro%20Duplicado%20POSTMAN.png)

#### 3. Login Correcto
![Login Correcto](./Img/3.%20Login%20correcto%20POSTMAN.png)

#### 4. Login Incorrecto
![Login Incorrecto](./Img/4.%20Login%20incorrecto%20POSTMAN.png)

#### 5. Acceso sin Token
![Acceso sin Token](./Img/5.%20Acceso%20sin%20token%20POSTMAN.png)

#### 6. Acceso con Token Inválido
![Acceso token inválido](./Img/6.%20Acceso%20token%20inválido%20POSTMAN.png)

#### 7. Acceso con Token Válido
![Acceso token válido](./Img/7.%20Acceso%20token%20válido%20POSTMAN.png)

## 🛠️ Instalación y Uso
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Configurar el archivo `.env` con las credenciales de la DB y el `JWT_SECRET`.
4. Ejecutar con `node src/app.js`.