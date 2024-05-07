import Link from 'next/link';
import React from 'react'

const StartPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 text-xl">
      <div className='animate-fade-in-bottom mb-5'>
      It starts with Part 1 and ends with Part3.
      </div>
      <div className='animate-fade-in-bottom'>
      Are you Okay?
      </div>
      <Link className="px-10 py-1 m-10 text-red-500 border border-red-500 font-semibold rounded hover:bg-red-100 animate-fade-in" href={`/ielts/examination`}>
        Start
      </Link>
        
      <Link className="px-10 py-1 m-10 text-blue-500 border border-blue-500 font-semibold rounded hover:bg-red-100 animate-fade-in" href={`/`}>
          Back
      </Link>
    </div>
  )
}

export default StartPage
