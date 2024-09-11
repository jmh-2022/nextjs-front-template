// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

import { getReissueToken } from './app/api/auth/_service/accountService';
import { parseJwt, isTimestampExpired } from './utils/util';

import { createJWTCookiesInMiddlware, deleteJWTCookiesInMiddleware } from './app/api/auth/_service/cookieHandler';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  // 토큰을 쿠키에서 가져오기

  let accessToken = cookies().get('accessToken')?.value;
  let refreshToken = cookies().get('refreshToken')?.value;

  // let accessToken = res.cookies.get(CookieKeys.accessToken)?.value;
  // let refreshToken = res.cookies.get(CookieKeys.refreshToken)?.value;

  // console.log('middleware accessToken :: ', accessToken);
  // console.log('middleware refreshToken :: ', refreshToken);

  // 액세스 토큰과 리프레시 토큰이 모두 있는 경우
  // 리프레시 만료가 되면 쿠키에 값을 세팅하지 않기 때문에 자동 제거 되면서
  // 액세스토큰이 없고 리프레시만 있는 경우

  if (accessToken && refreshToken) {
    const accessTokenJwt = parseJwt(accessToken);

    if (accessTokenJwt) {
      // 쿠키의 기본 만료 시간은 리프레시 토큰의 만료시간과 같다.

      const isExpired = isTimestampExpired(accessTokenJwt.exp);
      // 액세스 토큰이 만료된 경우
      if (isExpired) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        try {
          const { status, data, message } = await getReissueToken({
            accessToken,
            refreshToken,
          });

          if (status === 'SUCCESS') {
            accessToken = data.accessToken;
            refreshToken = data.refreshToken;
            createJWTCookiesInMiddlware({ accessToken, refreshToken, res });
          } else {
            console.error(message);
            // return 으로 작업을 종료 하여 cookie를 채워 넣지 않는다.
            const response = NextResponse.redirect(url);
            deleteJWTCookiesInMiddleware(response);
            return response;
          }
        } catch (error) {
          console.error(error);
          const response = NextResponse.redirect(url);

          deleteJWTCookiesInMiddleware(response);

          return response;
        }
      }
      //공식 문서 기준 middleware 에서는 cookie를 셋 할때 req,res를 사용해야한다고 함
      createJWTCookiesInMiddlware({ accessToken, refreshToken, res });
    }
  }

  function isProtectedPath(pathname: string) {
    return !pathname.startsWith('/login');
  }

  if (!accessToken && isProtectedPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return res;
}

// 미들웨어 설정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.ico$).*)'],
  // matcher: ['/', '/favorites'],
};
