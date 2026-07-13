# API Restaurante

API REST desarrollada con **Express**, **Prisma** y **PostgreSQL** para la gestión de usuarios, mesas y reservaciones.

---

## Tecnologías

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JSON Web Token (JWT)
* bcrypt
* Swagger

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd api_restaurante
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo `.env`

```env
PORT=3000

DATABASE_URL="postgresql://usuario:password@localhost:5432/restaurante"

JWT_SECRET=MiClaveSecreta
JWT_EXPIRES=1h
```

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Ejecutar el proyecto

```bash
npm run dev
```

La API estará disponible en:

```
http://localhost:3000
```

---

## Documentación Swagger

Una vez iniciada la aplicación, la documentación estará disponible en:

```
http://localhost:3000/api-docs
```

---

## Endpoints

### Autenticación

| Método | Endpoint             | Descripción                               |
| ------ | -------------------- | ----------------------------------------- |
| POST   | `/api/auth/register` | Registrar un nuevo usuario                |
| POST   | `/api/auth/login`    | Iniciar sesión                            |
| GET    | `/api/auth/perfil`   | Obtener el perfil del usuario autenticado |

---

### Mesas

| Método | Endpoint         | Descripción             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/mesas`     | Obtener todas las mesas |
| GET    | `/api/mesas/:id` | Obtener una mesa por ID |
| POST   | `/api/mesas`     | Crear una nueva mesa    |
| PUT    | `/api/mesas/:id` | Actualizar una mesa     |
| DELETE | `/api/mesas/:id` | Eliminar una mesa       |

---

### Reservaciones

| Método | Endpoint                        | Descripción                                            |
| ------ | ------------------------------- | ------------------------------------------------------ |
| POST   | `/api/reservaciones`            | Crear una reservación                                  |
| GET    | `/api/reservaciones/mis`        | Obtener las reservaciones del usuario autenticado      |
| GET    | `/api/reservaciones`            | Obtener todas las reservaciones *(Administrador)*      |
| PUT    | `/api/reservaciones/:id/estado` | Cambiar el estado de una reservación *(Administrador)* |
| DELETE | `/api/reservaciones/:id`        | Cancelar o eliminar una reservación                    |

---

## Autenticación

La API utiliza **JWT (JSON Web Token)** para proteger los endpoints privados.

Para acceder a ellos, incluye el token en el encabezado de la petición:

```http
Authorization: Bearer TU_TOKEN
```

---

## Roles

La aplicación maneja dos tipos de usuarios:

* **admin**

  * Gestionar mesas.
  * Visualizar todas las reservaciones.
  * Cambiar el estado de las reservaciones.

* **cliente**

  * Registrarse e iniciar sesión.
  * Crear reservaciones.
  * Consultar sus propias reservaciones.

---

## Base de datos

Después de configurar la variable `DATABASE_URL`, asegúrate de tener creada la base de datos PostgreSQL y ejecutar el script SQL incluido en el proyecto para crear las tablas y los datos iniciales.
