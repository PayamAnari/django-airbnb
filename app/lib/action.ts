'user server';

import { cookies } from 'next/headers';


export async function handleLogin(userId: string, accessToken: string, refreshToken: string)