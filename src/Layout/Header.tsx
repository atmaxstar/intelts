import { robotoslab } from '@/utils/font'
import SignInOut from './SignInOut'
import Link from 'next/link'

const Header = () => {
  return (
    <nav className="sticky top-0 z-30 grid grid-cols-[1fr_max-content_1fr] items-center border-b bg-white p-5 shadow-sm">
      <div className="col-start-2">
        <Link
          href="/"
          className={`text-4xl font-bold text-red-800 ${robotoslab.className}`}
        >
          Intelts
        </Link>
      </div>
      <div className="justify-self-end">
        <SignInOut />
      </div>
    </nav>
  )
}

export default Header
