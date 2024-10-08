'use client'

import { useCountDownInterval } from '@/utils/useCountDownInterval'
import { useEffect, useState } from 'react'
import { FaStop } from 'react-icons/fa'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import 'regenerator-runtime'

interface Props {
  question: string
  handleNext: () => void
  appendAnswer: ({ ques, ans }: { ques: string; ans: string }) => void
}

const Question = ({ question, handleNext, appendAnswer }: Props) => {
  const [countTime, setCountTime] = useState<number>(185)
  useCountDownInterval(countTime, setCountTime, () => handleFinished())

  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening()
    }
  }, [])

  const handleAnimated = () => {
    setTimeout(() => {
      SpeechRecognition.startListening({ language: 'en-US', continuous: true })
    }, 5000)
  }

  const handleFinished = async () => {
    await SpeechRecognition.stopListening()
    await appendAnswer({ ques: question, ans: transcript })
    await resetTranscript()
    handleNext()
  }

  return (
    <div className="flex h-4/6 flex-col items-center justify-center gap-2">
      <div
        className="animate-fade-in-bottom text-xl"
        onAnimationEnd={handleAnimated}
      >
        {question}
      </div>

      {listening && (
        <>
          <button
            className="flex flex-row items-center justify-center gap-2"
            type="button"
            onClick={() => handleFinished()}
          >
            <FaStop color="red" />
            Stop Recording
          </button>

          <div>{`${countTime}s left`}</div>
        </>
      )}
      <div className="w-1/2">{transcript}</div>
    </div>
  )
}

export default Question
