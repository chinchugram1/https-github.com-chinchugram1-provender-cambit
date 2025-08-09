-- Insertar empresa demo
INSERT INTO public.empresas (id, nombre) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Empresa Demo')
ON CONFLICT (id) DO NOTHING;

-- Insertar usuarios de prueba
INSERT INTO public.usuarios (empresa_id, email, nombre, pass_hash, rol) 
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'proveedor@provender.com', 'Proveedor Demo', '$2b$10$WQ4/PdH0eoksbOGcmRYb/OT7y8RKjHty.DVmVzYmb8sBdGIqo4gci', 'proveedor'),
  ('550e8400-e29b-41d4-a716-446655440000', 'cliente@provender.com', 'Cliente Demo', '$2b$10$WQ4/PdH0eoksbOGcmRYb/OT7y8RKjHty.DVmVzYmb8sBdGIqo4gci', 'cliente'),
  ('550e8400-e29b-41d4-a716-446655440000', 'transp@provender.com', 'Transportista Demo', '$2b$10$WQ4/PdH0eoksbOGcmRYb/OT7y8RKjHty.DVmVzYmb8sBdGIqo4gci', 'transportista')
ON CONFLICT (email) DO NOTHING;
