import { NextResponse } from 'next/server';
import { socialLogin } from '../_service/accountService';

import { createJWTCookies } from '../_service/cookieHandler';

export async function POST(req: Request) {
  try {
    // const res = NextResponse.next();
    const res = new NextResponse();
    const request = await req.json();

    res.cookies.set('', '', { expires: 7 });

    const socialLoginResult = await socialLogin({
      accessToken: request.accessToken,
      provider: request.provider,
    });

    if (socialLoginResult.status === 'SUCCESS') {
      const { accessToken, refreshToken } = socialLoginResult.data;
      if (accessToken && refreshToken) {
        // 회원 가입 일경우 토큰 정보가 들어오지 않는다.

        createJWTCookies({ accessToken, refreshToken });
      }
    }

    return Response.json(socialLoginResult);
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}
