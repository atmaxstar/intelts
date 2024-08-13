'use client'

import { robotoslab } from '@/utils/font'
import Link from 'next/link'
import IELTSTable from './IELTSTable'
import InterviewTable from './InterviewTable'

const page = () => {
  return (
    <div className="flex flex-col p-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <span
            className={`text-2xl font-bold text-red-500 ${robotoslab.className}`}
          >
            IELTS
          </span>
          <IELTSTable />
        </div>

        <div className="flex flex-col items-center gap-3">
          <span
            className={`text-2xl font-bold text-indigo-500 ${robotoslab.className}`}
          >
            Interview
          </span>
          <InterviewTable />
        </div>
      </div>

      <Link
        className="mx-auto mt-10 rounded border border-blue-500 px-10 py-1 font-semibold text-blue-500 hover:bg-blue-100"
        href="/"
      >
        Return To HomePage
      </Link>
    </div>
  )
}

export default page
