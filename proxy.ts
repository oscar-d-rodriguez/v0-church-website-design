import { NextRequest, NextResponse } from 'next/server'

const TRACKING_PARAMS = ['fbclid']

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  let hasTrackingParam = false

  for (const param of TRACKING_PARAMS) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      hasTrackingParam = true
    }
  }

  if (!hasTrackingParam) {
    return NextResponse.next()
  }

  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)).*)',
  ],
}
