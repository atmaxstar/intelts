import Link from "next/link"

const Selection_IELTS = () => {

  return (
    <Link href="/ielts" className="w-full">
      <div className="relative h-full p-5 bg-white border-2 border-red-500 rounded-lg">
          <div className="flex items-center -mt-1">
              <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">IELTS Test</h3>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-red-500 uppercase">------------</p>
          <p className="mb-2 text-gray-600">Practice IELTS Test focusing on part1, part2, and part3.</p>
      </div>
    </Link>
  )
}

export default Selection_IELTS
