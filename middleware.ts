// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { readSession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isLogin = path === '/' || path.startsWith('/login'); // login en "/"
  const token = req.cookies.get('session')?.value;
  const secretLen = (process.env.SESSION_SECRET || '').length;

  console.log('[MIDDLEWARE] Path:', path, 'HasCookie:', !!token, 'SecretLen:', secretLen);

  let sess = null;
  if (token) {
    try {
      sess = await readSession(token);
      console.log('[MIDDLEWARE] Sess OK:', !!sess, sess ? sess.rol : null);
    } catch (e) {
      console.error('[MIDDLEWARE] jwtVerify error:', (e as Error).message);
    }
  }

  const url = req.nextUrl.clone();

  if (!sess && !isLogin) {
    console.log('[MIDDLEWARE] Sin sesión -> /');
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (sess && isLogin) {
    url.pathname =
      sess.rol === 'proveedor' ? '/proveedor/dashboard' :
      sess.rol === 'cliente' ? '/cliente/dashboard' :
      '/transportista/dashboard';
    console.log('[MIDDLEWARE] Con sesión ->', url.pathname);
    return NextResponse.redirect(url);
  }

  // Gates por rol
  if (sess) {
    if (path.startsWith('/proveedor') && sess.rol !== 'proveedor') { url.pathname = '/'; return NextResponse.redirect(url); }
    if (path.startsWith('/cliente') && sess.rol !== 'cliente')     { url.pathname = '/'; return NextResponse.redirect(url); }
    if (path.startsWith('/transportista') && sess.rol !== 'transportista') { url.pathname = '/'; return NextResponse.redirect(url); }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
