-- Limpiar datos existentes
DELETE FROM transportistas;
DELETE FROM clientes;
DELETE FROM proveedores;
DELETE FROM sesiones;
DELETE FROM usuarios;
DELETE FROM empresas;

-- Crear empresa de prueba
INSERT INTO empresas (
    id,
    nombre,
    razon_social,
    cuit,
    email,
    telefono,
    direccion,
    ciudad,
    provincia,
    codigo_postal,
    plan,
    activa
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'ProVender Demo',
    'ProVender Demo S.R.L.',
    '20-12345678-9',
    'demo@provender.com',
    '+54 11 4000-0000',
    'Av. Corrientes 1234',
    'Buenos Aires',
    'CABA',
    '1043',
    'premium',
    true
);

-- Crear usuarios con contraseña "123456" hasheada
-- Hash generado con: bcrypt.hash('123456', 10)
INSERT INTO usuarios (
    id,
    empresa_id,
    email,
    password_hash,
    nombre,
    apellido,
    telefono,
    tipo_usuario,
    activo
) VALUES 
(
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440000',
    'proveedor@provender.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Juan',
    'Pérez',
    '+54 11 1111-1111',
    'proveedor',
    true
),
(
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440000',
    'razon@empresa.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'María',
    'González',
    '+54 11 2222-2222',
    'cliente',
    true
),
(
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440000',
    'transportista@provender.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Carlos',
    'Rodríguez',
    '+54 11 3333-3333',
    'transportista',
    true
);

-- Crear perfiles específicos
INSERT INTO proveedores (
    usuario_id,
    empresa_id,
    codigo_proveedor,
    permisos,
    zonas_cobertura
) VALUES (
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440000',
    'PROV001',
    '{"dashboard": true, "productos": true, "clientes": true, "pedidos": true, "reportes": true, "configuracion": true}',
    ARRAY['CABA', 'GBA Norte', 'GBA Sur']
);

INSERT INTO clientes (
    usuario_id,
    empresa_id,
    codigo_cliente,
    razon_social,
    cuit,
    limite_credito,
    descuento_general,
    zona,
    condicion_pago
) VALUES (
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440000',
    'CLI001',
    'Empresa Demo S.R.L.',
    '20-87654321-9',
    50000.00,
    5.00,
    'CABA',
    'cuenta_corriente'
);

INSERT INTO transportistas (
    usuario_id,
    empresa_id,
    codigo_transportista,
    licencia_conducir,
    vencimiento_licencia,
    vehiculo_asignado,
    patente,
    zonas_cobertura
) VALUES (
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440000',
    'TRANS001',
    'B1234567',
    '2025-12-31',
    'Ford Transit',
    'ABC123',
    ARRAY['CABA', 'GBA Norte']
);

-- Verificar que los datos se crearon correctamente
SELECT 
    e.nombre as empresa,
    u.email,
    u.tipo_usuario,
    u.nombre,
    u.apellido,
    LENGTH(u.password_hash) as hash_length
FROM usuarios u
JOIN empresas e ON u.empresa_id = e.id
WHERE e.id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY u.tipo_usuario;
