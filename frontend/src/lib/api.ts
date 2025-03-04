'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.headers.common['Content-Type'] = 'application/json';

interface ApiResponse<T> {
  data: T;
}

export async function fetchFromAPI<T>(url: string): Promise<ApiResponse<T>> {
  const cookie = await cookies();
  axios.defaults.headers.common['Authorization'] =
    `Bearer ${cookie.get('session')?.value}`;
  try {
    const res = await axios.get<ApiResponse<T>>(url);
    return res.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function postDataToAPI<T>(
  url: string,
  data: any,
  isFile = false
): Promise<ApiResponse<T>> {
  const cookie = await cookies();
  axios.defaults.headers.common['Authorization'] =
    `Bearer ${cookie.get('session')?.value}`;
  try {
    const response = await axios.post<ApiResponse<T>>(
      url,
      data,
      isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
    );
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function putDataToAPI<T>(
  url: string,
  data: any,
  isFile = false
): Promise<ApiResponse<T>> {
  const cookie = await cookies();
  axios.defaults.headers.common['Authorization'] =
    `Bearer ${cookie.get('session')?.value}`;
  try {
    const response = await axios.patch<ApiResponse<T>>(
      url,
      data,
      isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
    );
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

export async function deleteDataToAPI<T>(url: string): Promise<ApiResponse<T>> {
  const cookie = await cookies();
  axios.defaults.headers.common['Authorization'] =
    `Bearer ${cookie.get('session')?.value}`;
  try {
    const response = await axios.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}
