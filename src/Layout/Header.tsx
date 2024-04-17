import { robotoslab } from "@/utils/font"

const Header = () => {
  return (
    <nav className="text-center p-5 border-b shadow-sm sticky top-0">
        <h1 className={`text-4xl font-bold text-red-800 ${robotoslab.className}`}>Intelts</h1>
    </nav>
  )
}

export default Header
