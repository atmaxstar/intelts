import Link from 'next/link';
import React from 'react'

const StartPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 text-xl">
      <div className='animate-fade-in-bottom'>
      It starts with Part 1 and ends with Part3.
      Are you okay?
      </div>
      <Link href={`/ielts/examination`}>ここ押して</Link>
      <button className="px-10 py-1 m-10 text-red-500 border border-red-500 font-semibold rounded hover:bg-red-100 animate-fade-in">
        Start
      </button>
    </div>
  )
}

export default StartPage
