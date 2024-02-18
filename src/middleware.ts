import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isPublicPath = path === '/login' || path === '/signup'|| path === '/verifyemail';
  
// It might be possible that cookie is not present then in that case it should be ""
  const token = request.cookies.get('token')?.value || '';

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/',
    '/signup',
    '/profile',
    '/profile/:path*',
    '/verifyemail',
  ]
}