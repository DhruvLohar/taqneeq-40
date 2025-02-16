'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

export async function getOTP(uid) {
  const res = await axios.post('users/getOTPOnEmail/', { uid });

  return res.data;
}

export async function verifyOTP(uid, otp) {
  const res = await axios.post('users/verifyOTPOnEmail/', {
    uid,
    otp
  });

  if (res.data.success) {
    const accessToken = res.data.data.access_token;
    const decodedToken = jwtDecode(accessToken);
    const expires = new Date(decodedToken.exp * 1000);

    // Set the auth token
    cookies().set('session', accessToken, { expires, httpOnly: true });
  }

  return true;
}

export async function login(formData) {
  const res = await axios.post('users/signUpSignIn/', formData);

  return res.data;
}

export async function logout() {
  cookies().delete('session');
}

export async function verifySession(request) {
  const session = request.cookies.get('session')?.value;

  if (session && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!session && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
