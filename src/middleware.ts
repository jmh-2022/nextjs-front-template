// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { applySetCookie, createSessionCookie } from './app/api/auth/_service/cookieHandler';

export async function middleware(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const res = NextResponse.next();

  const userKeyInCookie = cookies().get('userKey')?.value;
  // 신규 진입 시 쿠키가 존재하지 않는다.
  if (!userKeyInCookie) {
    const userKey = searchParams.get('userKey');
    if (userKey) {
      // redirect(req.url); 리다이렉트로 보내야지만 쿠키가 차서 나간다.
      // next를 사용하게 되면 cookie가 차지 않는 이슈 있음 14.3 부터 개선될 예정
      const res = NextResponse.redirect(req.url);
      createSessionCookie({ userKey: userKey, res });
      // 아래 함수까지 필요한지 모르겠지만 쿠키를 덮어쓴다.
      applySetCookie(req, res);
      return res;
    }
  } else {
    // 쿠키가 존재한다면 기존 쿠키 다시 덮어쓴다.
  }

  return res;
}

// 미들웨어 설정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.ico$).*)'],
};
