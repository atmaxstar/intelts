import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";

const SignInOut = async () => {
    
  const session = await getServerSession(authOptions);

  return (
    <>
      {
        session ?
          (
            <a
              className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-red-600 border-2 border-red-600 rounded-md hover:text-white group hover:bg-gray-50"
              href="/mypage"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-red-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="relative">
                Go to Mypage
              </span>
            </a>
          )
          : (
            <button
              className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-md hover:text-white group hover:bg-gray-50"
              onClick={() => signIn('google', { callbackUrl: '/' })}
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
