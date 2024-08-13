import Link from 'next/link'

const Logout = () => {
  return (
    <Link
      className="group relative inline-flex items-center overflow-hidden rounded-md border-2 border-indigo-600 px-4 py-1 text-lg font-medium text-indigo-600 hover:bg-gray-50 hover:text-white md:px-12"
      href="/logout"
    >
      <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-indigo-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full" />
      <span className="relative text-sm sm:text-base md:text-xl">Logout</span>
    </Link>
  )
}

export default Logout
