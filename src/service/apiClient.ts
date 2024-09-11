import { getClientReissueToken } from '@/app/api/auth/_service/accountService';
import { CookieKeys } from '@/constants/cookieKey';

import { NetworkError } from '@/errors/CustomError';

import { CommonRes } from '@/types/commonResponse';
import { getCookie, isTimestampExpired, isWindowObjectAvailable, parseJwt } from '@/utils/util';

const ContentType = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '';
export const baseUrl = process.env.NEXT_PUBLIC_API_URL + API_BASE_URL;
export const testbaseUrl = 'http://192.168.1.9:8088' + API_BASE_URL;
export const nextApiBaseUrl = process.env.NEXT_PUBLIC_WEB_URL;

export async function callFetch<T, P>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  props?: P,
  header?: HeadersInit,
  contentType = 'application/json'
): Promise<T> {
  try {
    const accessToken = await tokenProvider();
    const headers: HeadersInit =
      // 멀티파트일때는 브라우저에서 알아서 지정해줌
      contentType === 'application/json'
        ? {
            'Content-Type': contentType,
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...header,
          }
        : {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...header,
          };

    const body = contentType === ContentType.applicationJson ? JSON.stringify(props) : (props as FormData);

    // const endPoint = testbaseUrl + url;
    const endPoint = baseUrl + url;

    const response = await fetch(endPoint, {
      method,
      headers,
      body,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`${endPoint} Network response was not ok: ${response.status} ${response.statusText}: ${errorBody}`);

      throw new NetworkError(
        `Network response was not ok for ${method} request to ${url}`,
        response.status,
        response.statusText,
        errorBody
      );
    }
    const resContentType = response.headers.get('Content-Type');

    if (
      (resContentType && resContentType.includes('application/octet-stream')) ||
      (resContentType && resContentType.includes('application/pdf')) ||
      (resContentType && resContentType.includes('image/'))
    ) {
      const blob = await response.blob();
      return blob as T;
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof NetworkError) {
      throw error;
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

export async function tokenProvider(): Promise<string | undefined> {
  if (isWindowObjectAvailable()) {
    // console.log(':: 클라이언트 환경 ::');

    let accessToken = getCookie(CookieKeys.clientAccessToken);

    if (accessToken) {
      const accessTokenJwt = parseJwt(accessToken);
      const isExpired = isTimestampExpired(accessTokenJwt?.exp);

      if (isExpired) {
        const { data, status } = await getClientReissueToken();

        if (status === 'SUCCESS') {
          accessToken = data.accessToken;
        } else {
          // debugger;
        }
      }
    } else {
      // debugger;
    }

    return accessToken ?? undefined;
  } else {
    // console.log(':: 서버사이드 환경 ::');
    // 빌드시 정적 페이지에서 쿠키를 사용할 경우 빌드 에러가 발생한다.
    // 쿠키는 동적상태(값이 가변적임)를 갖기 때문에 정적 페이지 빌드에 사용될 수 없음.
    // 정적 페이지로 빌드가 되는 곳에 🔥 export const dynamic = 'force-dynamic'; 키워드를 넣어주면 된다.
    const { cookies } = await import('next/headers');

    let clientAccessToken = cookies().get(CookieKeys.clientAccessToken)?.value;
    const accessToken = cookies().get(CookieKeys.accessToken)?.value;
    const refreshToken = cookies().get(CookieKeys.refreshToken)?.value;
    // 여기서 리이슈 토큰을 호출 할때
    if (!clientAccessToken && accessToken && refreshToken) {
      const { status, data } = await getClientReissueToken();
      if (status === 'SUCCESS') {
        clientAccessToken = data.accessToken;
      }
    }
    return clientAccessToken;
  }
}

export async function callFetchGet<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'GET', props);
}
export async function callFetchGetFile<T, P = unknown>(url: string, props?: P): Promise<T> {
  return callFetch<T, P>(url, 'GET', props);
}

export async function callFetchPost<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'POST', props);
}
export async function callFetchPostFileUpload<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'POST', props, undefined, ContentType.multipartFormData);
}
export async function callFetchPutFileUpload<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'PUT', props, undefined, ContentType.multipartFormData);
}
export async function callFetchPatchFileUpload<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'PATCH', props, undefined, ContentType.multipartFormData);
}

export async function callFetchDelete<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'DELETE', props);
}
export async function callFetchPatch<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'PATCH', props);
}

export async function callFetchPut<T, P = unknown>(url: string, props?: P): Promise<CommonRes<T>> {
  return callFetch<CommonRes<T>, P>(url, 'PUT', props);
}
