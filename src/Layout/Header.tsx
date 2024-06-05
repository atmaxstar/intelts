import { robotoslab } from "@/utils/font"
import SignInOut from "./SignInOut"

const Header = () => {
  return (
    <nav className="grid grid-cols-[1fr_max-content_1fr] p-5 border-b shadow-sm sticky top-0 z-20 bg-white">
        <div className='col-start-2'>
          <h1 className={`text-4xl font-bold text-red-800 ${robotoslab.className}`}>Intelts</h1>
        </div>
        <div className='justify-self-end'>
          <SignInOut/>
        </div>
    </nav>
  )
}

export default Header
