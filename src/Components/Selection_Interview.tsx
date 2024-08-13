import Link from 'next/link'

const Selection_Interview = () => {
  return (
    <Link href="/interview" className="w-full">
      <div className="relative h-full rounded-lg border-2 border-indigo-500 bg-white p-5 shadow-[0_4px_0_#00008b] hover:translate-y-2 hover:shadow-none">
        <div className="-mt-1 flex items-center">
          <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
            Behavioral Interview
          </h3>
        </div>
        <p className="mb-1 mt-3 text-xs font-medium uppercase text-indigo-500">
          ------------
        </p>
        <p className="mb-2 text-gray-600">Practice Behavioral Interview.</p>
      </div>
    </Link>
  )
}

export default Selection_Interview
