import Link from "next/link"

const Selection_Interview = () => {
  return (
    <Link href="/interview" className="w-full">
      <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg shadow-[0_4px_0_#00008b] transform hover:translate-y-2 hover:shadow-none">
          <div className="flex items-center -mt-1">
              <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Behavioral Interview</h3>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
          <p className="mb-2 text-gray-600">Practice Behavioral Interview.</p>
      </div>
    </Link>
  )
}

export default Selection_Interview
