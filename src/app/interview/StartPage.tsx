'use client'

import Link from 'next/link'
import { useSpeechRecognition } from 'react-speech-recognition'

const StartPage = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition()

  return (
    <div className="flex h-1/2 flex-col items-center justify-center text-xl">
      {browserSupportsSpeechRecognition ? (
        <>
          <div className="mb-5 animate-fade-in-bottom">
            It consists of 6 to 8 questions.
          </div>
          <div className="animate-fade-in-bottom">Are you Okay?</div>
          <Link
            className="mb-5 mt-10 animate-fade-in rounded border border-red-500 px-16 py-1 font-semibold text-red-500 hover:bg-red-100"
            href="/interview/examination"
          >
            Start
          </Link>
        </>
      ) : (
        <span className="my-10 text-xl text-red-500">
          Sorry, this browser does not support speech recognition.
        </span>
      )}

      <Link
        className="animate-fade-in rounded border border-blue-500 px-3 py-1 font-semibold text-blue-500 hover:bg-blue-100"
        href="/"
      >
        Back
      </Link>
    </div>
  )
}

export default StartPage
