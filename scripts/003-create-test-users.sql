-- Script completo para crear empresa y usuarios de prueba
-- Primero eliminamos datos existentes si existen
DELETE FROM transportistas WHERE empresa_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM clientes WHERE empresa_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM proveedores WHERE empresa_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM sesiones WHERE usuario_id IN (
  SELECT id FROM usuarios WHERE empresa_id = '550e8400-e29b-41d4-a716-446655440000'
);
DELETE FROM usuarios WHERE empresa_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM empresas WHERE id = '550e8400-e29b-41d4-a716-446655440000';

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

-- Crear usuarios con contraseña hasheada usando crypt de PostgreSQL
-- La contraseña será "123456" para todos los usuarios

-- Usuario Proveedor/Admin
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
) VALUES (
  '660e8400-e29b-41d4-a716-446655440001', 
  '550e8400-e29b-41d4-a716-446655440000', 
  'proveedor@provender.com', 
  crypt('123456', gen_salt('bf')), 
  'Juan', 
  'Pérez', 
  '+54 11 1111-1111', 
  'proveedor', 
  true
);

-- Usuario Cliente
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
) VALUES (
  '660e8400-e29b-41d4-a716-446655440002', 
  '550e8400-e29b-41d4-a716-446655440000', 
  'razon@empresa.com', 
  crypt('123456', gen_salt('bf')), 
  'María', 
  'González', 
  '+54 11 2222-2222', 
  'cliente', 
  true
);

-- Usuario Transportista
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
) VALUES (
  '660e8400-e29b-41d4-a716-446655440003', 
  '550e8400-e29b-41d4-a716-446655440000', 
  'transportista@provender.com', 
  crypt('123456', gen_salt('bf')), 
  'Carlos', 
  'Rodríguez', 
  '+54 11 3333-3333', 
  'transportista', 
  true
);

-- Insertar perfiles específicos

-- Perfil Proveedor
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

-- Perfil Cliente
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

-- Perfil Transportista
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

-- Verificar que los datos se insertaron correctamente
SELECT 
  e.nombre as empresa,
  u.email,
  u.tipo_usuario,
  u.nombre,
  u.apellido
FROM usuarios u
JOIN empresas e ON u.empresa_id = e.id
WHERE e.id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY u.tipo_usuario;
