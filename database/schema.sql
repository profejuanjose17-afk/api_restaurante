-- ===========================================
-- BASE DE DATOS RESTAURANTE
-- ===========================================

-- ENUMS
CREATE TYPE Rol AS ENUM (
    'cliente',
    'admin'
);

CREATE TYPE Estado AS ENUM (
    'pendiente',
    'confirmada',
    'cancelada'
);

-- ===========================================
-- TABLA: usuarios
-- ===========================================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol Rol NOT NULL DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT usuarios_rol_check
        CHECK (rol IN ('cliente', 'admin'))
);

-- ===========================================
-- TABLA: mesas
-- ===========================================

CREATE TABLE mesas (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL UNIQUE,
    capacidad INTEGER NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===========================================
-- TABLA: reservaciones
-- ===========================================

CREATE TABLE reservaciones (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    personas INTEGER NOT NULL,
    estado Estado NOT NULL DEFAULT 'pendiente',
    usuario_id INTEGER NOT NULL,
    mesa_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT reservaciones_estado_check
        CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),

    CONSTRAINT reservaciones_usuario_id_fkey
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT reservaciones_mesa_id_fkey
        FOREIGN KEY (mesa_id)
        REFERENCES mesas(id)
);

-- ===========================================
-- DATOS INICIALES
-- ===========================================

INSERT INTO usuarios (id, nombre, correo, password, rol, created_at) VALUES
(1, 'Carlos Mendoza', 'carlos@email.com', '123456', 'admin', '2026-06-24 18:45:26.738028'),
(2, 'Ana García', 'ana@email.com', '123456', 'cliente', '2026-06-24 18:45:26.738028'),
(3, 'Luis Pérez', 'luis@email.com', '123456', 'cliente', '2026-06-24 18:45:26.738028'),
(4, 'Kenia Paiz', 'kenia.paiz@gmail.com', '$2b$10$Ipt/gY7CB3dgP.q3dfbQ8OKmlnDvIqCLX/zHf.V5i35GWEUowUGgS', 'cliente', '2026-06-30 01:42:53.333'),
(5, 'David Barahona', 'david.barahona@gmail.com', '$2b$10$HAOC59JOxjOQIYViL69i/uPoIqVEDIIq4WYcYgYbiY4gGqmc3eSgu', 'cliente', '2026-07-02 00:50:42.914');

INSERT INTO mesas (id, numero, capacidad, disponible, created_at) VALUES
(1, 1, 2, FALSE, '2026-06-24 18:45:26.738028'),
(2, 2, 10, TRUE, '2026-06-24 18:45:26.738028'),
(3, 3, 6, FALSE, '2026-06-24 18:45:26.738028'),
(4, 18, 6, TRUE, '2026-06-30 00:49:09.219');

INSERT INTO reservaciones (
    id,
    fecha,
    hora,
    personas,
    estado,
    usuario_id,
    mesa_id,
    created_at
) VALUES
(1, '2026-06-25', '12:00:00', 2, 'confirmada', 2, 1, '2026-06-24 18:45:26.738028'),
(2, '2026-06-25', '14:00:00', 4, 'pendiente', 3, 2, '2026-06-24 18:45:26.738028'),
(3, '2026-06-26', '19:00:00', 5, 'pendiente', 2, 3, '2026-06-24 18:45:26.738028');

-- Ajustar secuencias después de insertar IDs manuales
SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));
SELECT setval('mesas_id_seq', (SELECT MAX(id) FROM mesas));
SELECT setval('reservaciones_id_seq', (SELECT MAX(id) FROM reservaciones));