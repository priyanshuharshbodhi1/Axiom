import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages that don't require authentication
const PUBLIC_PATHS = ['/auth', '/api/auth']

// Matcher configuration for middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /auth (authentication pages)
     * 3. /_next/static (static files)
     * 4. /_next/image (image optimization files)
     * 5. /favicon.ico (favicon file)
     */
    '/((?!api/auth|auth|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))

  // Get the token from cookies
  const token = request.cookies.get('privy-token')?.value

  // Redirect authenticated users away from auth pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect unauthenticated users to auth page
  if (!isPublicPath && !token) {
    const authUrl = new URL('/auth', request.url)
    // Store the original path to redirect back after authentication
    authUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(authUrl)
  }

  return NextResponse.next()
}