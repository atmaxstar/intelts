import Link from 'next/link'

const Selection_IELTS = () => {
  return (
    <Link href="/ielts" className="w-full">
      <div className="relative h-full rounded-lg border-2 border-red-500 bg-white p-5 shadow-[0_4px_0_#d01a0a] hover:translate-y-2 hover:shadow-none">
        <div className="-mt-1 flex items-center">
          <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
            IELTS Test
          </h3>
        </div>
        <p className="mb-1 mt-3 text-xs font-medium uppercase text-red-500">
          ------------
        </p>
        <p className="mb-2 text-gray-600">
          Practice IELTS Test focusing on part1, part2, and part3.
        </p>
      </div>
    </Link>
  )
}

export default Selection_IELTS
