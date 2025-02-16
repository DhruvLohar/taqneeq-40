import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verifySession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  return await verifySession(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|login).*)']
};
