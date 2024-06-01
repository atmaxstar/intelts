'use client'

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const Login = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/mypage';
  return (
    <button onClick={() => signIn()}>
      Login With Google
    </button>
  )
}

export default Login
