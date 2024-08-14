import { robotoslab } from '@/utils/font'
import Logout from './Logout'
import Link from 'next/link'

const HeaderMyPage = () => {
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
        <Logout />
      </div>
    </nav>
  )
}

export default HeaderMyPage
