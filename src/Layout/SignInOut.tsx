
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";


const SignInOut = async () => {
    
  const session = await getServerSession(authOptions);

  return (
    <>
      {
        session ?
          (
            <Link
              className="relative inline-flex items-center px-4 md:px-12 py-1 overflow-hidden text-lg font-medium text-red-600 border-2 border-red-600 rounded-md hover:text-white group hover:bg-gray-50"
              href="/mypage"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-red-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="relative text-sm sm:text-base md:text-xl">
                Mypage
              </span>
            </Link>
          )
          : (
            <Link
              className="relative inline-flex items-center px-4 md:px-12 py-1 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-md hover:text-white group hover:bg-gray-50"
              href="/login"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
              <span className="relative text-sm sm:text-base md:text-xl">
                Login
              </span>
            </Link>
          )
      }
    </>
  )
}

export default SignInOut
