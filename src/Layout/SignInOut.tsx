'use client'

import { signIn, signOut, useSession } from "next-auth/react";

const SignInOut = () => {
    
  const { data: session } = useSession();

  return (
    <>
      {
        session ?
          (
            <button
              className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-red-600 border-2 border-red-600 rounded-md hover:text-white group hover:bg-gray-50"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-red-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="relative">
                Logout
              </span>
            </button>
          )
          : (
            <button
              className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-md hover:text-white group hover:bg-gray-50"
              onClick={() => signIn('google', { callbackUrl: '/mypage' })}
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="relative">
                Login
              </span>
            </button>
          )
      }
    </>
  )
}

export default SignInOut
