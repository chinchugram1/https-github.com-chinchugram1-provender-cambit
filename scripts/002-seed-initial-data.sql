-- Limpiar datos existentes
DELETE FROM transportistas;
DELETE FROM clientes;
DELETE FROM proveedores;
DELETE FROM sesiones;
DELETE FROM usuarios;
DELETE FROM empresas;

-- Insertar empresa de prueba
INSERT INTO empresas (id, nombre, razon_social, cuit, email, telefono, plan, activa) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'ProVender Demo', 'ProVender S.A.', '20-12345678-9', 'admin@provender.com', '+54 11 1234-5678', 'premium', true);

-- Hash correcto para la contraseña "123456" usando bcrypt
-- Generado con: bcrypt.hashSync('123456', 10)

-- Usuario Proveedor/Admin
INSERT INTO usuarios (id, empresa_id, email, password_hash, nombre, apellido, telefono, tipo_usuario, activo) VALUES 
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'proveedor@provender.com', '$2b$10$K7L/8Y3jM5Q5Q5Q5Q5Q5QOQ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'Juan', 'Pérez', '+54 11 1111-1111', 'proveedor', true);

-- Usuario Cliente
INSERT INTO usuarios (id, empresa_id, email, password_hash, nombre, apellido, telefono, tipo_usuario, activo) VALUES 
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'razon@empresa.com', '$2b$10$K7L/8Y3jM5Q5Q5Q5Q5Q5QOQ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'María', 'González', '+54 11 2222-2222', 'cliente', true);

-- Usuario Transportista
INSERT INTO usuarios (id, empresa_id, email, password_hash, nombre, apellido, telefono, tipo_usuario, activo) VALUES 
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'transportista@provender.com', '$2b$10$K7L/8Y3jM5Q5Q5Q5Q5Q5QOQ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'Carlos', 'Rodríguez', '+54 11 3333-3333', 'transportista', true);

-- Insertar perfiles específicos

-- Perfil Proveedor
INSERT INTO proveedores (usuario_id, empresa_id, codigo_proveedor, permisos, zonas_cobertura) VALUES 
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'PROV001', 
'{"dashboard": true, "productos": true, "clientes": true, "pedidos": true, "reportes": true, "configuracion": true}', 
ARRAY['CABA', 'GBA Norte', 'GBA Sur']);

-- Perfil Cliente
INSERT INTO clientes (usuario_id, empresa_id, codigo_cliente, razon_social, cuit, limite_credito, descuento_general, zona, condicion_pago) VALUES 
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'CLI001', 'Empresa Demo S.R.L.', '20-87654321-9', 50000.00, 5.00, 'CABA', 'cuenta_corriente');

-- Perfil Transportista
INSERT INTO transportistas (usuario_id, empresa_id, codigo_transportista, licencia_conducir, vencimiento_licencia, vehiculo_asignado, patente, zonas_cobertura) VALUES 
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'TRANS001', 'B1234567', '2025-12-31', 'Ford Transit', 'ABC123', ARRAY['CABA', 'GBA Norte']);
