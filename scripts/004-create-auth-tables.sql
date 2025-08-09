-- Crear tabla empresas si no existe
CREATE TABLE IF NOT EXISTS public.empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear tabla usuarios si no existe
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT,
  pass_hash TEXT NOT NULL,
  rol TEXT NOT NULL CHECK (rol IN ('proveedor','cliente','transportista')),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índice para empresa_id
CREATE INDEX IF NOT EXISTS usuarios_empresa_id_idx ON public.usuarios (empresa_id);

-- Crear índice para email
CREATE INDEX IF NOT EXISTS usuarios_email_idx ON public.usuarios (email);
