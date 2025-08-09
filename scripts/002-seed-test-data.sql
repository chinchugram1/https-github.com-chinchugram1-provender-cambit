-- Limpiar datos existentes
DELETE FROM sesiones;
DELETE FROM usuarios;
DELETE FROM roles;
DELETE FROM empresas;

-- Insertar empresa de prueba
INSERT INTO empresas (id, nombre, razon_social, cuit, email, telefono, direccion, color_primario, plan, activa)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'ProVender Demo',
    'ProVender S.A.',
    '20-12345678-9',
    'info@provender.com',
    '+54 11 1234-5678',
    'Av. Corrientes 1234, CABA, Argentina',
    '#0492C2',
    'premium',
    true
);

-- Insertar roles
INSERT INTO roles (id, nombre, descripcion) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'proveedor', 'Proveedor/Admin con acceso completo'),
    ('550e8400-e29b-41d4-a716-446655440002', 'cliente', 'Cliente (kiosco/almacén)'),
    ('550e8400-e29b-41d4-a716-446655440003', 'transportista', 'Transportista para entregas');

-- Insertar usuarios de prueba con contraseña "123456"
-- Hash generado con bcrypt para "123456": $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO usuarios (id, nombre, email, password_hash, empresa_id, rol_id, activo) VALUES
    (
        '550e8400-e29b-41d4-a716-446655440010',
        'Juan Proveedor',
        'proveedor@provender.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        '550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440001',
        true
    ),
    (
        '550e8400-e29b-41d4-a716-446655440011',
        'María Cliente',
        'razon@empresa.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        '550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440002',
        true
    ),
    (
        '550e8400-e29b-41d4-a716-446655440012',
        'Carlos Transportista',
        'transportista@provender.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        '550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440003',
        true
    );

-- Verificar que los datos se insertaron correctamente
SELECT 
    u.nombre,
    u.email,
    r.nombre as rol,
    e.nombre as empresa,
    u.activo
FROM usuarios u
JOIN roles r ON u.rol_id = r.id
JOIN empresas e ON u.empresa_id = e.id;
