import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const SignInOut = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session ? (
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded-md border-2 border-red-600 px-4 py-1 text-lg font-medium text-red-600 hover:bg-gray-50 hover:text-white md:px-12"
          href="/mypage"
        >
          <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-red-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full" />
          <span className="relative text-sm sm:text-base md:text-xl">
            Mypage
          </span>
        </Link>
      ) : (
        <Link
          className="group relative inline-flex items-center overflow-hidden rounded-md border-2 border-indigo-600 px-4 py-1 text-lg font-medium text-indigo-600 hover:bg-gray-50 hover:text-white md:px-12"
          href="/login"
        >
          <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-indigo-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full" />
          <span className="relative text-sm sm:text-base md:text-xl">
            Login
          </span>
        </Link>
      )}
    </>
  )
}

export default SignInOut
